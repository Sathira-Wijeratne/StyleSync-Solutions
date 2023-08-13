import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import TestFile from './components/TestFile';

function App() {
  return (
    <Router>
      <Route path = "/" exact component = {TestFile}/>
    </Router>
  );
}

export default App;
