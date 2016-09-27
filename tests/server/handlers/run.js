require('dotenv').config()

function importTest(name, path) {
  describe(name, () => {
    require(path) // eslint-disable-line
  })
}

describe('Handler tests', () => {
  importTest('getHome', './getHome.spec')
  importTest('getArticle', './getArticle.spec')
  importTest('getLogin', './getLogin.spec')
  importTest('getLogout', './getLogout.spec')
  importTest('getNewArticle', './getNewArticle.spec')
  importTest('getReview', './getReview.spec')
  importTest('postLogin', './postLogin.spec')
  importTest('postSignUp', './postSignUp.spec')
  importTest('postArticle', './postArticle.spec')
  importTest('postReview', './postReview.spec')
  importTest('postFeedback', './postFeedback.spec')
  importTest('postFeedbackReply', './postFeedbackReply.spec')
  importTest('postUpvoteReview', './postUpvoteReview.spec')
  importTest('postDownvoteReview', './postDownvoteReview.spec')
  importTest('postRevokeUpvoteReview', './postRevokeUpvoteReview.spec')
  importTest('postRevokeDownvoteReview', './postRevokeDownvoteReview.spec')
})