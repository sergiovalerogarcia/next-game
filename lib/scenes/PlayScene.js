import Phaser, { Scene } from 'phaser'

class PlayScene extends Scene {
  constructor() {
    super({ key: 'PlayScene' })
    this.cursors = null
    this.score = 0
    this.scoreText = null
    this.customObj = {
      platform: {},
      rithms: [],
      machine: {}
    }
    this.jumpVelocity = 1800
    this.delayObjects = 5000
    this.repetitionObjects = 12
  }
  create() {
    this.customObj.platform = this.physics.add.staticGroup()

    this.customObj.platform
      .create(this.scale.width * 0.5, this.scale.height * 1, 'ground')
      .setScale(2)
      .refreshBody()

    this.customObj.player = this.physics.add.sprite(
      this.scale.width * 0.25,
      this.scale.height * 0.7,
      'dude'
    )

    this.customObj.player.setScale(2)

    this.customObj.machine = this.physics.add.sprite(
      this.scale.width * 0.1,
      this.scale.height * 0.7,
      'dude'
    )
    this.customObj.machine.setScale(2)

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    })

    this.cursors = this.input.keyboard.createCursorKeys()
    this.pointer = this.input.activePointer

    this.scoreText = this.add.text(
      this.scale.width * 0.1,
      this.scale.height * 0.1,
      'score: 0',
      this.game.customParams.styleText
    )

    this.customObj.player.anims.play('right', true)

    this.physics.add.collider(this.customObj.player, this.customObj.platform)
    this.physics.add.collider(this.customObj.machine, this.customObj.platform)

    this.customObj.timeEvent = this.time.addEvent({
      delay: this.delayObjects,
      callback: this.createObstacles,
      callbackScope: this,
      repeat: this.repetitionObjects
    })

    this.createObstacles()
  }
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
    this.customObj.player.setVelocityY(-this.jumpVelocity)
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
      [0, 1.5],
      [0, 0.75],
      [0.5, 1],
      [0.5, 1.5],
      [0, 0.25, 0.5, 2]
    ]

    const pulses = 8
    let currentPulse = 1
    while (pulses - currentPulse > 0) {
      const num = Math.floor(Math.random() * 5)
      const durationRithm = Math.floor(rithms[num][rithms[num].length - 1] + 1)
      if (durationRithm <= pulses - currentPulse) {
        for (let i = 0; i < rithms[num].length; i++) {
          const obstacleType =
            Math.floor(Math.random() * 2) === 0 ? 'obstacle' : 'coin'

          this.createObstacle(obstacleType, currentPulse + rithms[num][i])
        }
      }
      currentPulse = currentPulse + durationRithm
    }
  }

  createObstacle(key, pulse) {
    const distanceAbsolutePulse = this.scale.width * 0.234
    const distanceAbsolute = distanceAbsolutePulse * (pulse - 1)

    const setXY = {
      x: this.scale.width + distanceAbsolute,
      y: this.scale.height * 0.9
    }

    const obstacle = this.physics.add.group({
      key,
      repeat: 0,
      setXY,
      allowGravity: false
    })

    if (key === 'obstacle') {
      obstacle.children.iterate((child) => {
        child.mortal = true
      })
    }

    this.physics.add.overlap(
      this.customObj.player,
      obstacle,
      this.collectObstacle,
      null,
      this
    )
    this.physics.add.overlap(
      this.customObj.machine,
      obstacle,
      this.destroyObstacle,
      null,
      this
    )
    obstacle.setVelocityX(-this.scale.width * 0.375)
  }

  collectObstacle(player, obstacle) {
    if (obstacle.mortal) {
      this.scene.pause()
      this.gameOver()
    }
    obstacle.destroy()
    this.score += 10
    this.scoreText.setText('Score: ' + this.score)
  }

  destroyObstacle(machine, obstacle) {
    obstacle.destroy()
  }

  gameOver() {
    this.uiBlocked = true
    const style = { ...this.game.customParams.styleText, align: 'center' }
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
