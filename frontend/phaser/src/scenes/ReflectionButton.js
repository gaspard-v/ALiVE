import { Button } from "../gameObjects/mainMenu/Button";

const flag = {};

Object.defineProperty(flag, "bool", {
  get() {
    return this._bool;
  },
  set(value) {
    this._bool = value;
  }
});
export {flag};

export default class ReflectionButton extends Phaser.Scene {
    constructor(handle) {
        super(handle)
    }

    preload() {
        this.load.image('startReflectionButton','/static/assets/images/menu/reflectionButton.png')
    }

    create() {
        const {width,height} = this.scale;
        const xbutton = width - 300;
        const ybutton = height - 50;
        const startReflection = new Button(xbutton,ybutton,'startReflectionButton',this,()=>{this.onClick()},1.5)
    }

    onClick() {
        console.log("Clicketi Clicketa :)")
    }
}