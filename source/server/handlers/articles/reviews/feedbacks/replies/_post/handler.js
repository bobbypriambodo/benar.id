module.exports.handleRequest = (request) => {
  const { Feedback } = request.server.app.models
  const memberData = request.auth.credentials
  const feedback = request.payload
  const parentFeedbackId = request.params.parentFeedbackId
  feedback.member_id = memberData.id
  return Feedback.writeReply(parentFeedbackId, feedback)
    .then(createdFeedback => ({ feedback: createdFeedback }))
}
