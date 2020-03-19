import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {Box,Container, Grid, FormControl, Select, MenuItem,InputLabel} from "@material-ui/core";
import settings from "./config";

const useStyles = theme => ({
    root: {
        flexGrow: 1,
    },
    form: {
        width: "100%"
    },
    formControl: {
        margin: theme.spacing(1),
        width: 400,
    },
    selectCampus:{
        width: 400,
    }
});

// SearchCollegePage - a class React component to displays a list of "colleges"
// based on the user selecting from a list of campuses
class SearchCollegePage extends React.Component {

    // constructor - called to initialize an instance of SearchCollegePage
    constructor(props) {
        super(props);

        // Initialize the component's store -- in this case, "results" is the list
        // of colleges, "campuses" is the list of campuses, and "choice" is the current
        // campus selected (short name)
        this.state = {results: null, campuses: null, choice: ""};

        // Bind event handlers so that they have access to "this"
        this.handleChange = this.handleChange.bind(this);
    }

    // handleChange - event handler for when the current selection of the campus
    // drop-down selection list changes
    handleChange(event) {

        // Get the campus code value for search
        const campus = event.target.value;
        this.setState({choice: campus});

        // Prepare for web service request
        const url =  settings.sws.baseURL + "student/v5/college.json?campus_short_name=" + campus;

        // Defines a header attribute used by the proxy to authenticate the request
        let requestInit = {
            headers: {
                'Application-Id': settings.sws.applicationID
            },
        };

        // Request the list of colleges from SWS
        fetch(url, requestInit)
            .then(res => res.json())
            .then((data) => {
                //                window.alert('here');
                this.setState({ results: data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // componentDidMount - event handler called after the React framework initializes
    // a component. Initializes the selection list of campuses
    componentDidMount() {

        // Request campuses from SWS
        let url = settings.sws.baseURL + "student/v5/campus.json";
        let requestInit = {
            headers: {
                'Application-Id': settings.sws.applicationID
            },
        };
        fetch(url, requestInit)
            .then(res => res.json())
            .then((data) => {
                //                window.alert('here');
                this.setState({ campuses: data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        // Access the styles
        const {classes} = this.props;

        // Render the selection list items for each campus
        let list = () => (this.state.campuses != null) ? this.state.campuses.Campuses.map((item, key) =>
                (<MenuItem value={item.CampusShortName} key={key}>{item.CampusName}</MenuItem>)
            ) : "";

        // Render the form input and the resulting output
        return (
            <Container>
                <Typography variant="h6">
                    University of Washington Colleges by Campus
                </Typography>
                <Box className={classes.form}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id={"select-campus-label"}>Select Campus</InputLabel>
                        <Select id={"select-campus"} labelId={"select-campus-label"} value={this.state.choice}
                            onChange={this.handleChange} className={classes.selectCampus}>
                            {list()}
                        </Select>
                    </FormControl>
                </Box>
                <Box>
                    {/*{(this.state.results != null)? JSON.stringify(this.state.results) : ""}*/}
                    {/*CODE INFO RIGHT HERE*/}
                    <table>
                        <tr>
                            <th>College</th>
                            <th>Abbreviation</th>
                            <th>Time</th>
                        </tr>
                        {(this.state.results != null)? this.state.results.Colleges.map((item,key)=> (
                            <tr key={key}>
                                <td>{item.CollegeName}</td>
                                <td>{item.CollegeAbbreviation}</td>
                                <td>{item.Quarter} {item.Year}</td>
                            </tr>
                        )) : ""}
                    </table>

                </Box>
            </Container>
        );
    }
}

// Assign styles to the class component
export default withStyles(useStyles)(SearchCollegePage);
