/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { expect } from 'chai';

describe('Core', () => {

  beforeEach(async () => {
    global.window = {}
    window.dataLayer = []

    require('../../analytics/core')
  });

  afterEach(() => {
    delete require.cache[require.resolve('../../analytics/core')];
  });

  it('Sends data to the data layer', function () {
    global.window.DI.core.sendData({foo: 'bar'})
    expect(window.dataLayer[0]).to.deep.equal({foo: 'bar'})
  })

})