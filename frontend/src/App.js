import './App.css';
import {Signup} from "./pages/User/Signup"
import {Login} from "./pages/User/Login"
import {Dashboard_User} from "./pages/User/Dashboard"
import { UserHome } from './pages/User/UserHome';
import {MyCart} from './pages/User/MyCart';
import RestFoods_User from './pages/User/InsideRestaurant';
import Foods from './pages/Restaurant/Foods';
import { SignupDP } from './pages/DeliveryPerson/SignupDP';
import { LoginDP } from './pages/DeliveryPerson/LoginDP';
import {SignupRes} from './pages/Restaurant/SignupRes'
import {LoginRes} from './pages/Restaurant/LoginRes'
import {DashboardRes} from "./pages/Restaurant/DashboardRes";
import {StatisticsRes} from "./pages/Restaurant/StatisticsRes";
import { UserContextProvider } from './contexts/UserContext';
import {Home} from "./pages/Home"
import RestaurantSalesPage from "./pages/Restaurant/Statistics"
import  {BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import { DashboardDP } from './pages/DeliveryPerson/DashboardDP';
import GoogleMap from './pages/User/Map';

function App() {
  return (
    <UserContextProvider>
        <Router>
          <div>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/user/dashboard" element={<Dashboard_User/>}/>
              <Route exact path="/user/restaurant" element={<UserHome/>}/>
              <Route exact path="/user/restaurant/foods" element={<RestFoods_User/>}/>
              <Route exact path="/user/mycart" element={<MyCart/>}/>

              <Route exact path="/restaurant/signup" element={<SignupRes />} />
              <Route exact path="/restaurant/login" element={<LoginRes />} />
              <Route exact path="/restaurant/foods" element={<Foods />} />
              <Route exact path="/restaurant/statistics" element={<RestaurantSalesPage />} />
              <Route exact path="/restaurant/dashboard" element={<DashboardRes />} />
              <Route exact path="/restaurant/statistics" element={<StatisticsRes />} />
              <Route exact path="/deliveryperson/signup" element={<SignupDP />} />
              <Route exact path="/deliveryperson/login" element={<LoginDP />} />
              <Route exact path="/deliveryperson/dashboard" element={<DashboardDP />} />
              <Route exact path="/test" element={<GoogleMap />} />

            </Routes>
          </div>
        </Router>
    </UserContextProvider>
  );
}

export default App;
