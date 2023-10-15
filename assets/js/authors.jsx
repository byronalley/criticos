import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AuthorsList = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Make a GET request to fetch the authors
    axios.get('http://localhost:4000/web_api/authors')
      .then(response => {
        // Assuming the API response is in the format you provided
        setAuthors(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Authors List</h1>
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        <ul>
          {authors.map(author => (
            <li key={author.id} className="mb-4 p-2 bg-gray-100 rounded"> 
              <p className="font-semibold">Name: {author.name}</p>
              <p>Birthdate: {author.birthdate}</p>
              <p>Birthplace: {author.birthplace || 'N/A'}</p>
              <p>Biography: {author.biography || 'N/A'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export {AuthorsList};
