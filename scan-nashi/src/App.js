import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Switch, Route} from 'react-router-dom';
import RequireDataAuth from './helpers/require-data';
import Home from './components/home';
import Header from './components/header';
import Register from './components/user/register';
import Login from './components/user/login';
import Logout from './components/user/logout';
import Profil from './components/user/profil';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path='/' component={RequireDataAuth (Home)} />
        <Route exact path='/register' component={RequireDataAuth (Register)} />
        <Route exact path='/login' component={RequireDataAuth (Login)} />
        <Route exact path='/logout' component={RequireDataAuth (Logout)} />
        <Route exact path='/profil' component={RequireDataAuth (Profil, true)} />
      </Switch>
    </div>
  );
}

export default App;
