import axios from "axios";

axios.defaults.baseURL = "https://api.hnpwa.com/v0";

function fetchNews(page) {
  const response = axios.get(`/news/${page}.json`);
  return response;
}

function fetchNewest(page) {
  const response = axios.get(`/newest/${page}.json`);
  return response;
}

function fetchNewsComments(id) {
  const response = axios.get(`/item/${id}.json`);

  return response;
}

export { fetchNews, fetchNewest, fetchNewsComments };
