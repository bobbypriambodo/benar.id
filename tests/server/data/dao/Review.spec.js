require('../../helpers/common').chai.should()

const Portal = require('../../../../source/server/data/dao/Portal')
const Member = require('../../../../source/server/data/dao/Member')
const Article = require('../../../../source/server/data/dao/Article')
const Review = require('../../../../source/server/data/dao/Review')
const ReviewVote = require('../../../../source/server/data/dao/ReviewVote')

const portals = require('./fixtures/portals')
const members = require('./fixtures/members')
const articles = require('./fixtures/articles')
const reviews = require('./fixtures/reviews')

let articleId
let memberId

before(() =>
  Promise.all([
    Portal.create(portals.valid[0]),
    Member.create(members.valid[0]),
  ]).then(result => {
    memberId = result[1].id
    return Article.create(Object.assign({}, articles.valid[0], {
      portal_id: result[0].id,
      member_id: result[1].id,
    }))
  }).then(createdArticle => {
    articleId = createdArticle.id
  })
)

describe('#upvote()', () => {
  let reviewId

  beforeEach(() =>
    Article.writeReview(
      articleId,
      Object.assign({}, reviews.valid[0], {
        member_id: memberId,
      })
    ).then(createdReview => { reviewId = createdReview.id })
  )

  it('should upvote the review', () => {
    const promise = Review.upvote(reviewId, memberId)
    return promise.should.be.fulfilled
  })

  it('shouldn\'t allow upvoting twice', () => {
    const promise = Review.upvote(reviewId, memberId)
      .then(() => Review.upvote(reviewId, memberId))
    return promise.should.be.rejected
  })

  afterEach(() =>
    ReviewVote.clear()
    .then(() => Review.clear())
  )
})

describe('#revokeUpvote()', () => {
  let reviewId

  beforeEach(() =>
    Article.writeReview(
      articleId,
      Object.assign({}, reviews.valid[0], {
        member_id: memberId,
      })
    )
      .then(createdReview => {
        reviewId = createdReview.id
        return Review.upvote(reviewId, memberId)
      })
  )

  it('should revoke the upvote', () => {
    const promise = Review.revokeUpvote(reviewId, memberId)
    return promise.should.eventually.equal(1)
  })

  afterEach(() =>
    ReviewVote.clear()
    .then(() => Review.clear())
  )
})

describe('#downvote()', () => {
  let reviewId

  beforeEach(() =>
    Article.writeReview(
      articleId,
      Object.assign({}, reviews.valid[0], {
        member_id: memberId,
      })
    ).then(createdReview => { reviewId = createdReview.id })
  )

  it('should downvote the review', () => {
    const promise = Review.downvote(reviewId, memberId)
    return promise.should.be.fulfilled
  })

  it('shouldn\'t allow downvoting twice', () => {
    const promise = Review.downvote(reviewId, memberId)
      .then(() => Review.downvote(reviewId, memberId))
    return promise.should.be.rejected
  })

  afterEach(() =>
    ReviewVote.clear()
    .then(() => Review.clear())
  )
})

describe('#revokeDownvote()', () => {
  let reviewId

  beforeEach(() =>
    Article.writeReview(
      articleId,
      Object.assign({}, reviews.valid[0], {
        member_id: memberId,
      })
    )
      .then(createdReview => {
        reviewId = createdReview.id
        return Review.downvote(reviewId, memberId)
      })
  )

  it('should revoke the downvote', () => {
    const promise = Review.revokeDownvote(reviewId, memberId)
    return promise.should.eventually.equal(1)
  })

  afterEach(() =>
    ReviewVote.clear()
    .then(() => Review.clear())
  )
})

after(() =>
  Article.clear()
    .then(() => Promise.all([
      Portal.clear(),
      Member.clear(),
    ])
))
