import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/account_management/Login";
import AdminLogin from "./components/account_management/AdminLogin";
import UserHome from "./components/UserHome";
import AdminHome from "./components/AdminHome";
import Signup from "./components/account_management/Signup";

function App() {
  return (
    <Router>
      <Header />
      <Route path="/" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/adminlogin" exact component={AdminLogin} />
      <Route path="/home" exact component={UserHome} />
      <Route path="/adminhome" exact component={AdminHome} />
    </Router>
  );
}

export default App;
