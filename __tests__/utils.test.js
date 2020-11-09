const { TestScheduler } = require('jest')
const { createAuthorRef, formatArticleData, formatDate } = require('../db/utils/data-manipulation')

describe('createAuthorRef', () => {
    test('Returns an empty object when passed a n empty array', () => {
        const userRows = [];
        const expected = {};
        expect(createAuthorRef(userRows)).toEqual(expected);
    })
    test('creates object with username:name', () => {
        const userRows = [{
            username: 'lurker',
            avatar_url: 'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
            name: 'do_nothing'
        }]
        const expected = { 'lurker': 'do_nothing' }
        expect(createAuthorRef(userRows)).toEqual(expected);
    })
    test('creates object with multiple username:name key value pairs', () => {
        const userRows = [
            {
                username: 'butter_bridge',
                avatar_url: 'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg',
                name: 'jonny'
            },
            {
                username: 'icellusedkars',
                avatar_url: 'https://avatars2.githubusercontent.com/u/24604688?s=460&v=4',
                name: 'sam'
            },
            {
                username: 'rogersop',
                avatar_url: 'https://avatars2.githubusercontent.com/u/24394918?s=400&v=4',
                name: 'paul'
            },
            {
                username: 'lurker',
                avatar_url: 'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
                name: 'do_nothing'
            }
        ];
        const expected = {
            butter_bridge: 'jonny',
            icellusedkars: 'sam',
            rogersop: 'paul',
            lurker: 'do_nothing'
        }
        expect(createAuthorRef(userRows)).toEqual(expected);
    })
    test('does not mutate input', () => {
        const userRows = [{
            username: 'lurker',
            avatar_url: 'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
            name: 'do_nothing'
        }];
        createAuthorRef(userRows);
        expect(userRows).toEqual([{
            username: 'lurker',
            avatar_url: 'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
            name: 'do_nothing'
        }])
    })
})

describe('formatArticleData', () => {

    test('returns an empty array when passed an empty array', () => {
        const articleData = [];
        const authorRef = {};
        const expected = [];
        expect(formatArticleData(articleData, authorRef)).toEqual(expected)
    })
    test('returns article data with the new name edited in', () => {
        const articleData = [{
            title: 'Living in the shadow of a great man',
            topic: 'mitch',
            author: 'butter_bridge',
            body: 'I find this existence challenging',
            created_at: 1542284514171,
            votes: 100,
        }];
        const authorRef = { butter_bridge: 'jonny' };
        const expected = [{
            title: 'Living in the shadow of a great man',
            topic: 'mitch',
            author: 'jonny',
            body: 'I find this existence challenging',
            created_at: 1542284514171,
            votes: 100,
        }];
        expect(formatArticleData(articleData, authorRef)).toEqual(expected)
    })
    test('returns multiple articles data with the new name edited in', () => {
        const articleData = [{
            title: 'Living in the shadow of a great man',
            topic: 'mitch',
            author: 'butter_bridge',
            body: 'I find this existence challenging',
            created_at: 1542284514171,
            votes: 100,
        },
        {
            title: 'Sony Vaio; or, The Laptop',
            topic: 'mitch',
            author: 'icellusedkars',
            body:
                'Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.',
            created_at: 1416140514171,
        }];
        const authorRef = { butter_bridge: 'jonny', icellusedkars: 'sam' };
        const expected = [{
            title: 'Living in the shadow of a great man',
            topic: 'mitch',
            author: 'jonny',
            body: 'I find this existence challenging',
            created_at: 1542284514171,
            votes: 100,
        },
        {
            title: 'Sony Vaio; or, The Laptop',
            topic: 'mitch',
            author: 'sam',
            body:
                'Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.',
            created_at: 1416140514171,
        }];
        expect(formatArticleData(articleData, authorRef)).toEqual(expected)
    })
    test('doesnt mutate original data', () => {
        const articleData = [{
            title: 'Living in the shadow of a great man',
            topic: 'mitch',
            author: 'butter_bridge',
            body: 'I find this existence challenging',
            created_at: 1542284514171,
            votes: 100,
        }]
        const authorRef = { 'butter-bridge': 'jonny' }
        formatArticleData(articleData, authorRef);
        expect(articleData).toEqual([{
            title: 'Living in the shadow of a great man',
            topic: 'mitch',
            author: 'butter_bridge',
            body: 'I find this existence challenging',
            created_at: 1542284514171,
            votes: 100,
        }])
    })
})

describe('formatDate', () => {
    test('returns empty array when passed an empty array', () => {
        const input = []
        const output = []
        expect(formatDate(input)).toEqual(output);
    })
    test('returns article with date when passed article with unix', () => {
        const input = [
            {
                title: 'Living in the shadow of a great man',
                topic: 'mitch',
                body: 'I find this existence challenging',
                created_at: 1542284514171,
                votes: 100,
                author: 'jonny'
            }
        ]
        const output = [
            {
                title: 'Living in the shadow of a great man',
                topic: 'mitch',
                body: 'I find this existence challenging',
                created_at: new Date(1542284514171),
                votes: 100,
                author: 'jonny'
            }
        ]
        expect(formatDate(input)).toEqual(output)
    })
})

