import Phaser, { Scene } from 'phaser'

class PlayScene extends Scene {
  constructor() {
    super({ key: 'PlayScene' })
    this.cursors = null
    this.score = 0
    this.scoreText = null
    this.customObj = {
      platform: {},
      other: {},
      rithms: []
    }
  }
  create() {
    this.customObj.platform = this.physics.add.staticGroup()

    this.customObj.platform
      .create(400, 650, 'ground')
      .setScale(2)
      .refreshBody()

    this.customObj.player = this.physics.add.sprite(180, 500, 'dude')
    this.customObj.player.setScale(2)
    this.customObj.player.setBounce(0.2)
    this.customObj.player.setCollideWorldBounds(true)

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    })

    this.cursors = this.input.keyboard.createCursorKeys()
    this.pointer = this.input.activePointer

    this.customObj.timeEvent = this.time.addEvent({
      delay: 5000,
      callback: this.createObstacles,
      callbackScope: this,
      repeat: 9
    })
    this.createObstacles()

    this.scoreText = this.add.text(16, 16, 'score: 0', {
      fontSize: '32px',
      fill: '#000'
    })

    this.customObj.player.anims.play('right', true)

    this.physics.add.collider(this.customObj.player, this.customObj.platform)
  }
  /* console.log(
    'Event.progress: ' +
      this.customObj.timeEvent
        .getProgress()
        .toString()
        .substr(0, 4) +
      '\nEvent.repeatCount: ' +
      this.customObj.timeEvent.repeatCount
  ) */
  update() {
    if (
      (this.input.activePointer.isDown ||
        this.cursors.up.isDown ||
        this.cursors.space.isDown) &&
      this.customObj.player.body.touching.down
    ) {
      this.jump()
    }
  }

  jump() {
    this.customObj.player.setVelocityY(-1800)
    this.customObj.player.anims.pause()
    this.time.addEvent({
      delay: 700,
      callback: () => this.customObj.player.anims.resume(),
      callbackScope: this,
      loop: false
    })
  }
  createObstacles() {
    const rithms = [
      [0],
      [0, 1.5],
      [0, 0.5],
      [0.5, 1],
      [0, 0.5, 1.5],
      [0, 0.5, 1, 1.5]
    ]

    let pulse = 8
    while (pulse > 0) {
      const num = 5
      pulse = pulse - rithms[num].length
      for (let i = 0; i < pulse ; i++) {
        this.createObstacle('obstacle', pulse + rithms[num][i])
      }
    }
  }

  createObstacle(key, pulse) {
    const distanceAbsolutePulse = 187.5
    const distanceAbsolute = distanceAbsolutePulse * (pulse - 1)

    const setXY = {
      x: 800 + distanceAbsolute,
      y: 580
    }

    this.customObj.other.godObstacles = this.physics.add.group({
      key,
      repeat: 0,
      setXY,
      allowGravity: false
    })
    this.customObj.other.godObstacles.children.iterate((child) => {
      child.mortal = key === 'obstacle'
    })
    this.physics.add.overlap(
      this.customObj.player,
      this.customObj.other.godObstacles,
      this.collectObstacle,
      null,
      this
    )
    this.customObj.other.godObstacles.setVelocityX(-300)
  }

  collectObstacle(player, obstacle) {
    if (obstacle.mortal) {
      this.scene.pause()

      this.gameOver()
    }
    obstacle.disableBody(true, true)
    this.score += 10
    this.scoreText.setText('Score: ' + this.score)
  }
  gameOver() {
    this.uiBlocked = true
    const style = { fill: '#fff', align: 'center', fontSize: '32px' }
    const message = { text: 'GAME OVER' }
    this.add
      .text(
        this.game.customParams.centerX,
        this.game.customParams.centerY * 1.3,
        message.text,
        style
      )
      .setOrigin(0.5, 0.5)

    setTimeout(() => {
      this.scene.start('Home', message)
    }, 500)
  }
}

export default PlayScene
