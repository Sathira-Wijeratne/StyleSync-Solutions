import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TestFile from "./components/TestFile";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Route path="/" exact component={TestFile} />
    </Router>
  );
}

export default App;
