import { Button } from "../gameObjects/mainMenu/Button";
import Reflection from "./Reflection";
import axios from "axios";

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
        this.items = []
    }

    preload() {
        this.load.image('reflectionButton','/static/assets/images/menu/reflectionButton.png')
    }

    create() {
      this.getObjectData();
        const {width,height} = this.scale;
        const xbutton = width - 300;
        const ybutton = height - 50;
        const reflection = new Button(xbutton,ybutton,'reflectionButton',this,()=>{this.onClick()},1.5)
    }

    onClick() {
      const key = 'reflection';
      const ref = new Reflection(key,this.items);
      this.scene.add(key,ref);
      this.scene.start(key);

    }
        
    getObjectData(){
      // If you want to change the data, you get it here
    
      const response = this.cache.json.get('mapObjects') 
      response["objects"].forEach(element => {
        this.items.push({"object":element.uuid});
      });
          
  }

}