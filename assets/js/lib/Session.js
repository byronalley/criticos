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
    let e = new Error("Incorrect login or password");
    e.name = "AuthenticationError";
    throw new Error(e);
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
    const user = { id: data.id, email: data.email, username: data.username };

    console.log(`Got currentUser:`);
    console.dir(user);

    return user;
  } catch {
    return null;
  }
}

export { loginUser, currentUser };
