import React from 'react';
// import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { graphql, QueryRenderer } from 'react-relay';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import auth0Client from 'auth/Auth';
import Analytics from 'react-router-ga';

/* global app components */
import AppBar from 'components/AppBar/AppBar';
import SideBar from 'components/SideBar/SideBar';
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from 'react-toasts';

// Routes
import { Grommet } from 'grommet';
import { ZoomTheme } from 'styles/ZoomTheme';
import Routes from './Routes';

const modernEnvironment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource())
});

function fetchQuery(operation, variables) {
  return fetch(`${process.env.REACT_APP_GRAPHQL_HOST}/graphql/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: operation.text,
      variables
    })
  }).then(response => {
    return response.json();
  });
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showSidebar: false,
      authChanged: false,
      checkingSession: true
    };
  }

  componentDidMount() {
    if (window.location.pathname.indexOf('/callback') !== -1) {
      this.setState({ checkingSession: false });
      return;
    }
    try {
      auth0Client.silentAuth().then(() => this.forceUpdate());
    } catch (err) {}
    this.setState({ checkingSession: false });
  }

  render() {
    return (
      <Grommet theme={ZoomTheme}>
        <QueryRenderer
          environment={modernEnvironment}
          query={graphql`
            query AppQuery {
              ...HomeModuleMediator_indicatorAggregations
              ...FocusModuleMediator_indicatorAggregations
              ...CountryDetailMediator_indicatorAggregations
              ...ExplorePanelMediator_dropDownData
              ...MetaDataMediator_dropDownData
              ...CorrectErrorsMediator_fileCorrection
            }
          `}
          variables={{}}
          render={({ error, props }) => {
            if (props) {
              return (
                <Router>
                  <React.Fragment>
                    <ToastsContainer
                      store={ToastsStore}
                      position={ToastsContainerPosition.TOP_CENTER}
                    />
                    <AppBar
                      toggleSideBar={() =>
                        this.setState({ showSidebar: !this.state.showSidebar })
                      }
                      auth0Client={auth0Client}
                    />
                    <SideBar
                      auth0Client={auth0Client}
                      open={this.state.showSidebar}
                      toggleSideBar={() =>
                        this.setState({ showSidebar: !this.state.showSidebar })
                      }
                    />
                    <Analytics id="UA-134931738-2">
                      <Routes {...props} auth0Client={auth0Client} />
                    </Analytics>
                  </React.Fragment>
                </Router>
              );
            } else {
              return <div>Loading</div>;
            }
          }}
        />
      </Grommet>
    );
  }
}

export default App;
