import {NodeCore} from "./NodeCore"

export class BsNodeCore extends NodeCore {

   formGroup(): NodeCore {
      this.appendNode('div', { class: 'form-control' })

      return this
   }

   formGroup_(): NodeCore {
      this.appendNode_('div', { class: 'form-control' })

      return this
   }

   inputGroupText(text: string): NodeCore {
      this.appendNode('span', { class: 'input-group-text' }, text)

      return this
   }

   inputGroupText_(text: string): NodeCore {
      this.appendNode_('span', { class: 'form-group-text' }, text)

      return this
   }

   inputGroup(): NodeCore {
      this.appendNode('div', { class: 'input-control mb-1' })

      return this
   }

   inputGroup_(): NodeCore {
      this.appendNode_('div', { class: 'input-control mb-1' })

      return this
   }

   label(label: string, forAttribute: string, attributes?: any): NodeCore {
      this.appendNode('label', { ...attributes, class: 'form-label', for: forAttribute }, label)

      return this
   }

   label_(label: string, forAttribute: string, attributes?: any): NodeCore {
      this.appendNode_('label', { ...attributes, class: 'form-label', for: forAttribute }, label)

      return this
   }

   input(type: string, id: string): NodeCore {
      this.appendNode('input', { 'class': 'form-control', type: type, id: id })

      return this
   }

   input_(type: string, id: string): NodeCore {
      this.appendNode_('input', { class: 'form-control', type: type, id: id })

      return this
   }

   help(text: string, id: string): NodeCore {
      this.appendNode('span', { class: 'form-text', id: id }, text)

      return this
   }

   help_(text: string, id: string): NodeCore {
      this.appendNode_('span', { class: 'form-text', id: id }, text)

      return this
   }

   span(text: string, attributes?: any): NodeCore {
      let attr = attributes ? attributes : {}

      this.appendNode('span', attr, text)

      return this
   }

   span_(text: string, attributes?: any): NodeCore {
      let attr = attributes ? attributes : {}

      this.appendNode_('span', attr, text)

      return this
   }
}