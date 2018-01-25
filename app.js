const WebSocket = require('ws');
const printer = require('./printer');

const server = new WebSocket('ws://162.243.171.232:8080/orders');

let app = module.exports = {};

app.run = async () => {
  try {
    await printer.init();
    server.on('message', (data) => {
        let order = JSON.parse(data);
        console.log(order);
        printer.print('Restaurant Name\n', 2);
        printer.print(order.contact);
        for (let i = 0; i < order.items.length; i++) {
          let item = order.items[i];
          printer.print(item.amount + ' ' + item.name + ' ' + '$0.00');
        }
    });
  } catch (err) {
    console.error(err);
  }
};

app.run();


