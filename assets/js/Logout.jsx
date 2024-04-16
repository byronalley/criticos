import React from "react";

export default function Login({ setUser }) {
  async function logoutUser(event) {
    try {
      const response = await fetch("/web_api/users/log_out", {
        mode: "same-origin",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status == 204) {
        setUser({});

        // TODO(BA): Replace with a flash message
        alert("Logged out successfully");
      } else {
        console.error(`Error: ${response.status} - ${response.statusText}`);

        // TODO(BA): Replace with a flash message
        alert("Error logging out");
      }
    } catch (error) {
      console.error("Error:", error);

      // TODO(BA): Replace with a flash message
      alert("Error logging out");
    }
    event.preventDefault();
  }

  return (
    <button
      onClick={logoutUser}
      className="inline-block text-white border-2 border-white px-4 py-2 rounded-full hover:bg-blue-100 transition"
    >
      Log out
    </button>
  );
}
