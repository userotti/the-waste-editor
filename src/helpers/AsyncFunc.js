import React, { Component } from 'react';
import ReactPlaceholder from 'react-placeholder';
import 'react-placeholder/lib/reactPlaceholder.css';

export default function asyncComponent(importComponent) {
  class AsyncFunc extends Component {
    constructor(props) {
      super(props);
      this.state = {
        component: null
      };
    }
    componentWillMount() {

    }
    componentWillUnmount() {
      this.mounted = false;
    }
    async componentDidMount() {
      this.mounted = true;


      let ImportedComponent = null;

      try {
        ImportedComponent = await importComponent();
      } catch(error){
        console.log("error: ", error);
      }

      if (ImportedComponent){
        const { default: Component } = ImportedComponent;

        if (this.mounted) {
          this.setState({
            component: <Component {...this.props} />
          });
        }
      }

    }

    render() {
      const Component = this.state.component || <div />;
      return (
        <ReactPlaceholder type="text" rows={7} ready={Component !== null}>
          {Component}
        </ReactPlaceholder>
      );
    }
  }
  return AsyncFunc;
}
