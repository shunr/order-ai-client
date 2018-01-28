const WebSocket = require('ws');
const printer = require('./printer');
const express = require('express')

const server = new WebSocket('ws://162.243.171.232:8080/orders');
const app = express();

let orders = [];

app.run = async () => {

  let paper;
  try {
    paper = await printer.init();
  } catch (err) {
    console.error(err);
    process.exit();
  }

  server.on('message', (data) => {
    let order = JSON.parse(data);
    console.log(order);
    orders.push(order);
    printer.print(paper, 'Restaurant Name\n', 2);
    printer.print(paper, order.contact);
    for (let i = 0; i < order.items.length; i++) {
      let item = order.items[i];
      printer.print(paper, item.amount + ' ' + item.name + ' ' + '$0.00');
    }
    printer.print(paper, 'Total: ' + '$' + order.total);
    printer.cut(paper);
  });

  server.on('close', () => {
    process.exit();
  });

};

app.get('/', (req, res) => {
  let r = '';
  for (let i = 0; i < orders.length; i++) {
    r += '<strong>' + orders[i].contact.substring(13, 25) + '</strong><br>';
    for (let j = 0; j < orders[i].items.length; j++) {
      let item = orders[i].items[j];
      r += item.amount + ' ' + item.name + ' ' + '$0.00<br>';
    }
    r += 'Total: $' + orders[i].total + '<br><br>';
  }
  res.send(r);
});

app.listen(80, app.run);