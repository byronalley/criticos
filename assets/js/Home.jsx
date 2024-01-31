import React, { useEffect, useState } from "react";
import Welcome from "./Welcome";
import BookReviewContainer from "./BookReviewContainer";
import Reviews from "./Reviews";
import Footer from "./Footer";
import Navbar from "./Navbar";
import BookSearch from "./components/BookSearch";
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
      <Welcome />
      <BookReviewContainer />
      <Reviews />
      <Footer />
    </>
  );
}
