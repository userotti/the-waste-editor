import * as THREE from 'three'

class AssetManager {

  constructor() {

    this.assetMap = {
      tilesetTexture: null,
      tilesetImage: null,
    }

    this.threeJSTextureLoader = new THREE.TextureLoader();

  }

  getTilesetTexture = () => {
    if (this.assetMap.tilesetTexture){
      return this.assetMap.tilesetTexture
    } else {
      console.error("trying to acces the AssetsManager Assets before its been loaded!");
    }
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
