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
import UserPanel from './components/MyOrder/UserPanel/UserPanel';
import NoMatch from './components/NoMatch/NoMatch';

export const appContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  
  useEffect(() => {
    setLoggedInUser(JSON.parse(sessionStorage.getItem('user')))
  }, []);
  
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
              <UserPanel />
            </PrivateRoute>
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </Router>
      </appContext.Provider>
    </div>
  );
}

export default App;
