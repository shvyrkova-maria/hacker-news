import React, { useState, useEffect } from 'react';
// import { useLocation, useRouteMatch } from 'react-router';
import { fetchNewest } from 'services/hackerNewsApi';
import NewsTable from 'components/NewsTable/NewsTable.jsx';

// const Status = {
//   IDLE: 'idle',
//   PENDING: 'pending',
//   RESOLVED: 'resolved',
//   REJECTED: 'rejected',
// };

function NewestPage() {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  // const [error, setError] = useState('');
  // const { url, path } = useRouteMatch();
  // console.log(url, path);
  // console.log(path === '/news');

  // const currPage = Number(new URLSearchParams(location.search).get('page')) || 1;

  // const location = useLocation();
  // const [status, setStatus] = useState(status.IDLE);

  // const page = new URLSearchParams(location.search).get('news');

  useEffect(() => {
    function getNews() {
      try {
        fetchNewest(page).then(({ data }) =>
          setNews(news => [...news, ...data]),
        );

        // setStatus(Status.RESOLVED);
      } catch (err) {
        // setError(err.message);
        // setStatus(Status.REJECTED);
      }
    }
    getNews();
  }, [page]);

  return <NewsTable news={news} page={page} setPage={setPage} />;
}

export default NewestPage;
