import React, { useState, useEffect } from "react";
import { useLocation, useRouteMatch } from "react-router";
import { fetchNewest } from "services/hackerNewsApi";
import NewsTable from "components/NewsTable/NewsTable.jsx";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

function NewestPage() {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState("");
  // const { url, path } = useRouteMatch();
  // console.log(url, path);
  // console.log(path === '/news');

  // const currPage = Number(new URLSearchParams(location.search).get('page')) || 1;

  // const location = useLocation();
  // console.log(location);
  // console.log(location.pathname === "/news");
  // const currLoc = location.pathname === "/news";

  // const [status, setStatus] = useState(status.IDLE);

  // const page = new URLSearchParams(location.search).get('news');

  useEffect(() => {
    setStatus(Status.PENDING);
    function getNews() {
      try {
        // if (!currLoc) {
        //   fetchNews(page).then(({ data }) =>
        //     setNews((news) => [...news, ...data])
        //   );
        // }

        fetchNewest(page).then(({ data }) =>
          setNews((news) => [...news, ...data])
        );

        setStatus(Status.RESOLVED);
      } catch (err) {
        setError(err.message);
        setStatus(Status.REJECTED);
      }
    }
    getNews();
  }, [page, location]);

  return (
    <>
      {status === Status.IDLE && <></>}
      {status === Status.PENDING && <div>Loading...</div>}
      {status === Status.RESOLVED && (
        <NewsTable news={news} page={page} setPage={setPage} />
      )}
      {status === Status.REJECTED && <div>{`${error}. Try again later.`}</div>}
    </>
  );
}

export default NewestPage;
