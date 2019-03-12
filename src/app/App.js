import React from 'react';
// import { Provider } from 'react-redux';
import { BrowserRouter as Router, withRouter } from 'react-router-dom';
import { graphql, QueryRenderer } from 'react-relay';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import auth0Client from 'auth/Auth';
import Analytics from 'react-router-ga';

/* utils */
import isEqual from 'lodash/isEqual';

// Routes
import Routes from './Routes';
import { Grommet } from 'grommet';
import { ZoomTheme } from 'styles/ZoomTheme';

/* global app components */
import AppBar from 'components/AppBar/AppBar';
import SideBar from 'components/SideBar/SideBar';
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from 'react-toasts';
import * as nodeActions from 'services/actions/nodeBackend';
import { connect } from 'react-redux';

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
      auth0Client.silentAuth().then(results => {
        this.props.dispatch(
          nodeActions.getUserRequest({ authId: results.idTokenPayload.sub })
        );
        this.forceUpdate();
      });
    } catch (err) {}
    this.setState({ checkingSession: false });
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.user, prevProps.user)) {
      if (this.props.user.data) console.log('update user');
      else if (this.props.user.status === 404)
        // so if a user was not found in our zoom backend after signing in ^
        // we add it as a new user
        console.log('add new user');
    }
  }

  render() {
    return (
      <Grommet theme={ZoomTheme}>
        <QueryRenderer
          environment={modernEnvironment}
          query={graphql`
            query AppQuery {
              ...HomeModuleMediator_indicatorAggregations
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

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(App);
