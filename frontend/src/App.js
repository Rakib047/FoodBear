import './App.css';
import { SignupDP } from './pages/DeliveryPerson/SignupDP';
import { LoginDP } from './pages/DeliveryPerson/LoginDP';
import {SignupRes} from './pages/Restaurant/SignupRes'
import {LoginRes} from './pages/Restaurant/LoginRes'
import {DashboardRes} from "./pages/Restaurant/DashboardRes"
import Foods from './pages/Restaurant/Foods'
import { UserContextProvider } from './contexts/UserContext';
import {Home} from "./pages/Home"
import  {BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import { DashboardDP } from './pages/DeliveryPerson/DashboardDP';

function App() {
  return (
    <UserContextProvider>
        <Router>
          <div>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/restaurant/signup" element={<SignupRes />} />
              <Route exact path="/restaurant/login" element={<LoginRes />} />
              <Route exact path="/restaurant/foods" element={<Foods />} />
              <Route exact path="/restaurant/dashboard" element={<DashboardRes />} />
              <Route exact path="/deliveryperson/signup" element={<SignupDP />} />
              <Route exact path="/deliveryperson/login" element={<LoginDP />} />
              <Route exact path="/deliveryperson/dashboard" element={<DashboardDP />} />
            </Routes>
          </div>
        </Router>
    </UserContextProvider>
  );
}

export default App;
