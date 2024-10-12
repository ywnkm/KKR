<script setup>
import { onMounted, ref} from 'vue'
import {KK_STATE_ANIMATING, KK_STATE_REST, KK_STATE_SUSPENDED, KKRenderer} from '../kk/KKRenderer.js'
const props = defineProps({
  name: String,
  vert: String,
  frag: String,
  texture: String
})
console.log("KKR")
console.log(props)
const canvas = ref()
const renderer = ref()
const state = ref(KK_STATE_REST)
onMounted(() => {
  console.log('Component is mounted')
  console.log(canvas.value)
  const kr = new KKRenderer(canvas.value, props.vert, props.frag, props.texture)
  renderer.value = kr
  kr.onStateChange = (oldState, newState) => {
    state.value = newState
  }
})


function getPlayBtnLabel() {
  return state.value === KK_STATE_REST ? 'Play' : 'Pause'
}

function playBtnClick() {
  const s = state.value
  if (s === KK_STATE_REST) {
    renderer.value.play()
  } else if (s === KK_STATE_SUSPENDED) {
    renderer.value.resume()
  } else if (s === KK_STATE_ANIMATING) {
    renderer.value.pause()
  }
}

function resetBtnClick() {
  renderer.value.reset()
}

</script>

<template>
  <p>{{props.name}}</p>
  <div @click="() => renderer.value.play()"></div>
  <canvas ref="canvas" width="400" height="300"></canvas>
  <button @click="playBtnClick">{{getPlayBtnLabel()}}</button>
  <button @click="resetBtnClick">Reset</button>
</template>

<style scoped>

</style>