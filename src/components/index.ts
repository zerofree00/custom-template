import { Component } from 'vue'
import layout from './Layout/index.vue'
import empty from './Empty/index.vue'
import cover from './Book/cover.vue'
const arr: Component[] = []
arr.push(layout, empty, cover)
export default arr
