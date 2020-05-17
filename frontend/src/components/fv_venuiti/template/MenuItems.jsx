import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';

export const menuMainItems = (
    <div>
        <ListItem button onClick={event => window.location.href = '/welcome'}>
            <ListItemIcon>
                <DashboardIcon/>
            </ListItemIcon>
            <ListItemText primary="URL Shortener"/>
        </ListItem>
    </div>
);

