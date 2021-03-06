const handler = require('./handler')

module.exports = (request, reply) =>
  handler.handleRequest(request)
    .then(() => reply.redirect(
      `/artikel/${request.params.id}/ulasan/${request.params.reviewerSlug}`
    ))
    .catch(err => {
      request.log(['database', 'error'], err)
      return reply.redirect(
        `/artikel/${request.params.id}/ulasan/${request.params.reviewerSlug}`
      )
    })
