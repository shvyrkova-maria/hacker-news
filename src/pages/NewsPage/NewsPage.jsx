import React, { useEffect, useContext } from "react";
import { useRouteMatch } from "react-router";
import { NewsContext } from "state";
import { fetchNews } from "services/hackerNewsApi";
import { Status } from "constants/requestStatus";
import NewsTable from "components/NewsTable/NewsTable.jsx";

function NewsPage() {
  const { url } = useRouteMatch();
  const { state, dispatch } = useContext(NewsContext);

  useEffect(() => {
    const currUrl = url === "/" ? "newest" : "news";

    fetchNews(currUrl, state.page)
      .then(({ data }) => dispatch({ type: "NEWS_RESOLVED", payload: data }))
      .catch((err) => dispatch({ type: "REJECTED", payload: err }));
  }, [state.page, url]);

  return (
    <>
      {state.status === Status.IDLE && <></>}
      {state.status === Status.RESOLVED && <NewsTable />}
      {state.status === Status.REJECTED && (
        <div>{`${state.error}. Try again later.`}</div>
      )}
    </>
  );
}

export default NewsPage;
