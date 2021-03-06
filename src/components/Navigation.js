import React, { Component } from 'react';
import { connect } from "react-redux";
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const TopNavigation = styled.div`
  padding: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #dedede;
`;

const TopNavigationLink = styled(Link)`
  padding: 20px;
  margin-left: 10px;
  text-align: center;
  background-color: black;
  opacity: ${(props)=> props.storeready ? 1 : 0.2 };
  cursor: ${(props)=> props.storeready ? `pointer` : `not-allowed` };
  color: white;
  text-decoration: none;
`;

class Navigation extends Component {

  render() {

    return (<TopNavigation>

      <TopNavigationLink to='/' storeready={1}>
        Assets Loading
      </TopNavigationLink>

      <TopNavigationLink to={this.props.allTiledAssetsLoaded ? '/static-canvas' : '' } storeready={this.props.allTiledAssetsLoaded ? 1 : 0}>
        Static Canvas
      </TopNavigationLink>

      <TopNavigationLink to={this.props.allTiledAssetsLoaded ? '/threejs-canvas' : '' } storeready={this.props.allTiledAssetsLoaded ? 1 : 0}>
        ThreeJS
      </TopNavigationLink>

      <TopNavigationLink to={this.props.allTiledAssetsLoaded ? '/pixijs-canvas' : '' } storeready={this.props.allTiledAssetsLoaded ? 1 : 0}>
        PixiJS
      </TopNavigationLink>

    </TopNavigation>)

  }

}


export default connect(
  state => ({
    allTiledAssetsLoaded: state.tiledState.allTiledAssetsLoaded,
  }),
  {}
)(Navigation);
