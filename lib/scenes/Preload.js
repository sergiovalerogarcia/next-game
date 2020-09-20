import { Scene } from 'phaser'

class Preload extends Scene {
  constructor() {
    super({ key: 'Preload' })
  }

  init() {
    this.game.customParams = {
      centerX: this.cameras.main.centerX,
      centerY: this.cameras.main.centerY,
      styleText: {
        fontSize: '32px',
        fill: '#000'
      },
      goodObstacles: ['vue', 'react'],
      badObstacles: ['iexplorer', 'windowsVista']
    }
  }

  preload() {
    this.load.image('ground', '/assets/game/platform.png')
    this.load.image('iexplorer', '/assets/game/iexplorer.png')
    this.load.image('windowsVista', '/assets/game/windowsVista.png')
    this.load.image('vue', '/assets/game/vue.png')
    this.load.image('dudeHome', '/assets/game/dudeHome.png')
    this.load.image('react', '/assets/game/react.png')
    this.load.image('win', '/assets/game/win.png')
    this.load.image('computer', '/assets/game/computer.png')
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
