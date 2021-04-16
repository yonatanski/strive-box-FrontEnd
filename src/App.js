import DashboardLayout from "layouts/dashboard";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "pages/home";
import All from "pages/all";
import Recents from "pages/recents";
import Starred from "pages/starred";
function App() {
  return (
    <Router>
      <Route
        path="/"
        exact
        render={() => (
          <DashboardLayout title="Home">
            <Home />
          </DashboardLayout>
        )}
      ></Route>
      <Route
        path="/all"
        exact
        render={() => (
          <DashboardLayout title="All">
            <All />
          </DashboardLayout>
        )}
      ></Route>
      <Route
        path="/recents"
        exact
        render={() => (
          <DashboardLayout title="Recents">
            <Recents />
          </DashboardLayout>
        )}
      ></Route>
      <Route
        path="/starred"
        exact
        render={() => (
          <DashboardLayout title="Starred">
            <Starred />
          </DashboardLayout>
        )}
      ></Route>
    </Router>
  );
}

export default App;
