class SpritesheetManager {

    constructor() {
        this.currentSpritesheet = null
    }

    loadSpritesheet = (url) =>
    new Promise((resolve, reject) => {

        this.currentSpritesheet = new Image();
        this.currentSpritesheet.onload = () => resolve({url, status: 'ok'});
        this.currentSpritesheet.onerror = () => reject({url, status: 'error'});
        this.currentSpritesheet.src = url;


    })

}


export let spritesheetManager = new SpritesheetManager();
