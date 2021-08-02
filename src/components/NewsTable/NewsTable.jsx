import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
// import { useHistory } from 'react-router';
import { getTimeComponents } from 'utils/getTimeComponents';
import s from '../NewsTable/NewsTable.module.css';

function NewsTable({ news, page, setPage }) {
  const [sorted, setSorted] = useState(null);
  const [isSorted, setIsSorted] = useState(false);

  useEffect(() => {
    // if (filter) return;
    setSorted(news);
  }, [news]);

  const sortedNews = (arr, key) => {
    switch (key) {
      case 'time':
        setIsSorted(!isSorted);
        return setSorted(
          [...arr].sort((a, b) =>
            isSorted ? b.time - a.time : a.time - b.time,
          ),
        );

      case 'title':
        setIsSorted(!isSorted);
        return setSorted(
          [...arr].sort((a, b) =>
            isSorted
              ? a.title.localeCompare(b.title)
              : b.title.localeCompare(a.title),
          ),
        );

      case 'domain':
        setIsSorted(!isSorted);
        return setSorted(
          [...arr].sort((a, b) =>
            isSorted
              ? a.domain?.localeCompare(b.domain)
              : b.domain?.localeCompare(a.domain),
          ),
        );

      default:
        return;
    }
  };

  return (
    <>
      <div className={s.tableHeadersWrap}>
        <div className={s.tableRowTime}>
          <button
            type="button"
            className={s.tableSortBtn}
            onClick={() => sortedNews(news, 'time')}
          >
            Time Sort
          </button>
        </div>
        <div className={s.tableRowTitle}>
          <button
            type="button"
            className={s.tableSortBtn}
            onClick={() => sortedNews(news, 'title')}
          >
            Title Sort
          </button>
        </div>
        <div className={s.tableRowDomain}>
          <button
            type="button"
            className={s.tableSortBtn}
            onClick={() => sortedNews(news, 'domain')}
          >
            Domain Sort
          </button>
        </div>
      </div>
      <ul>
        {sorted && (
          <InfiniteScroll
            dataLength={sorted.length}
            next={() => setPage(page + 1)}
            hasMore={true}
            pullDownToRefreshThreshold={300}
            style={{ overflow: 'hidden' }}
          >
            {sorted.map(({ id, title, time, domain }) => {
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
        onClick={() => sortedNews(news, 'time')}
      >
        Time Sort
      </button>
    </>
  );
}

export default NewsTable;

// function NewsTable({ news, page, setPage }) {
//   const [sorted, setSorted] = useState(null);
//   const [isSorted, setIsSorted] = useState(false);

//   useEffect(() => {
//     // if (filter) return;
//     setSorted(news);
//   }, [news]);

//   const sortedNews = (arr, key) => {
//     switch (key) {
//       case 'time':
//         setIsSorted(!isSorted);
//         return setSorted(
//           [...arr].sort((a, b) =>
//             isSorted ? b.time - a.time : a.time - b.time,
//           ),
//         );

//       case 'title':
//         setIsSorted(!isSorted);
//         return setSorted(
//           [...arr].sort((a, b) =>
//             isSorted
//               ? a.title.localeCompare(b.title)
//               : b.title.localeCompare(a.title),
//           ),
//         );

//       case 'domain':
//         setIsSorted(!isSorted);
//         return setSorted(
//           [...arr].sort((a, b) =>
//             isSorted
//               ? a.domain?.localeCompare(b.domain)
//               : b.domain?.localeCompare(a.domain),
//           ),
//         );

//       default:
//         return;
//     }
//   };

//   return (
//     <table>
//       <thead className={s.tableHeadersWrap}>
//         <tr>
//           <th className={s.tableRowTime}>
//             <button
//               type="button"
//               className={s.tableSortBtn}
//               onClick={() => sortedNews(news, 'time')}
//             >
//               Time Sort
//             </button>
//           </th>
//           <th className={s.tableRowTitle}>
//             <button
//               type="button"
//               className={s.tableSortBtn}
//               onClick={() => sortedNews(news, 'title')}
//             >
//               Title Sort
//             </button>
//           </th>
//           <th className={s.tableRowDomain}>
//             <button
//               type="button"
//               className={s.tableSortBtn}
//               onClick={() => sortedNews(news, 'domain')}
//             >
//               Domain Sort
//             </button>
//           </th>
//         </tr>
//       </thead>

//       <tbody>
//         {sorted && (
//           <InfiniteScroll
//             dataLength={sorted.length}
//             next={() => setPage(page + 1)}
//             hasMore={true}
//             pullDownToRefreshThreshold={300}
//             style={{ overflow: 'hidden' }}
//           >
//             {sorted.map(({ id, title, time, domain }) => {
//               return (
//                 <tr key={id}>
//                   <Link to={{ pathname: `/news/${id}` }} className={s.tableRow}>
//                     <td className={s.tableRowTime}>
//                       {getTimeComponents(time)}
//                     </td>
//                     <td className={s.tableRowTitle}>{title}</td>
//                     <td className={s.tableRowDomain}>{domain}</td>
//                   </Link>
//                 </tr>
//               );
//             })}
//           </InfiniteScroll>
//         )}
//       </tbody>
//     </table>
//   );
// }

// export default NewsTable;
