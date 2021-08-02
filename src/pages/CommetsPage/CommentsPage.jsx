import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { fetchNewsComments } from 'services/hackerNewsApi';
import { getTimeComponents } from 'utils/getTimeComponents';

function CommetsPage() {
  const { newsId } = useParams();
  const [comments, setComments] = useState([]);
  // const [error, setError] = useState('');
  const [isReadMore, setIsReadMore] = useState(true);

  useEffect(() => {
    function getComments() {
      try {
        fetchNewsComments(newsId).then(({ data }) =>
          setComments(data.comments),
        );
      } catch (err) {
        // setError(err.message);
      }
    }
    getComments();
  }, [newsId]);

  return (
    <>
      {comments.length === 0 ? (
        <p>This news have not comments yet</p>
      ) : (
        <ul>
          {comments.map(({ id, time, content }) => {
            return (
              <li key={id}>
                <span>{getTimeComponents(time)}</span>
                <span> {isReadMore ? content.slice(3, 200) : content}</span>
                {content.length > 200 && (
                  <span onClick={() => setIsReadMore(!isReadMore)}>
                    {isReadMore ? 'Read More >> ' : 'Read Less << '}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

export default CommetsPage;
