import React, { useReducer } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { newsReducer, NewsContext, initialState } from "./state";
import NavBar from "components/NavBar/NavBar.jsx";
import NewestPage from "pages/NewestPage/NewestPage.jsx";
import NewsPage from "pages/NewsPage/NewsPage.jsx";
import CommetsPage from "pages/CommetsPage/CommentsPage.jsx";
import Container from "components/Container/Container.jsx";

function App() {
  const [state, dispatch] = useReducer(newsReducer, initialState);

  return (
    <NewsContext.Provider value={{ state, dispatch }}>
      <Container>
        <NavBar />
        <Switch>
          <Route path="/" exact>
            <NewestPage />
          </Route>
          <Route path="/news" exact>
            {/* <NewestPage /> */}
            <NewsPage />
          </Route>
          <Route path="/news/:newsId">
            <CommetsPage />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Container>
    </NewsContext.Provider>
  );
}

export default App;
