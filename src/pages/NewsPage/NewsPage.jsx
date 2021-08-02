import React, { useEffect, useContext } from "react";
import { NewsContext } from "../../state";
import { fetchNews } from "services/hackerNewsApi";
import { Status } from "../../constants/requestStatus";
import NewsTable from "components/NewsTable/NewsTable.jsx";

function NewsPage() {
  const { state, dispatch } = useContext(NewsContext);

  useEffect(() => {
    dispatch({ type: "PENDING" });
    function getNews() {
      try {
        fetchNews(state.page).then(({ data }) =>
          dispatch({ type: "NEWS_RESOLVED", payload: data })
        );
      } catch (err) {
        dispatch({ type: "REJECTED", payload: err });
      }
    }
    getNews();
  }, [state.page]);

  return (
    <>
      {state.status === Status.IDLE && <></>}
      {state.status === Status.PENDING && <div>Loading...</div>}
      {state.status === Status.RESOLVED && <NewsTable news={state.news} />}
      {state.status === Status.REJECTED && (
        <div>{`${state.error}. Try again later.`}</div>
      )}
    </>
  );
}

export default NewsPage;
