/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import chaiModule, { expect } from 'chai';
import sinon from "sinon";
import sinonChai from "sinon-chai";

chaiModule.use(sinonChai);

describe('PageViewTracker', () => {

  let expected
  let mockSendData

  beforeEach(async () => {
    global.window = {
      DI: {
        core: {
          sendData: () => 'sent!'
        },
        cookies: {
          getCookie: () => 'en'
        }
      }
    }
    mockSendData = sinon.stub(global.window.DI.core, 'sendData')
    global.document = {
      title: 'some-title',
      location: {
        href: '/href'
      }
    }
    window.dataLayer = []

    expected = {
      event: 'page_view',
      page_view: {
       language: 'en',
       location: '/href',
       organisations: '<OT1056>',
       primary_publishing_organisation: 'government digital service - digital identity',
       status_code: 200,
       title: 'some-title'
      }
    }

    require('../../../analytics/ga4/pageViewTracker')
  });

  afterEach(() => {
    delete require.cache[require.resolve('../../../analytics/ga4/pageViewTracker')];
  });

  it('Returns a standard page view', function () {

    global.window.DI.analyticsGa4.analyticsModules.PageViewTracker.init()

    expect(mockSendData).to.have.been.calledWith(expected)
  })

  it('Sets the language to the value of the lng cookie if set', function () {

    global.window.DI.cookies.getCookie = () => 'cy'

    global.window.DI.analyticsGa4.analyticsModules.PageViewTracker.init()

    expected.page_view.language = 'cy'
    expect(mockSendData).to.have.been.calledWith(expected)
  })

})