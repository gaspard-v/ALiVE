class SearchIconObject extends Phaser.GameObjects.Image {

    constructor (scene, x, y)
    {
        super(scene, x, y, 'searchIcon');

        console.log("Constructor of SearchIconObject");

        this.setScale(4);
    }

}

export default SearchIconObject;