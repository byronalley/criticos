async function loginUser(email, password) {
  const response = await fetch("/web_api/users/log_in", {
    method: "POST",
    mode: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: {
        email,
        password,
        // Set the remember_me param for the server to
        // remember the user for an extended time (60 days)
        remember_me: "true",
      },
    }),
  });

  if (response.status !== 200) {
    if (response.status == 401) {
      throw new Error("AuthenticationError");
    } else {
      throw new Error(`UnexpectedError: ${response.status}`);
    }
  }

  const { data } = await response.json();
  const user = { id: data.id, email: data.email, username: data.username };

  return user;
}

async function currentUser() {
  try {
    // TODO(BA): Handle this better with retries etc.
    const response = await fetch("/web_api/current_user");

    if (response.status !== 200) {
      console.error(`Error: ${response.status} - ${response.statusText}`);
      console.error(`Login error: got status=${response.status}`);

      return null;
    }

    const { data } = await response.json();

    return { id: data.id, email: data.email, username: data.username };
  } catch {
    return null;
  }
}

export { loginUser, currentUser };
