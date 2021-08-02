import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router";
import { fetchNewsComments } from "services/hackerNewsApi";
import { reducer } from "../../reduser/reducer";
import { Status } from "../../constants/requestStatus";
import { getTimeComponents } from "utils/getTimeComponents";

const initialState = {
  comments: [],
  isReadMore: true,
  status: Status.IDLE,
  error: "",
};

function CommetsPage() {
  const { newsId } = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);

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
              <li key={id}>
                <span>{getTimeComponents(time)}</span>
                <span>
                  {state.isReadMore ? content.slice(3, 200) : content}
                </span>
                {content.length > 200 && (
                  <span onClick={() => dispatch({ type: "READ_MORE" })}>
                    {state.isReadMore ? "Read More >> " : "Read Less << "}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
      {state.status === Status.REJECTED && (
        <div>{`${error}. Try again later.`}</div>
      )}
    </>
  );
}

export default CommetsPage;
