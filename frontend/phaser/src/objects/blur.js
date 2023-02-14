export default class BlurScene extends Phaser.Scene {
    preload() {
      this.load.image('example', 'path/to/your/image.png');
    }
  
    create() {
      const sprite = this.add.sprite(400, 300, 'example');
  
      // Create a blur filter
      const blur = new Phaser.Filter.BlurX(this.game);
      blur.blur = 8;
  
      // Apply the blur filter to the sprite
      sprite.setFilter(blur);
    }
  }
  
  
  
  
  