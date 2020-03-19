import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Header from "./Header";
import Footer from "./Footer";
import AppRouting from "./AppRouting";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

// App - function React component to be core program
function App() {
  const classes = useStyles();

  return (
    <Router>
      <div className="root">
        <Header/>
        <main>
          <AppRouting/>
        </main>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
