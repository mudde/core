import * as chai from 'chai'
import { GuidHelper } from '../src/Helper';

const expect = chai.expect;

describe('My GuidHelper element', () => {
  it('can create staticky a Guid', () => {
    let guid = GuidHelper.create()
    
    expect(guid instanceof GuidHelper)
      .to
      .equal(true);
  });

  it('can and test a Guid', () => {
    let guid = 'e3422bf8-8c08-4af5-bea9-0c0294099a14'

    expect(GuidHelper.isGuid(guid))
      .to
      .equal(true);
  });

  it('can and test a faulty Guid', () => {
    let guid = 'k3422bf8-8c08-4af5-bea9-0c0294099a14'
    
    expect(GuidHelper.isGuid(guid))
      .to
      .equal(false);
  });

});