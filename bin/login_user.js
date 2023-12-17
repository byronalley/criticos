#!/usr/bin/env node

async function loginUser() {
  try {
    const response = await fetch('http://localhost:4000/web_api/users/log_in', {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          email: "alice@example.com",
          password: "alphaAPPLE11!"
        }
      }),
    }
    );

    if (response.status !== 200) {
      console.error(`Error: ${response.status} - ${response.statusText}`);
      return;
    }

    const {data: {id, email,  username}} = await response.json();
    console.log(`id:`, id);
    console.log(`email:`, email);
    console.log(`username:`, username);
  } catch (error) {
    console.error('Error:', error);
  }
}

loginUser();
