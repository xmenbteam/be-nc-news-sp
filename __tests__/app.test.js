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
        test('GETs article by article_id', () => {
            return request(app)
                .get('/api/articles/1')
                .expect(200)
                .then(response => {
                    expect(response.body).toEqual({
                        article_id: 1,
                        title: 'Living in the shadow of a great man',
                        body: 'I find this existence challenging',
                        votes: 100,
                        topic: 'mitch',
                        author: 'butter_bridge',
                        created_at: '2018-11-15T12:21:54.171Z'
                    })
                })
        })
        test('returns a 404 error with invalid article_id', () => {
            return request(app)
                .get('/api/articles/583832759')
                .expect(404)
                .then(({ body }) => {
                    expect(body.msg).toBe('Route not found')
                })
        })
        test('updates an articles vote count', () => {
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
    })
})