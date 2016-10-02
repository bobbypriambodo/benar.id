const handleRequest = require('./handler')

module.exports = (request, reply) =>
  handleRequest(request)
    .then(() => reply.redirect('/'))
    .catch(err => {
      request.log(['error'], err)
      request.redirect('/masuk')
    })
