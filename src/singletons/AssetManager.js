import * as THREE from 'three'

class AssetManager {

  constructor() {

    this.assetMap = {
      tilesetTexture: null,
      tilesetImage: null,
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

    this.assetMap.tilesetImage = new Image();
    this.assetMap.tilesetImage.onload = () => resolve({url, status: 'ok'});
    this.assetMap.tilesetImage.onerror = () => reject({url, status: 'error'});
    this.assetMap.tilesetImage.src = url;

  })

  loadThreeJSTilesetTexture = (url) => new Promise((resolve, reject) => {

    // load a resource
    this.threeJSTextureLoader.load(
      // resource URL
      url,

      // onLoad callback
      (texture) => {
        this.assetMap.tilesetTexture = texture;
        resolve({url, status: 'ok', texture: this.assetMap.tilesetTexture});
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
