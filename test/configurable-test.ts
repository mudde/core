import * as chai from 'chai'
import { ConfigurableAbstract } from '../src/Core';

const expect = chai.expect;

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

describe('My Configurable element', () => {
  it('can create an element and set default config', () => {
    let a = new testclass({})
    
    expect(a.id)
      .to
      .equal(0);
  });

  it('can create an element and set given config', () => {
    let a = new testclass({id:12})
    
    expect(a.id)
      .to
      .equal(12);
  });

  it('can create an element and run the configure method', () => {
    let a = new testclass({ id: 12, test: {a:1}})
    
    expect(a.configured)
      .to
      .equal(true);
  });
 
});