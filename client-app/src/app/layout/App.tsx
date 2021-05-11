import React from 'react';
import { Container } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Route } from 'react-router';
import NavBar from './NavBar';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import ActivityDasboard from '../../features/activities/dashboard/ActivityDashboard';


function App() {
  
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <Route exact path='/' component={HomePage}/>
        <Route path='/activities' component={ActivityDasboard}/>
        <Route path='/activity/:id' component={ActivityDetails} />
        <Route path='/createActivity' component={ActivityForm}/>
      </Container>
    </>
  );
}

export default observer(App);
