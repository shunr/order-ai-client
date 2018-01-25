'use strict'

const escpos = require('escpos');
 
const device  = new escpos.USB();
const printer = new escpos.Printer(device);
 
let mod = module.exports = {}

mod.init = () => {
  let p = new Promise((resolve) => {
    device.open(() => {
      resolve(printer.font('a').align('lt'));
    });
  });
  return p;
}

mod.print = (paper, text, size = 1) => {
  paper = paper.size(size, size).text(text);
};

mod.cut = (paper) => {
  paper = paper.cut();
}