import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import SimplePayment from './components/SimplePayment/SimplePayment';
import Login from './components/Login/Login';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Home from './components/Home/Home/Home';
import { useEffect } from 'react';
import Admin from './components/Admin/Admin/Admin';
import ServiceList from './components/Home/ServiceList/ServiceList';
import MyOrder from './components/MyOrder/MyOder/MyOrder';

export const appContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  
  useEffect(() => {
    setLoggedInUser(JSON.parse(sessionStorage.getItem('user')))
  }, [])
  
  return (
    <div className="App">
      <appContext.Provider
        value={{
          loggedInUser, setLoggedInUser,
          loadingSpinner, setLoadingSpinner
        }}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/services/:category">
              <ServiceList />
            </Route>

            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute path="/admin">
              <Admin />
            </PrivateRoute>
            <PrivateRoute path="/myOrder">
              <MyOrder />
            </PrivateRoute>
          </Switch>
        </Router>
      </appContext.Provider>
    </div>
  );
}

export default App;
