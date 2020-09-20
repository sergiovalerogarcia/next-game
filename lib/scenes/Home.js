import { Scene } from 'phaser'

export default class Home extends Scene {
  constructor() {
    super({ key: 'Home' })
    this.cursors = null
    this.customObj = {
      backgroud: {}
    }
  }

  init(message) {
    this.message = message.text
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
      'dudeHome'
    )

    this.customObj.player.setScale(2)

    const style = { ...this.game.customParams.styleText, align: 'center' }
    this.add
      .text(
        this.game.customParams.centerX,
        this.game.customParams.centerY,
        'TOUCH TO START',
        style
      )
      .setOrigin(0.5, 0.5)

    if (this.message) {
      this.add
        .text(
          this.game.customParams.centerX,
          this.game.customParams.centerY * 1.3,
          this.message,
          style
        )
        .setOrigin(0.5, 0.5)
    }

    this.cursors = this.input.keyboard.createCursorKeys()

    this.physics.add.collider(this.customObj.player, this.customObj.platform)
  }

  update() {
    if (
      this.input.activePointer.isDown ||
      this.cursors.up.isDown ||
      this.cursors.space.isDown
    ) {
      this.scene.start('PlayScene')
    }
  }
}
