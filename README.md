# node
Easy node creation in javascript

# todo
* add Mustache templates
* 
* documentation

# example
```javascript
let node = new Node('div')

node
  .a_('a', {'href': 'http://www.mudde.nl'})             // .a_ is alias for .appendNode_
    .a('img', {'src': 'http://www.mudde.nl/image.png'})
  ._()
  .a_('ul', {'class': 'navigation'})
    .a('li', {'value': 1}, 'Option 01')
    .a('li', {'value': 2}, 'Option 02')
    .a('li', {'value': 3}, 'Option 03')
```
node.toHTML()
---------
```HTML
<div>
  <a href=\"http://www.mudde.nl\">
    <img src=\"http://www.mudde.nl/image.png\">
  </a>
  <ul class=\"navigation\">
    <li value=\"1\">Option 01</li>
    <li value=\"2\">Option 02</li>
    <li value=\"3\">Option 03</li>
  </ul>
</div> 
```