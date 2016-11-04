const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
chai.should()

const sinon = require('sinon')

const handler = require('../handler')

const view = require('../view')

function generateRequestObject() {
  const request = { }
  request.params = { id: 1 }
  request.log = sinon.spy()
  return request
}

describe('Post Review View', () => {
  it('should redirect to /artikel/:id if resolved', () => {
    const request = generateRequestObject()
    const stub = sinon.stub(handler, 'handleRequest').returns(Promise.resolve())
    const reply = { redirect: sinon.spy() }

    return view(request, reply)
      .then(() => {
        stub.restore()
        sinon.assert.calledOnce(reply.redirect)
        sinon.assert.calledWith(reply.redirect, `/artikel/${request.params.id}`)
      })
  })

  it('should redirect to /artikel/:id if rejected', () => {
    const request = generateRequestObject()
    const stub = sinon.stub(handler, 'handleRequest').returns(Promise.reject())
    const reply = { redirect: sinon.spy() }

    return view(request, reply)
      .then(() => {
        stub.restore()
        sinon.assert.calledOnce(reply.redirect)
        sinon.assert.calledWith(reply.redirect, `/artikel/${request.params.id}`)
      })
  })
})
