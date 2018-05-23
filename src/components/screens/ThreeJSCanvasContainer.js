import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components';
import { assetManager } from '../../singletons/AssetManager'
import * as THREE from 'three';


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

width:500px;
height:500px;
border-style: solid;
border-width: 5px;
border-color: #232323;
`



class ThreeJSCanvasContainer extends Component {
  state = {

  }
  componentDidMount() {

    this.onResize();
    window.addEventListener("resize", this.onResize.bind(this));
    this.startRequestAnimationFrame();

    // Create a scene
    this.setState({
        renderer: new THREE.WebGLRenderer({ canvas: this.canvasElement }),
        scene: new THREE.Scene(),
        camera: new THREE.PerspectiveCamera( 75, 1, 2, 1000 ),
        tilesetTexture: assetManager.assetMap.tilesetTexture,
        singleTileGeometry: new THREE.BoxGeometry( 10, 10, 1 )
    }, ()=>{

      console.log('state: ', this.state);
      //
      // let material = new THREE.MeshBasicMaterial( { map: texture} );
      // mesh = new THREE.Mesh( geometry, material );
      // scene.add( this.mesh );
      // camera.position.z = 30;


    });

  }

  componentWillUnmount() {

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
    //
    // // Rotate the x position of the mesh by 0.03
    // this.mesh.rotation.x += 0.03;
    // // Rotate the y position of the mesh by 0.02
    // this.mesh.rotation.y += 0.02;


    this.state.renderer.render(this.state.scene,this.state.camera);
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
      var displayWidth  = 500;
      var displayHeight = 500;

      // Check if the canvas is not the same size.
      if (this.canvasElement.width  !== 500 || this.canvasElement.height !== 500) {

        // Make the canvas the same size
        this.canvasElement.width  = displayWidth;
        this.canvasElement.height = displayHeight;


      }
    }
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
    assets: state.assetState
  }
},
{

}
)(ThreeJSCanvasContainer);
