import React, { useEffect, useState } from "react";

import Footer from "./Footer";
import Navbar from "./Navbar";
import ReviewEditor from "./ReviewEditor";
import Reviews from "./Reviews";
import Welcome from "./Welcome";

import { currentUser } from "./lib/Session";
import { fetchGoogleVolumes } from "./lib/BookAPI";
import { fetchReviews } from "./lib/ReviewAPI";

export default function Home() {
  const [user, setUser] = useState({});
  const [reviews, setReviews] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const handleGetCurrentUser = async () => {
      const maybeUser = await currentUser();

      if (maybeUser) {
        setUser(maybeUser);
      }
    };

    handleGetCurrentUser();
  }, []);

  const updateReviews = () => {
    fetchReviews().then((reviewData) => {
      setReviews(reviewData);

      const googleVolumeIds = new Set(
        reviewData
          .filter(({ google_volume_id }) => google_volume_id)
          .map((book) => book.google_volume_id),
      );

      fetchGoogleVolumes(googleVolumeIds)
        .then((books) => setBooks(books))
        .catch((err) => console.error(err));
    });
  };

  useEffect(updateReviews, []);

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
      <Reviews reviews={reviews} books={books} />
      <Footer />
    </>
  );
}
