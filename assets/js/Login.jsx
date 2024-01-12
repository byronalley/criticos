import React from "react";

export default function Login({ setUser, toggleLogin }) {
  async function loginUser(event) {
    const email = event.target.email.value;
    const password = event.target.password.value;

    event.preventDefault();

    try {
      const response = await fetch(
        "/web_api/users/log_in",
        {
          method: "POST",
          mode: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: {
              email,
              password,
              // Set the remember_me param for the server to remember the user for an
              // extended time (60 days)
              remember_me: "true",
            },
          }),
        }
      );
      if (response.status !== 200) {
        console.error(`Error: ${response.status} - ${response.statusText}`);
        return;
      }

      const {data} = await response.json();
      const user = {id: data.id, email: data.email, username: data.username};

      // TODO(BA): Replace with a flash message
      alert("Logged in!");

      setUser(user);
      toggleLogin(event);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
      <form
        className="bg-blue-500 p-10 w-full z-20 flex flex-col md:flex-row items-center justify-center"
        onSubmit={loginUser}
      >
      <a onClick={toggleLogin} className="h-10 px-4 py-2 mb-4 md:mb-0 md:mr-4 justify-center"> X </a>
        <input
          type="email"
          placeholder="Email"
          name="email"
          className="h-10 px-4 border rounded-md mb-4 md:mb-0 md:mr-4"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="h-10 px-4 border rounded-md mb-4 md:mb-0 md:mr-4"
        />
        <button
          type="submit"
          className="inline-block bg-white text-blue-500 p-5 px-9 py-3 rounded-full hover:bg-blue-100 transition"
        >
          Login
        </button>
      </form>
  );
}
