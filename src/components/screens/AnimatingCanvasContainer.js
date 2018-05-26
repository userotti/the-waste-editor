import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components';

const ContainerDiv = styled.div`
padding: 20px;
overflow: hidden;
position: absolute;
background-color: black;
bottom:0;
left:0;
top:0;
right: 0;
`
const StyledHeading = styled.h4`
color: yellow;
`
const StyledCanvas = styled.canvas`
width:500px;
height:500px;
border-style: solid;
border-width: 5px;
border-color: yellow;
`

const mapStateToProps = (state) =>{
    return {
        creatures: state.sceneState.creatures,
        assets: state.tiledState
    }
}

class AnimatingCanvasContainer extends Component {

    componentDidMount() {

        window.addEventListener("resize", this.onResize.bind(this));


        this.startRequestAnimationFrame();
        this.onResize();

    }

    componentWillUnmount() {

        window.removeEventListener("resize", this.onResize.bind(this));

    }

    componentDidUpdate() {
        // this.updateCanvas();
    }

    startRequestAnimationFrame() {
        if (!this.requestId) {
           this.requestId = window.requestAnimationFrame(this.animationLoop);
        }
    }

    stopRequestAnimationFrame() {
        if (this.requestId) {
           window.cancelAnimationFrame(this.requestId);
           this.requestId = undefined;
        }
    }

    animationLoop = (time) => {
        this.requestId = undefined;

        //This belongs on the server!
        //-----------
        this.updateCreaturesBehaviour(this.props);
        //-----------
        this.updateCanvas(this.props);


        this.startRequestAnimationFrame();
    }

    onResize() {
        if (this.canvasElement){
            this.updateCanvasDimensions();
            this.updateCanvas(this.props);
        }
    }

    //This is a game loop callback that happens on the server.
    //
    updateCreaturesBehaviour(props) {
        let now = Date.now();

        //Big switch statement for fireing off actions, wil be on the server eventually.
        for (let id of props.creatures.byId){
            let creature = props.creatures.byHash[id];

            if (now - creature.touched > creature.deltatime ){

                switch (creature.behaviour) {
                    case 'move-left':

                        // props.dispatch(updateCreature(creature.id, {
                        //     posx: creature.posx + 20,
                        //     touched: now
                        // }));

                        break;
                    default:

                }
            }


        }
    }

    updateCanvasDimensions() {
        if (this.canvasElement){

            //Make fullscreen canvas, but we can do anything here.

            // Lookup the size the browser is displaying the canvas.
            var displayWidth  = document.documentElement.clientWidth;
            var displayHeight = document.documentElement.clientHeight;

            // Check if the canvas is not the same size.
            if (this.canvasElement.width  !== displayWidth || this.canvasElement.height !== displayHeight) {

                // Make the canvas the same size
                this.canvasElement.width  = displayWidth;
                this.canvasElement.height = displayHeight;


            }
        }
    }


    updateCanvas(props) {

        const ctx = this.canvasElement.getContext('2d');
        ctx.clearRect(0,0, this.canvasElement.width, this.canvasElement.height);

        for (let id of props.creatures.byId){
            let creature = props.creatures.byHash[id];
            ctx.fillStyle = creature.color;
            ctx.fillRect(creature.posx, creature.posy, 20, 20);
        }

    }

    screenTap(){


        // this.props.dispatch(tilesetFetchData('/static/assets/tiled/skellie.json'));


        let creatureId = Math.random();
        // this.props.dispatch(createCreature(creatureId, {
        //     id: creatureId,
        //     name: "Koos",
        //     age: 0,
        //     color: 'red',
        //     behaviour: 'move-left',
        //     deltatime: 100,
        //     posx: 100,
        //     posy: 100,
        //     previousPosx: 100,
        //     previousPosy: 100,
        //     touched: Date.now()
        // }));
        // name: action.payload.name ? action.payload.name : "Random Creature "+ Math.random(),
        // age: action.payload.age ? action.payload.age : 0,
        // color: action.payload.color ? action.payload.color : 'white',
        // behaviour: action.payload.behaviour ? action.payload.behaviour : 'idle',
        // deltatime: action.payload.deltatime ? action.payload.deltatime : 1000,
        // posx: action.payload.posx,
        // posy: action.payload.posy
    }


    shouldComponentUpdate(props) {

        // this.props = Object.assign({}, props);
        return false;
    }

    render() {
        return (
            <ContainerDiv>
                <StyledHeading>Canvas:</StyledHeading>
                <StyledCanvas innerRef={(canvas) => { this.canvasElement = canvas }} onClick={() => this.screenTap() } />
            </ContainerDiv>
        );
    }
}

export default connect(
  mapStateToProps,
  {

  }
)(AnimatingCanvasContainer);
