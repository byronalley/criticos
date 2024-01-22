async function loginUser(email, password) {
  // TODO(BA): Handle this better with retries etc.
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
    console.error(`Error: ${response.status} - ${response.statusText}`);
    console.log(`Login error: got status=${response.status}`);

    let e = new Error("Incorrect login or password");
    e.name = "AuthenticationError";
    throw new Error(e);
  }

  const { data } = await response.json();
  const user = { id: data.id, email: data.email, username: data.username };

  return user;
}

export { loginUser };
