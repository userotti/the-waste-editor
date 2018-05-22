import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux';
import { assetManager } from '../../singletons/AssetManager'
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

const StyledDetail = styled.p`
color: white;
`

const StyledCanvas = styled.canvas`

width:500px;
height:500px;
border-style: solid;
border-width: 5px;
border-color: yellow;
`

class StaticCanvasContainer extends Component {

    componentDidMount() {
        window.addEventListener("resize", this.onResize.bind(this));

        this.drawingContext = this.canvasElement.getContext('2d');
        this.drawingContext.imageSmoothingEnabled = false;
        this.canvasElement.addEventListener("wheel", this.onWheel);

        this.camera = {
            x: -this.props.tilesetJSON.tilewidth * (this.props.tilemapJSON.layers[0].width / 2) + 250,
            y: -this.props.tilesetJSON.tileheight * (this.props.tilemapJSON.layers[0].height / 2) + 251,
            draggedX: 0,
            draggedY: 0,
            zoomLevel: 1
        }


        let downFlag;
        let position = {
            X: 0,
            Y: 0
        };

        this.canvasElement.onmousedown = (down) => {
            downFlag = true;
            // Record click position
            position.X = down.clientX;
            position.Y = down.clientY;
        };

        this.canvasElement.onmouseup = (up) => {
            downFlag = false;
            this.camera.x += this.camera.draggedX;
            this.camera.y += this.camera.draggedY;
            this.camera.draggedX = 0;
            this.camera.draggedY = 0;
        };

        this.canvasElement.onmousemove = (move) => {
            if (downFlag) {
                if (position.X !== move.clientX || position.Y !== move.clientY) {
                    this.camera.draggedX = (move.clientX - position.X) / this.camera.zoomLevel;
                    this.camera.draggedY = (move.clientY - position.Y) / this.camera.zoomLevel;
                    this.updateCanvas(this.props);
                }
            }
        };


        this.onResize();
    }

    componentWillMount() {
        if (!this.props.allAssetsLoaded){
            this.props.push('/loading');
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.onResize.bind(this));
    }

    componentDidUpdate() {
        this.updateCanvas(this.props);
    }

    onWheel = (e) => {

        if(e.deltaY > 0){
            this.camera.zoomLevel *= 0.8;
        } else {
            this.camera.zoomLevel *= 1.2;
        }

        this.updateCanvas(this.props);
    }

    onResize() {
        if (this.canvasElement){
            this.updateCanvasDimensions();
            this.updateCanvas(this.props);
        }
    }

    updateCanvasDimensions() {
        if (this.canvasElement){

            this.canvasElement.width  = 500;
            this.canvasElement.height = 500;

            // //Make fullscreen canvas, but we can do anything here.

            // //Lookup the size the browser is displaying the canvas.
            // var displayWidth  = document.documentElement.clientWidth;
            // var displayHeight = document.documentElement.clientHeight;
            //
            // // Check if the canvas is not the same size.
            // if (this.canvasElement.width  !== displayWidth || this.canvasElement.height !== displayHeight) {
            //         // Make the canvas the same size
            //     this.canvasElement.width  = displayWidth;
            //     this.canvasElement.height = displayHeight;
            //
            // }
        }
    }


    updateCanvas(props) {

        this.drawingContext.resetTransform();
        this.drawingContext.clearRect(0,0, this.canvasElement.width, this.canvasElement.height);

        this.drawingContext.translate(this.canvasElement.width/2,this.canvasElement.height/2);
        this.drawingContext.scale(this.camera.zoomLevel, this.camera.zoomLevel);
        this.drawingContext.translate(-this.canvasElement.width/2,-this.canvasElement.height/2);


        let spritesheet = assetManager.assetMap.tilesetSpritesheet;
        for (let [index, tileId] of props.tilemapJSON.layers[0].data.entries()){

            this.drawTile(this.drawingContext, spritesheet, {
                xPositionInSpritesheet: ((tileId % (props.tilesetJSON.imagewidth/props.tilesetJSON.tilewidth)) - 1)  * props.tilesetJSON.tilewidth,
                yPositionInSpritesheet: (Math.floor(tileId / (props.tilesetJSON.imagewidth/props.tilesetJSON.tileheight))) * props.tilesetJSON.tilewidth,
                widthOfTileInSpritesheet: props.tilesetJSON.tilewidth,
                heightOfTileInSpritesheet: props.tilesetJSON.tileheight,
                xPositionOnCanvas: this.camera.x + this.camera.draggedX + (index % props.tilemapJSON.layers[0].width) * props.tilesetJSON.tilewidth,
                yPositionOnCanvas: this.camera.y + this.camera.draggedY + (Math.floor(index / props.tilemapJSON.layers[0].height)) * props.tilesetJSON.tilewidth,
                widthOfTileOnCanvas: props.tilesetJSON.tilewidth,
                heightOfTileOnCanvas: props.tilesetJSON.tileheight
            })
        }

    }

    drawTile(ctx, spritesheet, drawDetails){

        ctx.drawImage(spritesheet, drawDetails.xPositionInSpritesheet, drawDetails.yPositionInSpritesheet, drawDetails.widthOfTileInSpritesheet, drawDetails.heightOfTileInSpritesheet, drawDetails.xPositionOnCanvas, drawDetails.yPositionOnCanvas, drawDetails.widthOfTileOnCanvas, drawDetails.heightOfTileOnCanvas);

    }

    render() {
        return (
            <ContainerDiv>
                <StyledHeading>Canvas:</StyledHeading>
                <StyledDetail> This canvas only redraws when we recieve new state from the server. </StyledDetail>
                <StyledCanvas innerRef={(canvas) => { this.canvasElement = canvas }} />
            </ContainerDiv>
        );
    }
}

export default connect(
  state => ({
    tilesetJSONLocation: state.assetState.fileLocations.tilesetJSONLocation,
    tilesetSpritesheetLocation: state.assetState.fileLocations.tilesetSpritesheetLocation,
    tilemapJSONLocation: state.assetState.fileLocations.tilemapJSONLocation,

    tilesetJSON: state.assetState.tilesetJSON,
    tilesetImageLoaded: state.assetState.tilesetImage,
    tilemapJSON: state.assetState.tilemapJSON,

    allAssetsLoaded: state.assetState.allAssetsLoaded

  }),
  {
    push
  }
)(StaticCanvasContainer);
