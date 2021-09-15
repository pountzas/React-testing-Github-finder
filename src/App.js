import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import axios from 'axios';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  // state = {
  //   users: [],
  //   user: {},
  //   repos: [],
  //   loading: false,
  //   alert: null
  // }

  const componentDidMount = async () => {
    // this.setState({ loading: true });
    setLoading(true);

    const res = await axios.get(`https://api.github.com/users?client_id=
      ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
      ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
    // this.setState({ users: res.data, loading: false });
    setUsers(res.data);
    setLoading(false);
  }
  
  // search users
  const searchUsers = async text => {
    // this.setState({ loading: true });
    setLoading(true);

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=
      ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
      ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
    // this.setState({ users: res.data.items, loading: false });
    setUsers(res.data.items);
    setLoading(false);
  }

  // get single user
  const getUser = async (username) => {
    // this.setState({ loading: true });
    setLoading(true);

    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=
      ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
      ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
    // this.setState({ user: res.data, loading: false });
    setUser(res.data);
    setLoading(false);
  }

  // get user's repos
  const getUserRepos = async (username) => {
    // this.setState({ loading: true });
    setLoading(true);

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=
      ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
      ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
    // this.setState({ repos: res.data, loading: false });
    setRepos(res.data);
    setLoading(false);
  }

  // clear users
  const clearUsers = () => {
    // this.setState({ users: [], loading: false });
    setUsers([]);
  }

  const showAlert = (msg, type) => {
    // this.setState({ alert: { msg, type } });
    setAlert({ msg, type });

    // setTimeout(() => this.setState({ alert: null }), 5000);
    setTimeout(() => setAlert(null), 5000);
  }

  return (
    <Router>
      <div className="App">
        <Navbar title="Github finder" icon="fab fa-github" />
        <div className='container'>
          <Alert alert={alert} />
          <Switch>
            <Route exact path='/' render={props => (
              <Fragment>
                <Search
                  searchUsers={searchUsers}
                  clearUsers={clearUsers}
                  showClear={users.length > 0 ? true : false}
                  setAlert={showAlert}
                />
                <Users loading={loading} users={users}/>
              </Fragment>
            )}
          />
          <Route exact path='/about' component={About} />
          <Route exact path='/user/:login' render={props => (
            <User 
            { ...props }
            getUser={getUser}
            getUserRepos={getUserRepos}
            user={user}
            repos={repos}
            loading={loading}
              />
          )} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
