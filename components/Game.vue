<template>
  <section>
    <div id="phaser-game" class="phaser-game"></div>
  </section>
</template>

<script>
import Phaser from 'phaser'
import Preload from '../lib/scenes/Preload'
import Home from '../lib/scenes/Home'
import PlayScene from '../lib/scenes/PlayScene'
import gameConfig from '../lib/gameConfig'

export default {
  data() {
    return {
      game: null
    }
  },
  mounted() {
    const home = new Home()
    const playScene = new PlayScene()
    const preload = new Preload()
    const scene = [preload, home, playScene]
    this.initializeGame({ scene, gameConfig })
  },
  methods: {
    initializeGame({ scene, gameConfig }) {
      this.game = new Phaser.Game({
        ...gameConfig,
        parent,
        scene
      })
    },
    setColor({ value }) {
      this.game.scene.scenes[1].cameras.main.setBackgroundColor(value)
    },
    destroyGame() {
      this.game.destroy()
    }
  }
}
</script>
<style scoped>
.phaser-game {
  max-height: 600px;
}
</style>
