# TODO / Roadmap

This is an informal roadmap of future feature, changes etc.

## User Interface
  - [X] Move home page into JSX
  - [ ] Move navbar to JSX
  - [ ] Show most recent reviews on home page
  - [ ] Create Review
  - [ ] Browse books
  - [ ] Show reviews in book listing

## Backend / Data Model
[ ] Move user and session management to web_api:
  - [X] session
  - [X] login with username instead of email
  - [ ] settings
  - [ ] registration
  - [ ] confirmation
  - [ ] reset password
[ ] Fix router permissions

  - [ ] Move binary id stuff into app schema
  - [X] Add image field to Book
  - [X] Reviews
    - Review: string, max 100 chars or 20 words, each punctuation mark is a "word"
    - Rating (stars): integer, 0-4 stars
    - Has type of book, movie... etc.
    - References either book_id or movie_id
  - [ ] List reviews by book
  - [ ] Search for reviews by book
  - [ ] Add Movies
  - [ ] Add pagination
  - [ ] Fix access issues
    - Allow index/show access without auth
    - Require auth for create/edit
    - Prevent IDOR

## Code quality
  - [X] Add Credo
  - [ ] Add Dialyxir
  - [ ] Add Sobelow
  - [ ] Add JavaScript/React code formatter config

## Next Big Things
* ActivityPub support
