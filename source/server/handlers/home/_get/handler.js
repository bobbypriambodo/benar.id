module.exports.handleRequest = (request) => {
  const { Article } = request.server.app.models
  return Article.getAll()
    .then(articles => ({ articles }))
}
