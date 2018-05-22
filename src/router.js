import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route, Link } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import styled from 'styled-components';
import store from './store';
import { push } from 'react-router-redux';

import asyncComponent from "./helpers/AsyncFunc";
import Navigation from './components/Navigation';
import AnimatingCanvasContainer from './components/screens/AnimatingCanvasContainer'
import StaticCanvasContainer from './components/screens/StaticCanvasContainer'
import ThreeJSCanvasContainer from './components/screens/ThreeJSCanvasContainer'

import loadingActions from './actions/assetActions/loading';


const { loadTilesetJSON, loadTilemapJSON, loadTilesetSpritesheet, allAssetsLoaded } = loadingActions;


class PublicRoutes extends Component {

  getRoutes = () => {
    return [
      {
        path: "/",
        component: asyncComponent(() => {

          return new Promise(function(resolve, reject) {
            resolve(import('./components/screens/LoadingScreen'));
          });

        })
      },

      {
        path: "/static-canvas",
        component: asyncComponent(() => {

          if (this.props.allAssetsLoaded){
            return import('./components/screens/StaticCanvasContainer');
          } else {
            this.props.push('/');
            return Promise.reject({allAssetsLoaded: this.props.allAssetsLoaded});
          }

        })
      },

      {
        path: "/threejs-canvas",
        component: asyncComponent(() => {

          if (this.props.allAssetsLoaded){
            return import('./components/screens/ThreeJSCanvasContainer');
          } else {
            this.props.push('/');
            return Promise.reject({allAssetsLoaded: this.props.allAssetsLoaded});
          }

        })
      },

    ]
  }

  render() {
    return (


      <ConnectedRouter history={this.props.history}>
        <div>

          <Navigation></Navigation>

          {this.getRoutes().map(singleRoute => {
            const { path, exact, ...otherProps } = singleRoute;
            return (
              <Route
                exact={exact === false ? false : true}
                key={path}
                path={`${path}`}
                {...otherProps}
              />
            );
          })}

        </div>
      </ConnectedRouter>
    );
  }

};

export default connect(
  state => ({

    allAssetsLoaded: state.assetState.allAssetsLoaded,

  }),
  {
    push
  }
)(PublicRoutes);
