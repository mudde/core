import Node from "../src/node"
import * as chai from 'chai';
const jsdom = require("../node_modules/jsdom")
var dom = new jsdom.JSDOM('<!DOCTYPE html><body></body>')
if (!dom) throw new Error('Dom not set!')
const document = dom.window.document

const expect = chai.expect;
describe('My Node library', () => {
   let tmp = new Node('div', { 'class': 'test' })

   it('can create an element', () => {
      expect(tmp.toHTML()).to.equal('<div class="test"><\/div>');
   });

   it('can add an element', () => {
      tmp.appendNode_('div')
      expect(tmp.toHTML()).to.equal('<div class="test"><div><\/div><\/div>');
   });

   it('can add a class to the current element', () => {
      tmp.addClass('test')
      expect(tmp.toHTML()).to.equal('<div class="test"><div class="test"><\/div><\/div>');
   });

   it('can add a extra class to the current element', () => {
      tmp.addClass('test2')
      expect(tmp.toHTML()).to.equal('<div class="test"><div class="test test2"><\/div><\/div>');
   });

});