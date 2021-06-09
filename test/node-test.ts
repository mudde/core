import Node from "../src/Node"
import * as chai from 'chai'
import * as jsdom from "jsdom"

const document = (new jsdom.JSDOM('<!DOCTYPE html><body></body>'))?.window.document
const expect = chai.expect;

describe('My Node library', () => {
   it('can create an element', () => {
      let testNode = new Node('div', { 'class': 'test' }, undefined, document)
      expect(testNode.toHTML())
         .to
         .equal('<div class="test"><\/div>');
   });

   it('can add an element', () => {
      let testNode = new Node('div', { 'class': 'test' }, undefined, document)
      testNode.appendNode_('div')
      expect(testNode.toHTML())
         .to
         .equal('<div class="test"><div><\/div><\/div>');
   });

   it('can add a class to the current element', () => {
      let testNode = new Node('div', { 'class': 'test' }, undefined, document)
      testNode
         .appendNode_('div')
         .addClass('test')

      expect(testNode.toHTML())
         .to
         .equal('<div class="test"><div class="test"><\/div><\/div>');
   });

   it('can add an extra class to the current element', () => {
      let testNode = new Node('div', { 'class': 'test' }, undefined, document)
      testNode
         .appendNode_('div')
         .addClass('test')
         .addClass('test2')

      expect(testNode.toHTML())
         .to
         .equal('<div class="test"><div class="test test2"><\/div><\/div>');
   });

   it('can remove a class from the current element', () => {
      let testNode = new Node('div', { 'class': 'test' }, undefined, document)
      testNode
         .appendNode_('div')
         .addClass('test')
         .addClass('test2')
         .removeClass('test2')

      expect(testNode.toHTML())
         .to
         .equal('<div class="test"><div class="test"><\/div><\/div>');
   });

   it('can prepend a node. First goto the root node', () => {
      let testNode = new Node('div', { 'class': 'test' }, undefined, document)
      testNode
         .appendNode_('div')
         .addClass('test')
         .gotoRoot()
         .prependNode('a', { 'href': '#' }, 'Link')

      expect(testNode.toHTML())
         .to
         .equal('<div class="test"><a href="#"><\/a><div class="test"><\/div><\/div>');
   });

   it('can you add a sibling to a node', () => {
      let testNode2 = new Node('div', { 'class': 'test' }, undefined, document)
      testNode2.appendNode_('a', { 'href': '#' }, 'Link')
      testNode2.addSibling('a', { 'href': '#' }, 'Link')

      expect(testNode2.toHTML())
         .to
         .equal('<div class="test"><a href="#"><\/a><a href="#"><\/a><\/div>');
   });

   it('can you add search an element by id in generated HTML', () => {
      let testNode3 = new Node('div', { 'class': 'test' }, undefined, document)
      let testNode4 = new Node('a', { 'href': '#', 'id': 'link' }, 'Link', document)

      testNode3.appendElement(testNode4)

      expect(testNode3.getElementById('link').id)
         .to
         .equal('link');
   });

   it('can you replace an element', () => {
      let testNode3 = new Node('div', { 'class': 'test' }, undefined, document)
      let testNode4 = new Node('a', { 'href': '#', 'id': 'link' }, 'Link', document)
      let newNode = oldNode => {
         return new Node('div', { 'class': 'testX' }, undefined, document).appendElement(oldNode)
      }

      testNode3
         .appendElement(testNode4)
         .getElementById('link')
         .moveInNode(newNode)

      expect(testNode3.toHTML())
         .to
         .equal('<div class="test"><div class="testX"><a href="#" id="link"><\/a><\/div><\/div>');
   });
});