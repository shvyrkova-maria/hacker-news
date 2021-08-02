const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

// const initialState = {
//   news: [],
//   page: 1,
//   status: Status.IDLE,
//   error: "",
//   sorted: null,
//   isSorted: false,
// };

function reducer(state, { type, payload }) {
  switch (type) {
    case "PENDING":
      return { ...state, status: Status.PENDING };

    case "NEWS_RESOLVED":
      return {
        ...state,
        news: [...state.news, ...payload],
        status: Status.RESOLVED,
      };

    case "COMMENTS_RESOLVED":
      return {
        ...state,
        comments: [...state.comments, ...payload],
        status: Status.RESOLVED,
      };

    case "REJECTED":
      return { ...state, status: Status.REJECTED, error: payload };

    case "TEST":
      return {
        ...state,
        sorted: [...state.news],
      };

    case "INCREMENT_PAGE":
      return {
        ...state,
        page: (state.page = state.page + payload),
      };

    case "SORT_TIME":
      return {
        ...state,
        isSorted: !state.isSorted,
        sorted: [...state.news].sort((a, b) =>
          state.isSorted ? b.time - a.time : a.time - b.time
        ),
      };

    case "SORT_TITLE":
      return {
        ...state,
        isSorted: !state.isSorted,
        sorted: [...state.news].sort((a, b) =>
          state.isSorted
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title)
        ),
      };

    case "SORT_DOMAIN":
      return {
        ...state,
        isSorted: !state.isSorted,
        sorted: [...state.news].sort((a, b) =>
          state.isSorted
            ? a.domain?.localeCompare(b.domain)
            : b.domain?.localeCompare(a.domain)
        ),
      };

    case "READ_MORE":
      return {
        ...state,
        isReadMore: !state.isReadMore,
      };

    default:
      state;
  }
}

export { reducer };
