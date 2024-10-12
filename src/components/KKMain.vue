<script setup>
/**
 * @type string
 */
import dissolveFrag from '../assets/shaders/dissolveFrag.glsl?raw'
import KKR from './KKR.vue'

</script>

<template>
<div style="display: grid;grid-template-columns: repeat(2, minmax(0px, 1fr)); height: 100vh; width: 100vw">
  <div style="grid-column: span 1/span 1; background-color: white">
    <KKR name="Dissolve" vert="" :frag="dissolveFrag" texture="tt.jpg"/>
  </div>
  <div style="grid-column: span 1/span 1; background-color: pink"></div>
  <div style="grid-column: span 1/span 1; background-color: purple"></div>
  <div style="grid-column: span 1/span 1; background-color: skyblue"></div>
</div>
</template>

<style scoped>

</style>