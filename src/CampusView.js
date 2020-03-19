import React from 'react';
import Typography from '@material-ui/core/Typography';
import {Container} from "@material-ui/core";
import settings from "./config";

// CampusView - a class React component to display a list of campuses retrieved from the
// UW SWS web service (campus.json)
export default class CampusView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {results: null};
    }

    // componentDidMount - a React event handler called when the React framework
    // has initialized the component and is ready to ready it. This handler is
    // used to cause data to be consumed from a web service
    componentDidMount() {

        // Initialize call to a web service. The config.json file contains default
        // settings for this application to use rather than hard-code these into
        // component source files.
        let url = settings.sws.baseURL + "/student/v5/campus.json";

        // Add header containing custom header used by proxy to authenticate call
        let requestInit = {
          headers: {
            'Application-Id': settings.sws.applicationID
          },
        };

        // Call SWS web service and process results using promises that
        // handle the asynchronous aspects of the call-- that is the code
        // waits on the previous code as completed through the "then" phrases.
        // Note that "fetch" makes the AJAX call to the web service.
        fetch(url, requestInit)
            .then(res => res.json())
            .then((data) => {
                // Update the state of this component so that the data
                // retrieved will be rendered
                this.setState({ results: data });
            })
           .catch((error) => {
               console.log(error);
           });
    }

    render() {
        // Render the data (in this case JSON from SWS campus service) using
        // conditional and iteration
        return (
            <Container>
                <Typography variant="h6">
                    University of Washington Campuses
                </Typography>
                <div>
                    <ul>
                    {(this.state.results != null) ? this.state.results.Campuses.map((item, key) =>
                        (<li key={key}>{item.CampusName}</li>)
                    ) : "Waiting..."}
                    </ul>
                </div>
            </Container>
        );
    }
}

