import React, { useContext } from "react";
import { NewsContext } from "state";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { getTimeComponents } from "utils/getTimeComponents";
import s from "components/NewsTable/NewsTable.module.css";

function NewsTable() {
  const { state, dispatch } = useContext(NewsContext);

  return (
    <>
      <div className={s.tableHeadersWrap}>
        <div className={s.tableRowTime}>
          <button
            type="button"
            className={s.tableSortBtn}
            onClick={() => dispatch({ type: "SORT_TIME" })}
          >
            Time
          </button>
        </div>
        <div className={s.tableRowTitle}>
          <button
            type="button"
            className={s.tableSortBtn}
            onClick={() => dispatch({ type: "SORT_TITLE" })}
          >
            Title
          </button>
        </div>
        <div className={s.tableRowDomain}>
          <button
            type="button"
            className={s.tableSortBtn}
            onClick={() => dispatch({ type: "SORT_DOMAIN" })}
          >
            Domain
          </button>
        </div>
      </div>
      <ul>
        {state.news.length > 0 && (
          <InfiniteScroll
            dataLength={state.news.length}
            next={() => dispatch({ type: "INCREMENT_PAGE" })}
            hasMore={true}
            pullDownToRefreshThreshold={300}
            style={{ overflow: "hidden" }}
          >
            {state.news.map(({ id, title, time, domain }) => {
              return (
                <li key={id}>
                  <Link to={{ pathname: `/news/${id}` }} className={s.tableRow}>
                    <p className={s.tableRowTime}>{getTimeComponents(time)}</p>
                    <h2 className={s.tableRowTitle}>{title}</h2>
                    <p className={s.tableRowDomain}>{domain}</p>
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
        Sort
      </button>
    </>
  );
}

export default NewsTable;
