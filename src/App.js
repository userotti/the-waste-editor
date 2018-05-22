import React, { Component } from 'react'
import { Provider } from 'react-redux';
import store from './store';
import history from './singletons/History.js';
import PublicRoutes from './router.js'



class App extends Component {

  componentWillUnmount() {

  }

  componentWillMount() {
    // this.props.dispatch(push('/loading'));
  }

  componentDidMount() {

  }

  render() {
    return (<div>
      <Provider store={store}>
          <PublicRoutes history={history} />
      </Provider>
    </div>)

  }
}

export default App;
