import Phaser from 'phaser'

export default {
  transparent: true,
  backgroundColor: 'AAAAAA',
  scene: {},
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: 'phaser-game',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 800
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  }
}
