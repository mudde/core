# TypeScript Core Library

Some core elements

-- Configurable
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
```
**OUTPUTS**
```
  new testClass({id:12, test: {a:1}})

  object 'testClass' {
    id = 12
    test = {a:1}
    configured = true
  }
```

-- NodeCore
```
let node = new NodeCore('div', { 'class': 'test' })
node
  .addElement('div', {'class': 'test2})
  .addElement_('a', {'href': '#'}, 'LOL')
  .addElement_('b', {}, 'Test')
```
**OUTPUTS**
```
  <div class="test">
    <div class="test2">
      <a href="#">LOL</a>
      <b>Test</b>
    </div>
  </div>
```