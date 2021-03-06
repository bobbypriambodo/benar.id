const handler = require('./handler')

module.exports = (request, reply) =>
  handler.handleRequest(request)
    .then(() => reply.redirect('/'))
    .catch(err => {
      request.log(['error'], err)
      return reply.redirect('/masuk')
    })
