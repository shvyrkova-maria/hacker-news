import React, { useEffect, useContext } from "react";
import { useRouteMatch } from "react-router";
import { NewsContext } from "state";
import { fetchNewest, fetchNews } from "services/hackerNewsApi";
import { Status } from "constants/requestStatus";
import NewsTable from "components/NewsTable/NewsTable.jsx";

function NewsPage() {
  const { url } = useRouteMatch();
  const { state, dispatch } = useContext(NewsContext);

  useEffect(() => {
    dispatch({ type: "PENDING" });
    function getNews() {
      try {
        if (url === "/") {
          fetchNewest(state.page).then(({ data }) =>
            dispatch({ type: "NEWS_RESOLVED", payload: data })
          );
        }
        if (url === "/news") {
          fetchNews(state.page).then(({ data }) =>
            dispatch({ type: "NEWS_RESOLVED", payload: data })
          );
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (err) {
        dispatch({ type: "REJECTED", payload: err });
      }
    }
    getNews();
  }, [state.page, url]);

  return (
    <>
      {state.status === Status.IDLE && <></>}
      {state.status === Status.PENDING && <div>Loading...</div>}
      {state.status === Status.RESOLVED && <NewsTable />}
      {state.status === Status.REJECTED && (
        <div>{`${state.error}. Try again later.`}</div>
      )}
    </>
  );
}

export default NewsPage;
