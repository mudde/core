//  This import gives the Error: Cannot find module 'Mudde/Core/Node' :( 
//  A quickfix is to remark the first line in the file '/src/Mudde/Core/Node.ts' (///<amd-module name='Mudde/Core/Node'/>)
//  Fix it later!  Gr.O.M.
import Node from "../src/Mudde/Core/Node"
import * as chai from 'chai'
import * as jsdom from "jsdom"

const document = (new jsdom.JSDOM('<!DOCTYPE html><body></body>'))?.window.document
const expect = chai.expect;

describe('My Node library', () => {
   var testNode = new Node('div', { 'class': 'test' }, undefined, document)

   it('can create an element', () => {
      expect(testNode.toHTML())
         .to
         .equal('<div class="test"><\/div>');
   });

   it('can add an element', () => {
      testNode.appendNode_('div')
      expect(testNode.toHTML())
         .to
         .equal('<div class="test"><div><\/div><\/div>');
   });

   it('can add a class to the current element', () => {
      testNode.addClass('test')
      expect(testNode.toHTML())
         .to
         .equal('<div class="test"><div class="test"><\/div><\/div>');
   });

   it('can add an extra class to the current element', () => {
      testNode.addClass('test2')
      expect(testNode.toHTML())
         .to
         .equal('<div class="test"><div class="test test2"><\/div><\/div>');
   });

   it('can remove a class from the current element', () => {
      testNode.removeClass('test2')
      expect(testNode.toHTML())
         .to
         .equal('<div class="test"><div class="test"><\/div><\/div>');
   });

   it('can prepend a node. First goto the root node', () => {
      testNode.gotoRoot().prependNode('a', { 'href':'#'}, 'Link')
      expect(testNode.toHTML())
         .to
         .equal('<div class="test"><a href="#"><\/a><div class="test"><\/div><\/div>');
   });

   var testNode2 = new Node('div', { 'class': 'test' }, undefined, document)

   it('can you add a sibling to a node', () => {
      testNode2.addSibling('a', { 'href': '#' }, 'Link')

      expect(testNode2.toHTML())
         .to
         .equal('<div class="test"><\/div><a href="#">Link<\/a>');
   });
});