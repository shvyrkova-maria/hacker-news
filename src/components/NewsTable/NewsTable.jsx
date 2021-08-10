import React, { useContext } from "react";
import { NewsContext } from "state";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { getTimeComponents } from "utils/getTimeComponents";
import s from "components/NewsTable/NewsTable.module.css";

function NewsTable() {
  const { state, dispatch } = useContext(NewsContext);

  const handleSortOnClick = (e) => {
    if (e.target.name === "time") {
      dispatch({ type: "SORT_TIME" });
    }
    if (e.target.name === "title") {
      dispatch({ type: "SORT_TITLE" });
    }
    if (e.target.name === "domain") {
      dispatch({ type: "SORT_DOMAIN" });
    }
  };

  const handleIncPageOnScroll = () => {
    dispatch({ type: "INCREMENT_PAGE" });
  };

  return (
    <>
      <div className={s.tableHeadersWrap}>
        <div className={s.tableRowTime}>
          <button
            type="button"
            className={s.tableSortBtn}
            onClick={handleSortOnClick}
            name="time"
          >
            Time
          </button>
        </div>
        <div className={s.tableRowTitle}>
          <button
            type="button"
            className={s.tableSortBtn}
            onClick={handleSortOnClick}
            name="title"
          >
            Title
          </button>
        </div>
        <div className={s.tableRowDomain}>
          <button
            type="button"
            className={s.tableSortBtn}
            onClick={handleSortOnClick}
            name="domain"
          >
            Domain
          </button>
        </div>
      </div>
      <ul>
        {state.news.length > 0 && (
          <InfiniteScroll
            dataLength={state.news.length}
            next={handleIncPageOnScroll}
            hasMore={state.news.length < 300 ? true : false}
            loader={<h4>Loading...</h4>}
            endMessage={<p>Yay! You have seen it all</p>}
            style={{ overflow: "hidden" }}
          >
            {state.news.map(({ id, title, time, domain }) => {
              return (
                <li key={id}>
                  <Link
                    to={{ pathname: `/comments/${id}` }}
                    className={s.tableRow}
                  >
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
        onClick={handleSortOnClick}
        name="time"
      >
        Sort
      </button>
    </>
  );
}

export default NewsTable;
