# Core - A Typesdcript Library

![Npm version](https://img.shields.io/npm/v/core.svg)
![license](https://img.shields.io/badge/license-MIT-green.svg)

## About

Some core elements for configuration, HTML element creation and some design patterns.

Gr.O.M.

## Requirements

npm version 8.5.0

## Installation

```bash
  npm install mudde/core
```

## Examples
There is an example in the folder "examples"

### ConfigurableAbstract
Configure an object from an object.
```javascript
  class testclass extends ConfigurableAbstract {
    id: number = -1
    test: any = {}
    configured:boolean = false
    
    constructor(config: any) {
      super(config);
      this.configuring(config);
    }

    configureTest(data: any) {
      this.configured=true
      this.test = data
    }

    getDefaultConfig() {
      return {
        'id': 0,
        'test': {}
      }
    }
  }

  new testClass({id:12, test: {a:1}})
```
*OUTPUTS*
```javascript
  object 'testClass' {
    id = 12
    test = {a:1}
    configured = true
  }
```
### NodeCore
Create DOM HTMLElements using NodeCore
```javascript
let node = new NodeCore('div', { 'class': 'test' })
node
  .addElement('div', {'class': 'test2'})
  .addElement_('a', {'href': '#'}, 'LOL')
  .addElement_('b', {}, 'Test')

node.toHTML()
```
*OUTPUTS*
```javascript
  <div class="test">
    <div class="test2">
      <a href="#">LOL</a>
      <b>Test</b>
    </div>
  </div>
```