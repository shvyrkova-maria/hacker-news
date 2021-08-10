import axios from "axios";

axios.defaults.baseURL = "https://api.hnpwa.com/v0";

function fetchNews(feed, page) {
  const response = axios.get(`/${feed}/${page}.json`);
  return response;
}

function fetchNewsComments(id) {
  const response = axios.get(`/item/${id}.json`);

  return response;
}

export { fetchNews, fetchNewsComments };
