#!/usr/bin/env node

async function getAuthors() {
  try {
    const response = await fetch('http://localhost:4000/web_api/authors');

    if (response.status !== 200) {
      console.error(`Error: ${response.status} - ${response.statusText}`);
      return;
    }

    const {data: authors} = await response.json();

    for (const author of authors) {
      console.log('Author:');
      console.log(`Name: ${author.name}`);
      console.log(`Birthdate: ${author.birthdate}`);
      console.log(`Birthplace: ${author.birthplace}`);
      console.log(`Biography: ${author.biography}`);
      console.log(`Creator ID: ${author.creator_id}`);
      console.log('---');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

getAuthors();
