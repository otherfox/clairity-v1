import {} from 'babel/polyfill'

import chai, {expect} from 'chai'

import Store from '../../src/store/index'

describe('test', () => {
  it('should succeed', () => {
    expect(Store).to.exist;
  });
  it('should have a data property', () => {
    expect(Store.data).to.exist;
  });
  it('should have tables', () => {
    expect(Store.data.size).to.be.gt(0);
  });
});
