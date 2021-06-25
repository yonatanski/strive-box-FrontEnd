import DashboardLayout from "layouts/dashboard";
import All from "pages/all";
import Recents from "pages/recents";
import Starred from "pages/starred";
import { BrowserRouter as Router, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Route
        path="/"
        exact
        render={() => (
          <DashboardLayout title="Home">
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
