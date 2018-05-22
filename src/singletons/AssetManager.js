import * as THREE from 'three'

class AssetManager {

  constructor() {

    this.assetMap = {
      tilemapTexture: null,
      tilemapSpritesheet: null,
    }
    // this.threeJSLoadingManager = new THREE.LoadingManager();
    //
    // this.threeJSLoadingManager.onStart = ( url, itemsLoaded, itemsTotal ) => {
    //   console.log( 'Asset Manager: Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
    // };
    //
    // this.threeJSLoadingManager.onLoad = () => {
    //   console.log( 'Asset Manager: Loading complete!');
    // };
    //
    // this.threeJSLoadingManager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
    //   console.log( 'Asset Manager: Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
    // };
    //
    // this.threeJSLoadingManager.onError = function ( url ) {
    //   console.log( 'Asset Manager: There was an error loading ' + url );
    // };

    this.threeJSTextureLoader = new THREE.TextureLoader();



  }

  loadTilesetSpritesheetImage = (url) => new Promise((resolve, reject) => {

    this.assetMap.tilesetSpritesheet = new Image();
    this.assetMap.tilesetSpritesheet.onload = () => resolve({url, status: 'ok'});
    this.assetMap.tilesetSpritesheet.onerror = () => reject({url, status: 'error'});
    this.assetMap.tilesetSpritesheet.src = url;

  })

  loadThreeJSTilesetTexture = (url) => new Promise((resolve, reject) => {

    // load a resource
    this.threeJSTextureLoader.load(
      // resource URL
      url,

      // onLoad callback
      (texture) => {
        this.assetMap.tilemapTexture = texture;
        resolve({url, status: 'ok', texture: this.assetMap.tilemapTexture});
      },

      // onProgress callback currently not supported
      undefined,

      // onError callback
      (err) => {
        reject({url, status: 'error', error: err});
      }
    );

  })

}

const assetManager = new AssetManager();
export { assetManager }
