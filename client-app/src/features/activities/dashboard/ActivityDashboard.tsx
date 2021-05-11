import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ActivityDetails from '../details/ActivityDetails';
import ActivitiyForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

export default observer(
    function ActivityDasboard() {
        const { activityStore } = useStore();
        const { selectedActivity, editMode } = activityStore;
        useEffect(() => {
            activityStore.loadActivities();
        }, [activityStore])
        if (activityStore.loadingInitial) return <LoadingComponent content='Loading App...' />
        return (
            <Grid>
                <Grid.Column width='10'>
                    <ActivityList />
                </Grid.Column>
                <Grid.Column width='6'>
                    {selectedActivity &&
                        <ActivityDetails />}
                    {editMode &&
                        <ActivitiyForm />}
                </Grid.Column>
            </Grid>
        )
    }
)