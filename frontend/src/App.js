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
import DiscountsReport from "./components/DiscountsReport";
import ProductRatingReport from "./components/ProductRatingReport";
import SalesForecast from "./components/SalesForecast";
import SalesForecastResult from "./components/SalesForecastResult";
import ContactUs from "./components/ContactUs";

function App() {
  return (
    <Router>
      <Header />
      <Route path="/" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/adminlogin" exact component={AdminLogin} />
      <Route path="/home/:pNum" exact component={UserHome} />
      <Route path="/viewproduct/:id/:pNum" exact component={ProductPage} />
      <Route path="/cart" exact component={ShoppingCart} />
      <Route path="/purchaseHistory" exact component={PurchaseHistory} />
      <Route path="/adminhome" exact component={AdminHome} />
      <Route path="/adminhome/discount/add" exact component={AddDiscount} />
      <Route path="/adminhome/discount/" exact component={AllDiscounts} />
      <Route
        path="/adminhome/discount/update/:id"
        exact
        component={UpdateDiscount}
      />
      <Route
        path="/adminhome/discount/delete/:id"
        exact
        component={DeleteDiscount}
      />
      <Route
        path="/adminhome/discount/reports"
        exact
        component={DiscountsReport}
      />
      <Route
        path="/adminhome/ProductRatingReport"
        exact
        component={ProductRatingReport}
      />
      <Route path="/adminhome/salesforecast" exact component={SalesForecast} />
      <Route
        path="/adminhome/salesforecast/result"
        exact
        component={SalesForecastResult}
      />
      <Route path="/ContactUs" exact component={ContactUs}/>
    </Router>
  );
}

export default App;
