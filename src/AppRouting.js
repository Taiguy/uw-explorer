import React from 'react';
import {Switch,Route} from "react-router-dom";
import HomePage from './HomePage';
import CampusView from './CampusView';
import SearchCollegePage from "./SearchCollegePage";
import CourseView from  './CourseView';

// Supports the routing to show different components as distinct pages based on URL of the current page
// Uses react-router-dom framework to perform the routing based on path
export default function AppRouting(props) {
    return (
        <React.Fragment>
            <Switch>
                <Route exact path={"/"} component={HomePage} />
                <Route path={"/campuses"} component={CampusView} />
                <Route path={"/colleges"} component={SearchCollegePage} />
                <Route path={"/courses"} component={CourseView} />
            </Switch>
        </React.Fragment>
    );

}
