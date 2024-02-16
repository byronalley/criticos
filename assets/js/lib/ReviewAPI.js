const fetchReviews = async () => {
  const { data: reviewData } = await fetch("/web_api/reviews").then((res) =>
    res.json(),
  );

  return reviewData;
};

export { fetchReviews };
