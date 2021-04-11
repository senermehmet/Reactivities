import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDasboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';


function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);


  useEffect(() => {
    agent.Activities.list().then(response => {
      let activities: Activity[] = [];
      response.forEach(activity => {
        activity.date = activity.date.split('T')[0]; //Dönen string değeri spilit ile tarih kısmını ayırıp tekrar set ettik.
        activities.push(activity);
      })
      setActivities(response);
      setLoading(false);
    })
  }, [])

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find(x => x.id === id))
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
    setEditMode(false);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function hendleCreateOrEditActivity(activity: Activity) {
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(x => x.id !== activity.id), activity])
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }
    else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }
  }

  function handleDeleteActivity(id: string) {
    setActivities([...activities.filter(x => x.id !== id)])
  }

  if (loading) return <LoadingComponent content='Loading App...' />

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDasboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeFrom={handleFormClose}
          createOrEdit={hendleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;
