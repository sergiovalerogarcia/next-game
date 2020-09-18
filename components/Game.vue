<template>
  <section>
    <div id="phaser-game" class="phaser-game"></div>
    <div class="overlay">
      <label>
        Color:
        <input @input="setColor($event.target)" type="color" value="#0000ff" />
      </label>
    </div>
  </section>
</template>

<script>
import Phaser from 'phaser'
import scene from '../lib/Scene'
import gameConfig from '../lib/gameConfig'

export default {
  data() {
    return {
      game: null
    }
  },
  mounted() {
    this.initializeGame({ scene, gameConfig })
  },
  methods: {
    initializeGame({ parent, scene, gameConfig }) {
      this.game = new Phaser.Game({
        ...gameConfig,
        parent,
        scene
      })
    },
    setColor({ value }) {
      this.game.scene.scenes[0].cameras.main.setBackgroundColor(value)
    },
    destroyGame() {
      this.game.destroy()
    }
  }
}
</script>
<style scoped>
.overlay {
  display: flex;
  flex-direction: row;
  padding: 16px;
  position: absolute;
}
.phaser-game {
  position: absolute;
}
</style>
