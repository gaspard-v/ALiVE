import { Button } from "../gameObjects/mainMenu/Button";
import Reflection from "./Reflection";

const isReflectionDelayOver = {};

Object.defineProperty(isReflectionDelayOver, "bool", {
  get() {
    return this._bool;
  },
  set(value) {
    this._bool = value;
  }
});
export {isReflectionDelayOver};

export default class ReflectionButton extends Phaser.Scene {
    constructor(handle) {
        super(handle)
    }

    preload() {
        this.load.image('reflectionButton','/static/assets/images/menu/reflectionButton.png')
    }

    create() {
        const {width,height} = this.scale;
        const xbutton = width - 300;
        const ybutton = height - 50;
        const reflection = new Button(xbutton,ybutton,'reflectionButton',this,()=>{this.onClick()},1.5)
    }

    onClick() {
      const key = 'reflection';
      this.scene.add(key,Reflection)
      this.scene.start(key)

    }
}