import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityDetails from '../details/ActivityDetails';
import ActivitiyForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeFrom: () => void;
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

export default function ActivityDasboard({ activities, selectedActivity, selectActivity,
    cancelSelectActivity, openForm, closeFrom, editMode, createOrEdit, deleteActivity, submitting }: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <
                    ActivityList activities={activities}
                    selectActivity={selectActivity}
                    deleteActivity={deleteActivity}
                    submitting={submitting}
                />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity &&
                    <ActivityDetails
                        activity={selectedActivity}
                        cancelSelectActivity={cancelSelectActivity}
                        openFrom={openForm}
                    />}
                {editMode &&
                    <ActivitiyForm
                        closeForm={closeFrom}
                        activity={selectedActivity}
                        createOrEdit={createOrEdit}
                        submitting={submitting}
                    />}
            </Grid.Column>
        </Grid>
    )
}