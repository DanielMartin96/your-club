import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../Register';
import Login from '../Login';
import Alert from '../Alert';
import Dashboard from '../Dashboard';
import AddPlayer from '../AddPlayer';
import EditPlayer from '../EditPlayer';
import AddTeam from '../AddTeam';
import EditTeam from '../EditTeam';

const Routes = () => {
  return (
    <>
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/add-player" component={AddPlayer} />
        <Route exact path="/edit-player/:id" component={EditPlayer} />
        <Route exact path="/add-team" component={AddTeam} />
        <Route exact path="/edit-team/:id" component={EditTeam} />
      </Switch>
    </>
  );
};

export default Routes;
