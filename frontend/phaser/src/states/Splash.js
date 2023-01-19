var Splash = function () {};

Splash.prototype = {

  loadScripts: function () {
    //game.load.script('style', 'lib/style.js');
  },

  loadImages: function () {
    game.load.image('menu-bg', 'src/static/background.png');
  },

//   loadFonts: function () {
//     WebFontConfig = {
//       custom: {
//         families: ['TheMinion'],
//         urls: ['assets/style/theminion.css']
//       }
//     }
//   },

  init: function () {
    this.loadingBar = game.make.sprite(game.world.centerX-(387/2), 400, "loading");
    this.status     = game.make.text(game.world.centerX, 380, 'Loading...', {fill: 'white'});
    utils.centerGameObjects([this.logo, this.status]);
  },

  preload: function () {
    game.add.existing(this.loadingBar);
    game.add.existing(this.status);
    this.load.setPreloadSprite(this.loadingBar);
    this.loadScripts();
    this.loadImages();
    //this.loadFonts();
  },

  addGameStates: function () {
    // game.state.add("GameMenu",GameMenu);
    // game.state.add("Game",Game);
    // game.state.add("GameOver",GameOver);
    // game.state.add("Credits",Credits);
    // game.state.add("Options",Options);
  },

  create: function() {
    this.status.setText('Ready!');
    this.addGameStates();

    setTimeout(function () {
      game.state.start("GameMenu");
    }, 1000);
  }
};