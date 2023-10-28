# TODO / Roadmap

This is an informal roadmap of future feature, changes etc.

## User Interface
  - [ ] Move home page into JSX
  - [ ] Show most recent reviews on home page
  - [ ] Create Review
  - [ ] Browse books
  - [ ] Show reviews in book listing

## Backend / Data Model
  - [ ] Move binary id stuff into app schema
  - [ ] Add image field to Book
  - [ ] Reviews
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
