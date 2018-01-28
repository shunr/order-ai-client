const WebSocket = require('ws');
const printer = require('./printer');

const server = new WebSocket('ws://162.243.171.232:8080/orders');

let app = module.exports = {};
let orders = [];

app.run = async () => {
  try {
    let paper = await printer.init();
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

app.run();