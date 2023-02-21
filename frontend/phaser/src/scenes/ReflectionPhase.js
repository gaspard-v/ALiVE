export default class ReflectionPhase extends Phaser.Scene{

    constructor(handle){
        super(handle);
        this.delay = 10_000
        this.text = null
        this.timer = null
        this.hsv = null
        this.graphic = null
    }

    preload(){

    }

    create(){
        this.timer = this.time.addEvent({ delay: this.delay, callback: this.onTimerEnd, callbackScope: this });
        this.text = this.add.text(32, 32, '', { font: '32px', fill: '#000000' });
        this.graphic = this.add.graphics({ x: 32, y: 64 });
    }

    update(){
        this.text.setText('Temps restant: ' + this.timer.getRemainingSeconds().toFixed(0));

        this.graphic.clear()
        this.graphic.fillStyle('#000000', 1);
        this.graphic.fillRect(0, 16, 1850 * this.timer.getProgress(), 8);
    }

    onTimerEnd()
    {
        console.log("onTimerEnd")
    }
}