import { Route, Switch } from "react-router-dom";

import AllMeetupsPage from "./pages/AllMeetups";
import NewMeetupPage from "./pages/NewMeetup";
import FavoritesPage from "./pages/Favorites";
import Layout from "./components/layout/Layout";
import Slider from "./components/ImageSlider/Slider";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <AllMeetupsPage />
        </Route>
        <Route path="/edit-transcript">
          <Slider />
        </Route>
        <Route path="/full-transcript">
          <FavoritesPage />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
