import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components';
import { assetManager } from '../../singletons/AssetManager'
import * as THREE from 'three';
import * as dat from 'dat.gui';

const gui = new dat.GUI();
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
const API = {
	offsetX: 0,
	offsetY: 0,
	repeatX: 1,
	repeatY: 1,
	rotation: 0, // positive is counter-clockwise
	centerX: 0,
	centerY: 0
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

    let tilemapCanvas = document.createElement('canvas');
    tilemapCanvas.width = this.props.tilemapJSON.width * this.props.tilemapJSON.tilewidth;
    tilemapCanvas.height = this.props.tilemapJSON.height * this.props.tilemapJSON.tileheight;

    console.log("tilemapCanvas.width: ", tilemapCanvas.width);
    console.log("tilemapCanvas.height: ", tilemapCanvas.height);

    let cameraWidth = 25;
    let cameraHeight = 25;



    // Create a scene
    this.setState({
        renderer: new THREE.WebGLRenderer({ canvas: this.canvasElement }),
        scene: new THREE.Scene(),
        camera: new THREE.OrthographicCamera( cameraWidth / - 2, cameraWidth / 2, cameraHeight / 2, cameraHeight / - 2, 1, 1000 ),
        tilesetTexture: assetManager.getTilesetTexture(),
        singleTileGeometry: new THREE.PlaneGeometry( 16, 16 ),
        tilemapCanvas: tilemapCanvas,
        tilemapCanvasContext: tilemapCanvas.getContext('2d')

    }, ()=>{

      this.updateTilemapCanvas(this.props);
      let canvasTexture = new THREE.Texture( this.state.tilemapCanvas );
      canvasTexture.needsUpdate = true;

      this.material = new THREE.MeshBasicMaterial( { map: canvasTexture} );
      this.material.map.magFilter = THREE.NearestFilter;
			this.material.map.minFilter = THREE.LinearMipMapLinearFilter;

      this.mesh = new THREE.Mesh( this.state.singleTileGeometry, this.material );
      this.mesh.rotation.x = -Math.PI / 2;

      this.state.scene.add(this.mesh);

      this.initGui()

    });

  }

  updateTilemapCanvas(props) {

      this.state.tilemapCanvasContext.resetTransform();
      this.state.tilemapCanvasContext.clearRect(0,0, this.canvasElement.width, this.canvasElement.height);

      // this.state.tilemapCanvasContext.translate(this.canvasElement.width/2,this.canvasElement.height/2);
      // this.state.tilemapCanvasContext.scale(this.camera.zoomLevel, this.camera.zoomLevel);
      // this.state.tilemapCanvasContext.translate(-this.canvasElement.width/2,-this.canvasElement.height/2);


      let spritesheet = assetManager.getTilesetImage();
      for (let [index, tileId] of props.tilemapJSON.layers[0].data.entries()){

          this.drawTile(this.state.tilemapCanvasContext, spritesheet, {
              xPositionInSpritesheet: ((tileId % (props.tilesetJSON.imagewidth/props.tilesetJSON.tilewidth)) - 1)  * props.tilesetJSON.tilewidth,
              yPositionInSpritesheet: (Math.floor(tileId / (props.tilesetJSON.imagewidth/props.tilesetJSON.tileheight))) * props.tilesetJSON.tilewidth,
              widthOfTileInSpritesheet: props.tilesetJSON.tilewidth,
              heightOfTileInSpritesheet: props.tilesetJSON.tileheight,
              xPositionOnCanvas: (index % props.tilemapJSON.layers[0].width) * props.tilesetJSON.tilewidth,
              yPositionOnCanvas: (Math.floor(index / props.tilemapJSON.layers[0].width)) * props.tilesetJSON.tilewidth,
              widthOfTileOnCanvas: props.tilesetJSON.tilewidth,
              heightOfTileOnCanvas: props.tilesetJSON.tileheight
          })
      }

  }

  drawTile(ctx, spritesheet, drawDetails){
      ctx.drawImage(spritesheet, drawDetails.xPositionInSpritesheet, drawDetails.yPositionInSpritesheet, drawDetails.widthOfTileInSpritesheet, drawDetails.heightOfTileInSpritesheet, drawDetails.xPositionOnCanvas, drawDetails.yPositionOnCanvas, drawDetails.widthOfTileOnCanvas, drawDetails.heightOfTileOnCanvas);
  }


  initGui = () => {
  	var drop;

  	gui.add( API, 'offsetX', 0.0, 1.0 ).name( 'offset.x' ).onChange( this.updateUvTransform );
  	gui.add( API, 'offsetY', 0.0, 1.0 ).name( 'offset.y' ).onChange( this.updateUvTransform );
  	gui.add( API, 'repeatX', 0.0, 2.0 ).name( 'repeat.x' ).onChange( this.updateUvTransform );
  	gui.add( API, 'repeatY', 0.0, 2.0 ).name( 'repeat.y' ).onChange( this.updateUvTransform );
  	gui.add( API, 'rotation', - 2.0, 2.0 ).name( 'rotation' ).onChange( this.updateUvTransform );
  	gui.add( API, 'centerX', 0.0, 1.0 ).name( 'center.x' ).onChange( this.updateUvTransform );
  	gui.add( API, 'centerY', 0.0, 1.0 ).name( 'center.y' ).onChange( this.updateUvTransform );
  }

  updateUvTransform = () => {
  	var texture = this.mesh.material.map;
  	if ( texture.matrixAutoUpdate === true ) {
  		texture.offset.set( API.offsetX, API.offsetY );
  		texture.repeat.set( API.repeatX, API.repeatY );
  		texture.center.set( API.centerX, API.centerY );
  		texture.rotation = API.rotation; // rotation is around [ 0.5, 0.5 ]
  	} else {
  		// one way...
  		//texture.matrix.setUvTransform( API.offsetX, API.offsetY, API.repeatX, API.repeatY, API.rotation, API.centerX, API.centerY );
  		// another way...
  		texture.matrix
  		    .identity()
  		    .translate( - API.centerX, - API.centerY )
  		    .rotate( API.rotation )					// I don't understand how rotation can preceed scale, but it seems to be required...
  		    .scale( API.repeatX, API.repeatY )
  		    .translate( API.centerX, API.centerY )
  		    .translate( API.offsetX, API.offsetY );
  	}
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
    // Rotate the x position of the mesh by 0.03
    // this.mesh.rotation.x += 0.03;
    // // Rotate the y position of the mesh by 0.02
    // this.mesh.rotation.y += 0.02;
    this.state.camera.position.set( 10 * Math.sin(time*0.001), 10 ,  10 * Math.cos(time*0.001) );
    this.state.camera.lookAt( this.state.scene.position );

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
