import React, { useReducer } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { newsReducer, NewsContext, initialState } from "./state";
import Navigation from "components/Navigation/Navigation.jsx";
import NewsPage from "pages/NewsPage/NewsPage.jsx";
import CommetsPage from "pages/CommetsPage/CommentsPage.jsx";
import Container from "components/Container/Container.jsx";

function App() {
  const [state, dispatch] = useReducer(newsReducer, initialState);

  return (
    <NewsContext.Provider value={{ state, dispatch }}>
      <Container>
        <Navigation />
        <Switch>
          <Route path="/" exact>
            <NewsPage />
          </Route>
          <Route path="/news" exact>
            <NewsPage />
          </Route>
          <Route path="/comments/:newsId">
            <CommetsPage />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Container>
    </NewsContext.Provider>
  );
}

export default App;
