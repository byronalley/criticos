#!/usr/bin/env node

async function logoutUser() {
  try {
    const response = await fetch('http://localhost:4000/web_api/users/log_out', {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status == 204) {
      console.log(`Success: 204 code`);

      console.dir(response.headers.getSetCookie());
    } else {
      console.error(`Error: ${response.status} - ${response.statusText}`);
      return;
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

logoutUser();
