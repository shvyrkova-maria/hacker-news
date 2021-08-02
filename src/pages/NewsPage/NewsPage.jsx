import React, { useEffect, useReducer } from "react";
import { fetchNews } from "services/hackerNewsApi";
import { reducer } from "../../reduser/reducer";
import NewsTable from "components/NewsTable/NewsTable.jsx";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

const initialState = {
  news: [],
  page: 1,
  status: Status.IDLE,
  error: "",
};

function NewsPage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { news, page, status, error } = state;

  useEffect(() => {
    dispatch({ type: "PENDING" });
    function getNews() {
      try {
        fetchNews(page).then(({ data }) =>
          dispatch({ type: "NEWS_RESOLVED", payload: data })
        );
      } catch (err) {
        dispatch({ type: "REJECTED", payload: err });
      }
    }
    getNews();
  }, [page]);

  return (
    <>
      {status === Status.IDLE && <></>}
      {status === Status.PENDING && <div>Loading...</div>}
      {status === Status.RESOLVED && <NewsTable news={news} page={page} />}
      {status === Status.REJECTED && <div>{`${error}. Try again later.`}</div>}
    </>
  );
}

export default NewsPage;
