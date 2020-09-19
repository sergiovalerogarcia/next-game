import Phaser from 'phaser'

export default {
  transparent: true,
  scene: {},
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: 'phaser-game',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 650
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 4000 },
      debug: false
    }
  }
}
