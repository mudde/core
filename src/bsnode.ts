import Node from "./node"

export default class BsNode extends Node {

   formGroup(): Node {
      this.appendNode('div', { class: 'form-control' })

      return this
   }

   formGroup_(): Node {
      this.appendNode_('div', { class: 'form-control' })

      return this
   }

   inputGroupText(text: string): Node {
      this.appendNode('span', { class: 'input-group-text' }, text)

      return this
   }

   inputGroupText_(text: string): Node {
      this.appendNode_('span', { class: 'form-group-text' }, text)

      return this
   }

   inputGroup(): Node {
      this.appendNode('div', { class: 'input-control mb-1' })

      return this
   }

   inputGroup_(): Node {
      this.appendNode_('div', { class: 'input-control mb-1' })

      return this
   }

   label(label: string, forAttribute: string, attributes?: any): Node {
      this.appendNode('label', { ...attributes, class: 'form-label', for: forAttribute }, label)

      return this
   }

   label_(label: string, forAttribute: string, attributes?: any): Node {
      this.appendNode_('label', { ...attributes, class: 'form-label', for: forAttribute }, label)

      return this
   }

   input(type: string, id: string): Node {
      this.appendNode('input', { 'class': 'form-control', type: type, id: id })

      return this
   }

   input_(type: string, id: string): Node {
      this.appendNode_('input', { class: 'form-control', type: type, id: id })

      return this
   }

   help(text: string, id: string): Node {
      this.appendNode('span', { class: 'form-text', id: id }, text)

      return this
   }

   help_(text: string, id: string): Node {
      this.appendNode_('span', { class: 'form-text', id: id }, text)

      return this
   }

   span(text: string, attributes?: any): Node {
      let attr = attributes ? attributes : {}

      this.appendNode('span', attr, text)

      return this
   }

   span_(text: string, attributes?: any): Node {
      let attr = attributes ? attributes : {}

      this.appendNode_('span', attr, text)

      return this
   }
}