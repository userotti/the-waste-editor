import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux';
import styled from 'styled-components';


const OuterConatiner = styled.div`
background-color:  black;
display:  flex;
justify-content:  center;
height: 100vh;
`
const MenuConatiner = styled.div`
margin: 50px;
`
const MenuList = styled.ul`
list-style-type: none;
padding:0px;
background-color:  #883322;
padding:  50px;
`
const MenuItem = styled.li`
padding:  10px;
`
const FadedMenuItem = styled.li`
opacity: 0.3;
padding:  10px;
`

const MenuButton = styled.div`
cursor: pointer;
display:  flex;
color: white;
justify-content:  center;
padding:  10px;
background-color:  #777777;
width: 200px;
`


const LoadingText = styled.h1`
color: white;
`


const mapStateToProps = (state) =>{
  return {
    ...state
  }
}

class Home extends Component {


  componentDidMount() {

  }

  componentWillUnmount() {

  }

  componentDidUpdate() {


  }

  clickMenuItem = (id) => {

    switch (id) {
      case 'newgame':

        this.props.dispatch(push('/lobby'));

        break;
      default:

    }
  }

  render() {

    const menuItems = [
      {
        label: 'New Game',
        id: 'newgame',
        url: '/lobby'
      },
      {
        label: 'Join Game',
        id: 'joingame'
      },
      {
        label: 'Change Tileset',
        id: 'newtileset'
      },
      {
        label: 'Settings',
        id: 'settings'
      }
    ];

    const listItems = menuItems.map((item) => {
      return item.url ?
        <MenuItem key={item.id} onClick={() => this.clickMenuItem(item.id)}>
          <MenuButton>
            <span>{item.label}</span>
          </MenuButton>
        </MenuItem>
      : <FadedMenuItem key={item.id} onClick={() => this.clickMenuItem(item.id)}>
          <MenuButton>
            <span>{item.label}</span>
          </MenuButton>
        </FadedMenuItem>

    });

    return (
      <OuterConatiner>
        <MenuConatiner>
          <MenuList>
            {listItems}
          </MenuList>
        </MenuConatiner>
      </OuterConatiner>
    );

  }
}

export default connect(
  mapStateToProps,
  {

  }
)(Home);
