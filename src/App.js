import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

import Dashboard from "./components/dashboard";
import CreateBubble from "./components/createbubble";
import CreateGoal from "./components/creategoal";
import UserProfile from "./components/userprofile";
import ErrorPage from "./components/errorpage";
import SignUp from "./components/signup";
import Awards from "./components/awards";
import Login from "./components/login";
import Landing from "./components/landing";
import Navbar from "./components/navbar/navbar";
import PrivateRoute from "./PrivateRoute";
import BubbleProfile from "./components/bubbleprofile";
import Bubbles from "./components/bubbles";
function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Navbar />
          <div className="App">
            <header className="App-header">
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <Route exact path="/sign-up" component={SignUp} />
                <Route exact path="/log-in" component={Login} />
                <Route exact path="/" component={Landing} />
                <PrivateRoute exact path="/awards" component={Awards} />
                <PrivateRoute exact path="/bubble-profile" component={BubbleProfile} />
                <PrivateRoute exact path="/bubbles" component={Bubbles} />
                <PrivateRoute exact path="/create-bubble" component={CreateBubble} />
                <PrivateRoute exact path="/user-profile" component={UserProfile} />
                <Route path="*" component={ErrorPage} />
                {/* <Route exact path="/create-goal" component={CreateGoal} /> */}
              </Switch>
            </header>
          </div>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
