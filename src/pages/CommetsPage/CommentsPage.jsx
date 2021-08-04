import React, { useEffect, useContext } from "react";
import { NewsContext } from "state";
import { useParams } from "react-router";
import { fetchNewsComments } from "services/hackerNewsApi";
import { Status } from "constants/requestStatus";
import { getTimeComponents } from "utils/getTimeComponents";
import s from "pages/CommetsPage/CommentsPage.module.css";

function CommetsPage() {
  const { newsId } = useParams();
  const { state, dispatch } = useContext(NewsContext);

  useEffect(() => {
    function getComments() {
      try {
        fetchNewsComments(newsId).then(({ data }) =>
          dispatch({ type: "COMMENTS_RESOLVED", payload: data.comments })
        );
      } catch (err) {
        dispatch({ type: "REJECTED", payload: err });
      }
    }
    getComments();
  }, [newsId]);

  return (
    <>
      {state.status === Status.IDLE && <></>}
      {state.status === Status.PENDING && <div>Loading...</div>}
      {state.status === Status.RESOLVED && state.comments.length === 0 && (
        <p>This news have not comments yet</p>
      )}
      {state.status === Status.RESOLVED && (
        <ul>
          {state.comments.map(({ id, time, content }) => {
            return (
              <li key={id} className={s.tableRow}>
                <p className={s.tableRowTime}>{getTimeComponents(time)}</p>
                <div
                  className={s.tableRowComment}
                  dangerouslySetInnerHTML={{ __html: content }}
                ></div>
              </li>
            );
          })}
        </ul>
      )}
      {state.status === Status.REJECTED && (
        <div>{`${state.error}. Try again later.`}</div>
      )}
    </>
  );
}

export default CommetsPage;
