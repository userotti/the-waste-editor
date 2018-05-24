import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components';
import { assetManager } from '../../singletons/AssetManager'
import * as dat from 'dat.gui';

const ContainerDiv = styled.div`
padding: 20px;
bottom:0;
left:0;
top:0;
right: 0;
background-color: black;
`
const StyledHeading = styled.h4`
color: white;
`

const StyledDetail = styled.p`
color: white;
`

const StyledCanvas = styled.canvas`

width:800px;
height:800px;
border-style: solid;
border-width: 5px;
border-color: #232323;
`
const guiAPI = {

};



class ThreeJSCanvasContainer extends Component {
  state = {

  }

  constructor() {
    super();

  }

  componentDidMount() {


    this.onResize();
    window.addEventListener("resize", this.onResize.bind(this));
	  this.startRequestAnimationFrame();


    // Create a scene
    this.setState({


    }, ()=>{

			this.gui = new dat.GUI();
			this.initGui();
    });

  }




  initGui = () => {
  	var drop;

  	// this.gui.add( guiAPI, 'offsetX', 0.0, 1.0 ).name( 'offset.x' ).onChange( this.updateUvTransform );
  	// this.gui.add( guiAPI, 'offsetY', 0.0, 1.0 ).name( 'offset.y' ).onChange( this.updateUvTransform );
  	// this.gui.add( guiAPI, 'repeatX', 0.0, 2.0 ).name( 'repeat.x' ).onChange( this.updateUvTransform );
  	// this.gui.add( guiAPI, 'repeatY', 0.0, 2.0 ).name( 'repeat.y' ).onChange( this.updateUvTransform );
  	// this.gui.add( guiAPI, 'rotation', - 2.0, 2.0 ).name( 'rotation' ).onChange( this.updateUvTransform );
  	// this.gui.add( guiAPI, 'centerX', 0.0, 1.0 ).name( 'center.x' ).onChange( this.updateUvTransform );
  	// this.gui.add( guiAPI, 'centerY', 0.0, 1.0 ).name( 'center.y' ).onChange( this.updateUvTransform );
  }

  updateUvTransform = () => {
  	// var texture = this.mesh.material.map;
  	// if ( texture.matrixAutoUpdate === true ) {
  	// 	texture.offset.set( guiAPI.offsetX, guiAPI.offsetY );
  	// 	texture.repeat.set( guiAPI.repeatX, guiAPI.repeatY );
  	// 	texture.center.set( guiAPI.centerX, guiAPI.centerY );
  	// 	texture.rotation = guiAPI.rotation; // rotation is around [ 0.5, 0.5 ]
  	// } else {
  	// 	// one way...
  	// 	//texture.matrix.setUvTransform( guiAPI.offsetX, guiAPI.offsetY, guiAPI.repeatX, guiAPI.repeatY, guiAPI.rotation, guiAPI.centerX, guiAPI.centerY );
  	// 	// another way...
  	// 	texture.matrix
  	// 	    .identity()
  	// 	    .translate( - guiAPI.centerX, - guiAPI.centerY )
  	// 	    .rotate( guiAPI.rotation )					// I don't understand how rotation can preceed scale, but it seems to be required...
  	// 	    .scale( guiAPI.repeatX, guiAPI.repeatY )
  	// 	    .translate( guiAPI.centerX, guiAPI.centerY )
  	// 	    .translate( guiAPI.offsetX, guiAPI.offsetY );
  	// }
  }

  componentWillUnmount() {

		this.gui.destroy()
    window.removeEventListener("resize", this.onResize.bind(this));

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


    this.startRequestAnimationFrame();
  }

  onResize() {
    if (this.canvasElement){
      this.updateCanvasDimensions();
    }
  }

  updateCanvasDimensions() {
    if (this.canvasElement){

      //Make fullscreen canvas, but we can do anything here.

      // Lookup the size the browser is displaying the canvas.
      var displayWidth  = 800;
      var displayHeight = 800;

      // Check if the canvas is not the same size.
      if (this.canvasElement.width  !== 800 || this.canvasElement.height !== 800) {

        // Make the canvas the same size
        this.canvasElement.width  = displayWidth;
        this.canvasElement.height = displayHeight;


      }
    }
  }

  screenTap = () => {
  }

	onWheel = (e) => {
		console.log('hallo')
	}


  shouldComponentUpdate(props) {
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


export default connect((state) =>{
  return {
    assets: state.assetState,
    tilesetJSON: state.assetState.tilesetJSON,
    tilemapJSON: state.assetState.tilemapJSON
  }
},
{

}
)(ThreeJSCanvasContainer);
