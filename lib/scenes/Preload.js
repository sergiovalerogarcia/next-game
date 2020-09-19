import { Scene } from 'phaser'

class Preload extends Scene {
  constructor() {
    super({ key: 'Preload' })
  }

  init() {
    this.game.customParams = {
      centerX: this.cameras.main.centerX,
      centerY: this.cameras.main.centerY
    }
  }

  preload() {
    this.load.image('ground', '/assets/game/platform.png')
    this.load.image('obstacle', '/assets/game/obstacle.png')
    this.load.image('coin', '/assets/game/coin.png')
    this.load.image('bomb', '/assets/game/bomb.png')
    this.load.spritesheet('dude', '/assets/game/dude.png', {
      frameWidth: 32,
      frameHeight: 48
    })
  }
  create() {
    this.scene.start('Home')
  }
}

export default Preload
