import React, { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { reducer } from "../../reduser/reducer";
import { getTimeComponents } from "utils/getTimeComponents";
import s from "../NewsTable/NewsTable.module.css";

function NewsTable({ news, page }) {
  const [state, dispatch] = useReducer(reducer, {
    news: news,
    page: page,
    error: "",
    sorted: null,
    isSorted: false,
  });

  useEffect(() => {
    dispatch({ type: "TEST" });
  }, [news]);

  return (
    <>
      <div className={s.tableHeadersWrap}>
        <div className={s.tableRowTime}>
          <button
            type="button"
            className={s.tableSortBtn}
            onClick={() => dispatch({ type: "SORT_TIME" })}
          >
            Time Sort
          </button>
        </div>
        <div className={s.tableRowTitle}>
          <button
            type="button"
            className={s.tableSortBtn}
            onClick={() => dispatch({ type: "SORT_TITLE" })}
          >
            Title Sort
          </button>
        </div>
        <div className={s.tableRowDomain}>
          <button
            type="button"
            className={s.tableSortBtn}
            onClick={() => dispatch({ type: "SORT_DOMAIN" })}
          >
            Domain Sort
          </button>
        </div>
      </div>
      <ul>
        {state.sorted && (
          <InfiniteScroll
            dataLength={state.sorted.length}
            next={() => dispatch({ type: "INCREMENT_PAGE", payload: 1 })}
            hasMore={true}
            pullDownToRefreshThreshold={300}
            style={{ overflow: "hidden" }}
          >
            {state.sorted.map(({ id, title, time, domain }) => {
              return (
                <li key={id}>
                  <Link to={{ pathname: `/news/${id}` }} className={s.tableRow}>
                    <span className={s.tableRowTime}>
                      {getTimeComponents(time)}
                    </span>
                    <span className={s.tableRowTitle}>{title}</span>
                    <span className={s.tableRowDomain}>{domain}</span>
                  </Link>
                </li>
              );
            })}
          </InfiniteScroll>
        )}
      </ul>
      <button
        type="button"
        className={s.sortByTimeBtn}
        onClick={() => dispatch({ type: "SORT_TIME" })}
      >
        Time Sort
      </button>
    </>
  );
}

export default NewsTable;
