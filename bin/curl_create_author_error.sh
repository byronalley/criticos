#!/usr/bin/env sh

curl -v -X POST http://localhost:4000/web_api/authors/ -H "Content-Type: application/json" -d '{"author": {"fuzzy": "Bunny"}}'
