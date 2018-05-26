import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components';
import { assetManager } from '../../singletons/AssetManager';
import tilemapAnimationActions from '../../actions/tiledActions/tilemapAnimation';


import * as dat from 'dat.gui';

import * as PIXI from 'pixi.js'

const { updateAnimatedTiles, initializaAnimatedTiles } = tilemapAnimationActions;

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



class PixiJSCanvasContainer extends Component {


	state = {
		staticTilesDrawn: false
	}

	constructor() {
		super();

		this.guiState = {
			cameraZoomLevel: 3,
			cameraPanX: -595,
			cameraPanY: -609,
		}

	}

	componentDidMount() {


		this.onResize();
		window.addEventListener("resize", this.onResize.bind(this));
		this.startRequestAnimationFrame();

		let tilemapCanvas = document.createElement('canvas');
		tilemapCanvas.width = this.props.tilemapJSON.width * this.props.tilemapJSON.tilewidth;
		tilemapCanvas.height = this.props.tilemapJSON.height * this.props.tilemapJSON.tileheight;

		console.log("tilemapCanvas: ", tilemapCanvas);
		// Create a scene
		this.setState({
			pixiApp: new PIXI.Application({ view: this.canvasElement, width: this.canvasElement.width, height: this.canvasElement.height }),
			tilemapCanvas: tilemapCanvas,
			tilemapCanvasContext: tilemapCanvas.getContext('2d')
		}, ()=>{

			// PIXI.BaseTexture.SCALE_MODE.DEFAULT = PIXI.BaseTexture.SCALE_MODE.NEAREST;

			this.props.initializaAnimatedTiles(performance.now());
			// this.updateTilemapCanvas(this.props);

			let texture = PIXI.Texture.fromCanvas(this.state.tilemapCanvas, PIXI.SCALE_MODES.NEAREST);
			let sprite1 = new PIXI.Sprite(texture);
			sprite1.position.set(-sprite1.width/2, -sprite1.height/2)
			// let graphic = new PIXI.Graphics();
			// graphic.beginFill(0x5cafe2);
			// graphic.drawRect(10,10,400,400);

			this.camera = new PIXI.Container();
			this.camera.addChild(sprite1);
			this.state.pixiApp.stage.addChild(this.camera);

			this.setGuiState();
			//
			// setTimeout(()=>{
			//
			// 	console.log('maak skoon', texture);
			// 	this.state.tilemapCanvasContext.clearRect(0,0, this.state.tilemapCanvas.width, this.state.tilemapCanvas.height);
			// 	texture.baseTexture.update();
			//
			// }, 2000);


			this.gui = new dat.GUI();
			this.initGui();
		});

	}

	drawStaticTiles(props, tilemapLayerName, canvas) {

		let context = canvas.getContext('2d');
		context.resetTransform();
		context.clearRect(0,0, canvas.width, canvas.height);

		let tilemapLayer;
		for (let layer of props.tilemapJSON.layers){
			if (layer.name === tilemapLayerName){
				tilemapLayer = layer;
			}
		}

		let spritesheet = assetManager.getTilesetImage();
		for (let index = 0; index < tilemapLayer.data.length; index++){

			let tileId = tilemapLayer.data[index];
			//Only draw the tile that aren't part of the animating tiles
			if (!props.animatedTilesInTileset[tileId-1]){
				this.drawTile(context, spritesheet, {
						xPositionInSpritesheet: ((tileId % (props.tilesetJSON.imagewidth/props.tilesetJSON.tilewidth)) - 1)  * props.tilesetJSON.tilewidth,
						yPositionInSpritesheet: (Math.floor(tileId / (props.tilesetJSON.imagewidth/props.tilesetJSON.tileheight))) * props.tilesetJSON.tilewidth,
						widthOfTileInSpritesheet: props.tilesetJSON.tilewidth,
						heightOfTileInSpritesheet: props.tilesetJSON.tileheight,
						xPositionOnCanvas: (index % tilemapLayer.width) * props.tilesetJSON.tilewidth,
						yPositionOnCanvas: (Math.floor(index / tilemapLayer.width)) * props.tilesetJSON.tilewidth,
						widthOfTileOnCanvas: props.tilesetJSON.tilewidth,
						heightOfTileOnCanvas: props.tilesetJSON.tileheight
				})
			}



		}

	}

	drawAnimatingTiles(props, tilemapLayerName, canvas) {

		let context = canvas.getContext('2d');
		context.resetTransform();
		// context.clearRect(0,0, canvas.width, canvas.height);

		let tilemapLayer;
		for (let layer of props.tilemapJSON.layers){
			if (layer.name === tilemapLayerName){
				tilemapLayer = layer;
			}
		}

		let spritesheet = assetManager.getTilesetImage();

		for (var tileId in props.animatedTilesInTileset) {
			if (props.animatedTilesInTileset.hasOwnProperty(tileId)) {

				let tile = props.animatedTilesInTileset[tileId];

				let animationFrameId = tile.animation[tile.currentFrameIndex].mapId;
				let layerOccurences = props.animatedTilesInTileset[tileId].mapLayers[tilemapLayerName];
				for (let tilemapLayerIndex of layerOccurences){

					this.drawTile(context, spritesheet, {
						xPositionInSpritesheet: ((animationFrameId % (props.tilesetJSON.imagewidth/props.tilesetJSON.tilewidth)) - 1)  * props.tilesetJSON.tilewidth,
						yPositionInSpritesheet: (Math.floor(animationFrameId / (props.tilesetJSON.imagewidth/props.tilesetJSON.tileheight))) * props.tilesetJSON.tilewidth,
						widthOfTileInSpritesheet: props.tilesetJSON.tilewidth,
						heightOfTileInSpritesheet: props.tilesetJSON.tileheight,
						xPositionOnCanvas: (tilemapLayerIndex % tilemapLayer.width) * props.tilesetJSON.tilewidth,
						yPositionOnCanvas: (Math.floor(tilemapLayerIndex / tilemapLayer.width)) * props.tilesetJSON.tilewidth,
						widthOfTileOnCanvas: props.tilesetJSON.tilewidth,
						heightOfTileOnCanvas: props.tilesetJSON.tileheight
					})

				}
			}
		}


	}

	updateTilemapCanvas(props) {

		this.state.tilemapCanvasContext.resetTransform();
		this.state.tilemapCanvasContext.clearRect(0,0, this.state.tilemapCanvas.width, this.state.tilemapCanvas.height);

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

	getAnimatedTileIdIfNeeded(tileId) {

	}


	initGui = () => {
		var drop;

		this.gui.add( this.guiState, 'cameraZoomLevel', 0.05, 10.0 ).name( 'zoom' ).onChange(this.setGuiState);
		this.gui.add( this.guiState, 'cameraPanX', -2000, 2000 ).name( 'panX' ).onChange(this.setGuiState);
		this.gui.add( this.guiState, 'cameraPanY', -2000, 2000 ).name( 'panY' ).onChange(this.setGuiState);

	}

	setGuiState = () =>{
		this.camera.scale.set(this.guiState.cameraZoomLevel, this.guiState.cameraZoomLevel);
		this.camera.pivot.set(this.guiState.cameraPanX, this.guiState.cameraPanY)
		this.camera.position.set(this.canvasElement.width/2, this.canvasElement.height/2);
	}


	componentWillUnmount() {

		this.gui.destroy();
		this.stopRequestAnimationFrame();
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

	animationLoop = (timestamp) => {
		this.requestId = undefined;

		// console.log(timestamp);

		this.startRequestAnimationFrame();
	}

	onResize() {
		if (this.canvasElement){
			this.updateCanvasDimensions();
		}
	}

	tilemapAnimator = (time, props) => {
		if (props.animationState.tilemapAnimator.lastTimeUpdated == 0){
			this.props.updateAnimatedTiles(time);
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
				console.log("displayWidth: ", displayWidth);
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

		// console.log("shouldComponentUpdate: props : ", props);
		if (this.state.tilemapCanvas){
			if (props.timeOfAnimationInitialization && !this.staticTilesDrawn){
				console.warn("DRAWING VERY EXPENSIVE TILES NOW");
				this.drawStaticTiles(props, 'Tile Layer 1', this.state.tilemapCanvas);
				this.staticTilesDrawn = true;
			}

			this.drawAnimatingTiles(props, 'Tile Layer 1', this.state.tilemapCanvas);
		}



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

	console.log("state.tiledState.tiledData.animationData.animatedTilesInTileset: ", Object.assign({}, state.tiledState.tiledData.animationData.animatedTilesInTileset));
	return {
		assets: state.tiledState,
		tilesetJSON: state.tiledState.tiledData.tilesetJSON,
		tilemapJSON: state.tiledState.tiledData.tilemapJSON,
		animatedTilesInTileset: state.tiledState.tiledData.animationData.animatedTilesInTileset,
		timeOfAnimationInitialization: state.tiledState.tiledData.animationData.timeOfInitialization
	}
},
{
	updateAnimatedTiles,
	initializaAnimatedTiles
}
)(PixiJSCanvasContainer);
