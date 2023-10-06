class Intro extends Phaser.Scene {
    constructor() {
        super('intro');
    }
    preload(){
        this.load.path = "./assets/";
        this.load.audio('testdrone', "TestDrone.mp3")
        this.load.image("whisperinganomalyphoto", "WhisperingAnomaly.png")
        this.load.audio('whisperinganomaly', 'WhisperingAnomaly.mp3');
        this.load.audio('tape2intro', 'Tape2Intro.mp3');
    }
    create() {
    // center the text to the middle of the screen. code from https://www.stephengarside.co.uk/blog/phaser-3-center-text-in-middle-of-screen/
        let screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        let screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        let tape2intro = this.sound.add('tape2intro');
        this.add.text(screenCenterX, screenCenterY, 'Click to insert tape 2.').setOrigin(0.5);
        this.add.text(screenCenterX + 320, screenCenterY + 200, '(Audio is required for this test.)').setOrigin(0.5);
        
        this.input.on('pointerdown', () => {
            tape2intro.play();
            this.cameras.main.fadeOut( 0,0,0);
           this.time.delayedCall(17000, () => this.scene.start('parta'));
        });
    }
}

class PartA extends Phaser.Scene {
    constructor() {
        super('parta');
    }
    create() {
        let testdrone = this.sound.add('testdrone');
        let screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        let screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        this.add.text(screenCenterX, screenCenterY, 'Listen to Speaker A').setOrigin(0.5);
        this.input.on('pointerdown', () => {
            testdrone.loop = true;
            testdrone.play();
            this.cameras.main.fadeOut( 0,0,0);
        })
    }
}

new Phaser.Game({
    width: 1024,
    height: 540,
    backgroundColor: 0x000000,
    scene: [Intro, PartA],
});