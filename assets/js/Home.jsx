import React, { useEffect, useState } from "react";
import Welcome from "./Welcome";
import ReviewEditor from "./ReviewEditor";
import Reviews from "./Reviews";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { currentUser } from "./lib/Session";

export default function Home() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const handleGetCurrentUser = async () => {
      const maybeUser = await currentUser();

      if (maybeUser) {
        setUser(maybeUser);
      }
    };

    handleGetCurrentUser();
  }, []);

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      {user.username ? <ReviewEditor /> : <Welcome />}
      <Reviews />
      <Footer />
    </>
  );
}
