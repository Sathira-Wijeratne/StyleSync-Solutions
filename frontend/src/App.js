import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/account_management/Login";
import AdminLogin from "./components/account_management/AdminLogin";
import UserHome from "./components/UserHome";
import AdminHome from "./components/AdminHome";
import Signup from "./components/account_management/Signup";
import ProductPage from "./components/ProductPage";
import ShoppingCart from "./components/ShoppingCart";
import PurchaseHistory from "./components/PurchaseHistory";
import AddDiscount from "./components/AddDiscount";
import AllDiscounts from "./components/AllDiscounts";
import UpdateDiscount from "./components/UpdateDiscount";
import DeleteDiscount from "./components/DeleteDiscount";

function App() {
  return (
    <Router>
      <Header />
      <Route path="/" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/adminlogin" exact component={AdminLogin} />
      <Route path="/home" exact component={UserHome} />
      <Route path="/viewproduct/:id" exact component={ProductPage} />
      <Route path="/cart" exact component={ShoppingCart} />
      <Route path="/purchaseHistory" exact component={PurchaseHistory} />
      <Route path="/adminhome" exact component={AdminHome} />
      <Route path="/discount/add" exact component={AddDiscount} />
      <Route path="/discout" exact componenet={AllDiscounts} />
      <Route path="/discount/update/:id" exact componenet={UpdateDiscount} />
      <Route path="/discount/delete/:id" exact componenet={DeleteDiscount} />
    </Router>
  );
}

export default App;
