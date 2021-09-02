☠ ⅅΞVΞLΘPṀΞΠŦ UΠⅅΞR ℃ΘNSŦRUCŦIΘΠ ☠
============================
# TypeScript Core Library

Some core elements for configuration, HTML element creation and Eventhandling.

There is an example in the example folder.

Gr.O.M.

**Configurable**
```
  class testclass extends ConfigurableAbstract {
    id: number = -1
    test: any = {}
    configured:boolean = false
    
    constructor(config: any) {
      super();
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
```
  object 'testClass' {
    id = 12
    test = {a:1}
    configured = true
  }
```

**NodeCore**
```
let node = new NodeCore('div', { 'class': 'test' })
node
  .addElement('div', {'class': 'test2})
  .addElement_('a', {'href': '#'}, 'LOL')
  .addElement_('b', {}, 'Test')
```
*OUTPUTS*
```
  <div class="test">
    <div class="test2">
      <a href="#">LOL</a>
      <b>Test</b>
    </div>
  </div>
```