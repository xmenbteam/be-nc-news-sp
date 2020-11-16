# BE Northcoders News Check List

## Readme

- [ ] Link to hosted version
- [ ] Write a summary of what the project is
- [ ] Provide clear instructions of how to clone, install dependencies, seed local database, and run tests
- [ ] Include information about how to create `knexfile.js`
- [ ] Specify minimum versions of `Node.js` and `Postgres` needed to run the project

All this is for when you feel that you have finished as much as you can/want. It's mainly to describe the repo and to give potential readers instructions on how they might use your code.

## General

- [ ] Remove any unnecessary `console.logs` and comments
- [ ] Remove all unnecessary files (e.g. old `README.md`, `error-handling.md`, `hosting.md`, `./db/utils/README.md` etc.)

Samesies as above

## Migrations

- [ ] Use `notNullable` on required fields
- [✓] Default `created_at` in articles and comments tables to the current date:`.defaultTo(knex.fn.now());`
- [ ] Delete all comments when the article they are related to is deleted: Add `.onDelete("CASCADE");` to `article_id` column in `comments` table.

  There are notes on this in week 3 backend 2.1 😁

## Seeding

- [✓] Make sure util functions do not mutate data
- [✓] Make util functions easy to follow with well named functions and variables
- [✓] Test util functions
- [✓] Migrate rollback and migrate latest in seed function

## Tests

- [ ] Cover all endpoints and errors
- [ ] Ensure all tests are passing

  I've left these as there are still a couple of errors left to handle :)

## Routing

- [✓] Split into api, topics, users, comments and articles routers
- [✓] Use `.route` for endpoints that share the same path
- [ ] Use `.all` for 405 errors

  Do you remember the .all() at the end of the routes for errors on methods not used? If not, gimme a shout!

## Controllers

- [✓] Name functions and variables well
- [✓] Add catch blocks to all model invocations (and don't mix use of`.catch(next);` and `.catch(err => next(err))`)

  Just missing a catch on the topics router :)

## Models

- [✓] Consistently use either single object argument _**or**_ multiple arguments in model functions
- [✓] No unnecessary use of `.modify()` (i.e. only for author and topic queries)
- [✓] Use `leftJoin` for comment counts

## Errors

- [✓] Use error handling middleware functions in app and extracted to separate directory/file
- [✓] Consistently use `Promise.reject` in either models _**OR**_ controllers

## Extra Advanced Tasks

If you wanna do anything extra after completing all of the README tasks then here are a few challenges :)

- [ ] Patch: Edit an article body
- [ ] Patch: Edit a comment body
- [ ] Patch: Edit a user's information
- [ ] Get: Search for an article by title
- [ ] Post: add a new user
