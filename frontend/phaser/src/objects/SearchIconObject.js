class SearchIconObject extends Phaser.GameObjects.Image {

    constructor (scene, x, y)
    {
        super(scene, x, y, 'searchIcon');

        this.setScale(4);
    }

}

export default SearchIconObject;