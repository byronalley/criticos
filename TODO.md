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
  - [ ] Reviews
    - Review: string, max 100 chars or 20 words, each punctuation mark is a "word"
    - Rating (stars): integer, 0-4 stars
    - Has type of book, movie... etc.
    - References either book_id or movie_id
  - [ ] List reviews by book
  - [ ] Search for reviews by book
  - [ ] Add pagination

## Code quality
  - Add Credo
  - Add Dialyxir
  - Add Sobelow
