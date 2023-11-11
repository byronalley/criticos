#!/usr/bin/env sh

curl -X POST http://localhost:4000/web_api/users/signup -H "Content-Type: application/json" -d '{"user": {"email": "tyler@example.com", "password": "tiggers123BOUNCE"}}'
