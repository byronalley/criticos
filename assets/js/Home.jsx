import React, { useEffect, useState } from "react";
import Header from "./Header";
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
      <Header />
      {/* <BookSearch /> */}
      {/* <Reviews /> */}
      <Footer />
    </>
  );
}
