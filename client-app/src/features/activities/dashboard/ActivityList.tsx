import { link } from 'fs';
import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { useEffect } from 'react';
import { Button, Item, ItemGroup, ItemHeader, Label, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';

export default observer(function ActivityList() {
    const { activityStore } = useStore();
    const { deleteActivity, activitiesByDate, loading } = activityStore;
    const [target, setTarget] = useState('');

    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteActivity(id)
    }
    useEffect(() => {
      activityStore.loadActivities();
    }, [activityStore])
  
    if (activityStore.loadingInitial) return <LoadingComponent content='Loading App...' />

    return (
        <Segment>
            <ItemGroup divided>
                {activitiesByDate.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <ItemHeader as='a'>{activity.title}</ItemHeader>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>

                            </Item.Description>
                            <Item.Extra>
                                <Button as={link} to={`/activities/${activity.id}`} floated='right' content='View' color='blue' />
                                <Button
                                    name={activity.id}
                                    loading={loading && target === activity.id}
                                    onClick={(e) => handleActivityDelete(e, activity.id)}
                                    floated='right'
                                    content='Delete'
                                    color='red' />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </ItemGroup>
        </Segment>
    )
})