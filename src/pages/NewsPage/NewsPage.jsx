import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router';
import { fetchNews } from 'services/hackerNewsApi';

import NewsTable from 'components/NewsTable/NewsTable.jsx';

// const Status = {
//   IDLE: 'idle',
//   PENDING: 'pending',
//   RESOLVED: 'resolved',
//   REJECTED: 'rejected',
// };

function NewsPage() {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  // const [error, setError] = useState('');

  // const location = useLocation();
  // console.log(location);
  // const [status, setStatus] = useState(status.IDLE);

  // const page = new URLSearchParams(location.pathname);
  // console.log(page);
  useEffect(() => {
    function getNews() {
      try {
        fetchNews(page).then(({ data }) => setNews(news => [...news, ...data]));
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

export default NewsPage;
