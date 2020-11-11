process.env.NODE_ENV = "test"
const app = require("../app")
const request = require("supertest")
const connection = require("../connection")
const { TestScheduler } = require("jest")
const { updateVotesbyId } = require("../controllers/articles")

describe('/api', () => {
    afterAll(() => {
        return connection.destroy()
    })
    beforeEach(() => {
        return connection.seed.run()
    })
    describe('./api/topics', () => {

        test('GETs all topics with status 200', () => {
            return request(app)
                .get('/api/topics')
                .expect(200)
                .then(response => {
                    expect(response.body).toMatchObject({
                        topics: [
                            { slug: 'mitch', description: 'The man, the Mitch, the legend' },
                            { slug: 'cats', description: 'Not dogs' },
                            { slug: 'paper', description: 'what books are made of' }
                        ]
                    })
                })
        })
    })
    describe('./api/users/', () => {
        test('GETs user by username with status 200', () => {
            return request(app)
                .get('/api/users/butter_bridge')
                .expect(200)
                .then(response => {
                    expect(response.body).toEqual({
                        username: 'butter_bridge',
                        name: 'jonny',
                        avatar_url: 'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg',
                    })
                })
        })
        test('returns 404 error with invalid username', () => {
            return request(app)
                .get('/api/users/notausername')
                .expect(404)
                .then(({ body }) => {
                    expect(body.msg).toBe('Route not found')
                })
        })
    })
    describe('./api/articles', () => {
        test('200 - GETs article by article_id', () => {
            return request(app)
                .get('/api/articles/1')
                .expect(200)
                .then(response => {
                    expect(response.body.article).toEqual({
                        article_id: 1,
                        title: 'Living in the shadow of a great man',
                        body: 'I find this existence challenging',
                        comment_count: '13',
                        votes: 100,
                        topic: 'mitch',
                        author: 'butter_bridge',
                        created_at: '2018-11-15T12:21:54.171Z'
                    })
                })
        })
        test('200 - responds with an article with a comment_count property', () => {
            return request(app)
                .get('/api/articles/1')
                .expect(200)
                .then(response => {
                    const article = response.body.article;
                    const articleHasCommentCount = article.hasOwnProperty('comment_count')
                    expect(articleHasCommentCount).toBe(true);
                    expect(article.comment_count).toBe('13')
                })
        })
        test('404 - returns a  error with invalid article_id', () => {
            return request(app)
                .get('/api/articles/583832759')
                .expect(404)
                .then(({ body }) => {
                    expect(body.msg).toBe('Article not found')
                })
        })
        test('200 - updates an articles vote count', () => {
            return request(app)
                .patch('/api/articles/1')
                .send({ inc_votes: 50 })
                .expect(200)
                .then(response => {
                    expect(response.body).toEqual(
                        {
                            article_id: 1,
                            title: 'Living in the shadow of a great man',
                            body: 'I find this existence challenging',
                            votes: 150,
                            topic: 'mitch',
                            author: 'butter_bridge',
                            created_at: '2018-11-15T12:21:54.171Z'
                        }
                    )
                })
        })
        test('201 - posts a new commend associated with the article ID', () => {
            const newComment = {
                username: 'butter_bridge',
                body: 'OMG I FREAKING LOVE THIS WOW YOU ARE SO GREAT'
            }
            return request(app)
                .post('/api/articles/2')
                .send(newComment)
                .expect(201)
                .then(response => {
                    // console.log(response.body, 'response')
                    // make sure body has a property that is auto filled in by the database
                    expect(response.body).toHaveProperty('comment_id')
                })
        })
        test('200 - returns an array of all comments related to an article', () => {
            return request(app)
                .get('/api/articles/5/comments')
                .expect(200)
                .then(response => {
                    expect(response.body.length).toBe(2)
                    expect(response.body[0]).toMatchObject({
                        votes: expect.any(Number),
                        created_at: expect.any(String),
                    })
                })
        })
        test('200 - checks that comments are sorted by votes in asc order', () => {
            return request(app)
                .get('/api/articles/1/comments?sortBy=votes&order=DESC')
                .expect(200)
                .then(response => {
                    // console.log(response.body, 'test response')
                    expect(response.body.length).toBe(13)
                    // expect(response.body).toBeSortedBy('created_by')
                })
        })
        test('200 - gets an array of all articles', () => {
            return request(app)
                .get('/api/articles')
                .expect(200)
                .then(response => {
                    expect(response.body.length).toBe()
                })
        })
    })
})

/*
GET /api/articles
Responds with
an articles array of article objects, each of which should have the following properties:
author which is the username from the users table
title
article_id
topic
created_at
votes
comment_count which is the total count of all the comments with this article_id - you should make use of knex queries in order to achieve this
Should accept queries
sort_by, which sorts the articles by any valid column (defaults to date)
order, which can be set to asc or desc for ascending or descending (defaults to descending)
author, which filters the articles by the username value specified in the query
topic, which filters the articles by the topic value specified in the query
*/