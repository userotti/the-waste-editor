import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const TopNavigation = styled.div`
  padding: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

const TopNavigationLink = styled(Link)`
  padding: 20px;
  margin-left: 10px;
  text-align: center;
  background-color: black;
  color: white;
  text-decoration: none;
`;

class Navigation extends Component {

  render() {

    return (<TopNavigation>

      <TopNavigationLink to='/'>
        Assets Loading
      </TopNavigationLink>

      <TopNavigationLink to='/static-canvas'>
        Static Canvas
      </TopNavigationLink>

    </TopNavigation>)

  }

}

export default Navigation
