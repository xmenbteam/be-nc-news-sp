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
        test('404 - returns an error with invalid article_id', () => {
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
        test('201 - posts a new comment associated with the article ID', () => {
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
        test('404 - article not found', () => {
            const newComment = {
                username: 'butter_bridge',
                body: 'OMG I FREAKING LOVE THIS WOW YOU ARE SO GREAT'
            }
            return request(app)
                .post('/api/articles/1568151/comments')
                .send(newComment)
                .expect(404)
                .then(response => {
                    // console.log(response.body)
                    expect(response.body.msg).toBe('Article not found')
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
        test('200 - checks that comments are sorted by created_by in asc order', () => {
            return request(app)
                .get('/api/articles/1/comments?sortBy=created_at&order=ASC')
                .expect(200)
                .then(response => {
                    expect(response.body.length).toBe(13)
                    expect(response.body).toBeSortedBy('created_at')
                })
        })
        test('200 - gets an array of all articles', () => {
            return request(app)
                .get('/api/articles')
                .expect(200)
                .then(response => {
                    expect(response.body.length).toBe(12)
                })
        })
        test('200 - gets an array of all articles sorted by date', () => {
            return request(app)
                .get('/api/articles?sort_by=date&order=asc')
                .expect(200)
                .then(response => {
                    expect(response.body.length).toBe(12)
                    // console.log(response.body)
                    // expect(response.body).toBeSortedBy(created_at)
                })
        })
        test('200 - filters articles by author', () => {
            return request(app)
                .get('/api/articles?author=butter_bridge')
                .expect(200)
                .then(response => {
                    // console.log(response.body)
                    expect(response.body.length).toBe(3)
                    const allButterBridge = response.body.every(article => {
                        return article.author === 'butter_bridge';
                    })
                    expect(allButterBridge).toBe(true);
                })
        })
        test('404 - author not found', () => {
            return request(app)
                .get('/api/articles?author=trample-stamps')
                .expect(404)
                .then(response => {
                    expect(response.body.msg).toBe('Articles not found')
                })
        })
        test('200 - filters articles by topic', () => {
            return request(app)
                .get('/api/articles?topic=mitch')
                .expect(200)
                .then(response => {
                    // console.log(response.body)
                    expect(response.body.length).toBe(11)
                    const allAboutMitch = response.body.every(article => {
                        return article.topic === 'mitch';
                    })
                    expect(allAboutMitch).toBe(true);
                })
        })
        test('404 - topic not found', () => {
            return request(app)
                .get('/api/articles?topic=trample-stamps')
                .expect(404)
                .then(response => {
                    expect(response.body.msg).toBe('Articles not found')
                })
        })
        // test('delete article by article_id', () => {
        //     return request(app)
        //         .delete('api/articles/1')
        //         .expect(204)
        // })
    })

    describe('api/comments', () => {
        test('PATCH new voteCount on comment by Id', () => {
            return request(app)
                .patch('/api/comments/1')
                .send({ inc_votes: 100 })
                .expect(200)
                .then(response => {
                    expect(response.body.votes).toBe(116)
                })
        })
        test('delete comment by comment_id', () => {
            return request(app)
                .delete('/api/comments/1')
                .expect(204)
        })
    })
})
