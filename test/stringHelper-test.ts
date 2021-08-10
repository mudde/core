import * as chai from 'chai'
import { StringHelper } from '../src/Helper';

const expect = chai.expect;

describe('My StringHelper element', () => {
  it('can set the first letter to a captal letter', () => {
    let guid = StringHelper.ucfirst('test')
    
    expect(guid === 'Test')
      .to
      .equal(true);
  });

});