'use strict'

const escpos = require('escpos');
 
const device  = new escpos.USB();
const printer = new escpos.Printer(device);
 
let mod = module.exports = {}

mod.init = () => {
  let p = new Promise((resolve, reject) => {
    device.open(() => {
      printer.font('a');
      printer.align('lt');
      resolve();
    });
  });
  return p;
}

mod.print = (text, size = 1) => {
  printer.size(size, size);
  printer.text(text);
};