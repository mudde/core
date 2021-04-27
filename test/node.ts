import Node from "../src/node"
import * as chai from 'chai';

const expect = chai.expect;
describe('My Node library', () => {
   let tmp = new Node('div', { 'class': 'test' })

   it(tmp.toHTML(), () => {
      expect(tmp.toHTML()).to.equal('<div class="test"><\/div>');
   });

});