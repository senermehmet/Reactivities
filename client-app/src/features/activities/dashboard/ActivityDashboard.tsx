import { observer } from 'mobx-react-lite';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ActivityDetails from '../details/ActivityDetails';
import ActivitiyForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

export default observer(
    function ActivityDasboard() {
        const { activityStore } = useStore();
        const { selectedActivity, editMode } = activityStore;
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