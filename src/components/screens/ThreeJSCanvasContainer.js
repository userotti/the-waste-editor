import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components';
import { assetManager } from '../../singletons/AssetManager'
import * as THREE from 'three';


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
width: 500px;
height: 500px;
border-style: solid;
border-width: 5px;
border-color: yellow;
`

const mapStateToProps = (state) =>{
    return {
        creatures: state.sceneState.creatures,
        assets: state.assetState
    }
}

class ThreeJSCanvasContainer extends Component {

    componentDidMount() {

        this.onResize();
        setTimeout(()=>{
                // Load a texture
        	let texture = new THREE.TextureLoader().load( "/static/assets/playplay/spritesheet.png" );

        	// Create a scene
        	this.scene = new THREE.Scene();

        	// Create a geometry
        	// 	Create a box (cube) of 10 width, length, and height
        	let geometry = new THREE.BoxGeometry( 10, 10, 10 );
        	// Create a MeshBasicMaterial with a loaded texture
        	let material = new THREE.MeshBasicMaterial( { map: texture} );

        	// Combine the geometry and material into a mesh
        	this.mesh = new THREE.Mesh( geometry, material );

          // Create a geometry


          // // 	Create a box (cube) of 10 width, length, and height
        	// let geometry = new THREE.BoxGeometry( 10, 10, 10 );
        	// // Create a MeshBasicMaterial with a color white and with its wireframe turned on
        	// let material = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: false} );
          //
        	// // Combine the geometry and material into a mesh
        	// this.mesh = new THREE.Mesh( geometry, material );
        	// // Add the mesh to the scene

        	// Add the mesh to the scene
        	this.scene.add( this.mesh );

        	// Create a camera
        	// 	Set a Field of View (FOV) of 75 degrees
        	// 	Set an Apsect Ratio of the inner width divided by the inner height of the window
        	//	Set the 'Near' distance at which the camera will start rendering scene objects to 2
        	//	Set the 'Far' (draw distance) at which objects will not be rendered to 1000
        	this.camera = new THREE.PerspectiveCamera( 75, 1, 2, 1000 );
        	// Move the camera 'out' by 30
        	this.camera.position.z = 30;

        	// Create a WebGL Rendered
        	this.renderer = new THREE.WebGLRenderer({ canvas: this.canvasElement });

          window.addEventListener("resize", this.onResize.bind(this));
          this.startRequestAnimationFrame();

        }, 2000)




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

        // Rotate the x position of the mesh by 0.03
	      this.mesh.rotation.x += 0.03;
      	// Rotate the y position of the mesh by 0.02
      	this.mesh.rotation.y += 0.02;


        this.renderer.render(this.scene,this.camera);
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

export default connect(
  mapStateToProps,
  {

  }
)(ThreeJSCanvasContainer);
