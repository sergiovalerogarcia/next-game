import Phaser, { Scene } from 'phaser'

class MainScene extends Scene {
  preload() {
    this.load.image('ground', '/assets/game/platform.png')
    this.load.image('star', '/assets/game/star.png')
    this.load.image('bomb', '/assets/game/bomb.png')
    this.load.spritesheet('dude', '/assets/game/dude.png', {
      frameWidth: 32,
      frameHeight: 48
    })
  }
  create() {
    this.intervalAction = null
    this.intervalAllowNextAction = null
    this.userAction = false
    this.allowNextAction = true
    this.cursors = null
    this.score = 0
    this.scoreText = null

    this.gameObj = {
      platform: this.physics.add.staticGroup(),
      other: {}
    }

    this.gameObj.platform = this.physics.add.staticGroup()

    this.gameObj.platform
      .create(400, 768, 'ground')
      .setScale(2)
      .refreshBody()

    this.gameObj.player = this.physics.add.sprite(220, 720, 'dude')

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    })

    this.cursors = this.input.keyboard.createCursorKeys()

    this.gameObj.timeEvent = this.time.addEvent({
      delay: 4000,
      callback: this.createStars,
      callbackScope: this,
      repeat: 400
    })

    // this.time.addEvent (Phaser.Timer.SECOND * 2, 10, this.createStars, this)
    /* timedEvent = this.time.addEvent({ delay: 2000, callback: onEvent, callbackScope: this, repeat: 4 }); */

    /* gameObj.other.stars.children.iterate((child) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
    }) */

    this.scoreText = this.add.text(16, 16, 'score: 0', {
      fontSize: '32px',
      fill: '#000'
    })

    this.gameObj.player.anims.play('right', true)
  }
  /* console.log(
    'Event.progress: ' +
      this.gameObj.timeEvent
        .getProgress()
        .toString()
        .substr(0, 4) +
      '\nEvent.repeatCount: ' +
      this.gameObj.timeEvent.repeatCount
  ) */
  update() {
    if (this.allowNextAction) {
      if (this.cursors.right.isDown) {
        this.dontAllowNextAction()
        this.addUserAction()
        console.log('allowNextAction', this.allowNextAction)
        console.log(this.userAction)
      }
    }
  }

  dontAllowNextAction() {
    this.allowNextAction = false
    clearTimeout(this.intervalAllowNextAction)
    this.intervalAllowNextAction = setInterval(
      () => (this.allowNextAction = true),
      600
    )
  }

  addUserAction() {
    this.userAction = true
    clearTimeout(this.intervalAction)
    this.intervalAction = setInterval(() => (this.userAction = false), 50)
  }

  createStars() {
    this.gameObj.other.stars = this.physics.add.group({
      key: 'star',
      repeat: 3,
      setXY: { x: 800, y: 710, stepX: 200 }
    })
    this.gameObj.other.stars.children.iterate((child) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
    })
    this.physics.add.overlap(
      this.gameObj.player,
      this.gameObj.other.stars,
      this.collectStar,
      null,
      this
    )
    this.gameObj.other.stars.setVelocityX(-300)
  }

  collectStar(player, star) {
    star.disableBody(true, true)
    this.score += 10
    this.scoreText.setText('Score: ' + this.score)
  }
}

const scene = new MainScene()

export default scene
