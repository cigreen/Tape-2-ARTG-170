class Intro extends Phaser.Scene {
    constructor() {
        super('intro');
    }
    preload(){
        this.load.path = "./assets/";
        this.load.audio('testdrone', "TestDrone.mp3")
        this.load.image("whisperinganomalyphoto", "WhisperingAnomaly.png")
        this.load.audio('endinganomaly', 'EndingAnomaly.mp3');
        this.load.audio('tape2intro', 'Tape2Intro.mp3');
        this.load.audio('speakerbprompt', 'SpeakerBPrompt.mp3');
        this.load.audio('speakercprompt', 'SpeakerCPrompt.mp3');
        this.load.audio('speakerB', 'voiceB.mp3');
        this.load.audio('speakera', 'SpeakerA.mp3');
        this.load.audio('speakerc', 'SpeakerC.mp3');
        this.load.audio('selectanomaly', 'SelectAnomaly.mp3');
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
        let speakerA = this.sound.add('speakera');
        let screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        let screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        this.add.text(screenCenterX, screenCenterY, 'Listen to Speaker A').setOrigin(0.5);
        this.input.on('pointerdown', () => {
            testdrone.loop = true;
            testdrone.play();
            speakerA.play();
            this.cameras.main.fadeOut( 0,0,0);
            this.time.delayedCall(12000, () => this.scene.start('partb')); // FIX THE TIMING ONCE YOU GET AUDIO ASSETS.
        })
    }
}

class PartB extends Phaser.Scene {
    constructor() {
        super('partb');
    }
    create() {
        let testdrone = this.sound.add('testdrone');
        let speakerB = this.sound.add('speakerB');
        let speakerbprompt = this.sound.add('speakerbprompt');
        speakerbprompt.play();
        let screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        let screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        this.time.delayedCall(2500, () => this.add.text(screenCenterX, screenCenterY, 'Listen to Speaker B').setOrigin(0.5));
        //this.add.text(screenCenterX, screenCenterY, 'Listen to Speaker B').setOrigin(0.5);
        this.input.on('pointerdown', () => {
            //testdrone.loop = true;
            //testdrone.play();
            speakerB.play();
            this.cameras.main.fadeOut( 0,0,0);
            this.time.delayedCall(14000, () => this.scene.start('partc'));
        });
    }
}

class PartC extends Phaser.Scene {
    constructor() {
        super('partc');
    }
    create() {
        let speakercprompt = this.sound.add('speakercprompt');
        let speakerC = this.sound.add('speakerc');
        speakercprompt.play();
        let screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        let screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        this.time.delayedCall(2500, () => this.add.text(screenCenterX, screenCenterY, 'Listen to Speaker C').setOrigin(0.5));
        this.input.on('pointerdown', () => {
            speakerC.play();
            this.cameras.main.fadeOut( 0,0,0);
            this.time.delayedCall(27000, () => this.scene.start('choose'));
        });
    }
}

class Choose extends Phaser.Scene {
    constructor() {
        super('choose');
    }
    create() {
        let selectanomaly = this.sound.add('selectanomaly');
    }
}

class Ending extends Phaser.Scene {
    constructor() {
        super('ending');
    }
    create() {
        let endinganomaly = this.sound.add('endinganomaly');
        endinganomaly.play();
        let screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        let screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        this.time.delayedCall(20000, () => this.imageObject = this.add.image(
            screenCenterX,
            screenCenterY,
            "whisperinganomalyphoto",
    )
        .setScale(0.15) // FIX THIS
    )   
    this.time.delayedCall(61000, () => this.cameras.main.fadeOut(0,0,0));
    }
}

new Phaser.Game({
    width: 1024,
    height: 540,
    backgroundColor: 0x000000,
    scene: [Intro, PartA, PartB, PartC, Choose, Ending],
});