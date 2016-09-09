/**
 * Created by timur on 9/8/16.
 */


import dom from 'domali'
import Stats from 'stats.js'
import { onKeyDown } from './input/keys'
import { mouseDown, mouseUp, scrollCamera } from './input/mouse'
import cube from './objects/cube'
import building from './objects/building'
import road from './objects/road'


const container = dom.create('div')

export let scene, camera, renderer, player, stats

let windowHalfX = window.innerWidth / 2
let windowHalfY = window.innerHeight / 2


init()
animate()

function init() {
  
  dom.render(container)
  
  scene = new THREE.Scene()
  
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight,
    1, 10000)
  
  camera.position.z = 1000
  
  cube(scene, { y: -200 }, 200, 'red', false)
  
  building(scene, { y: -200, x: 3000, z: -5000 }, 200, 5000, 'blue', false)
  building(scene, { y: -200, x: -2000, z: -2000 }, 200, 2000, 'blue', false)
  
  road(scene, { y: -350, x: 2000, z: -3000 }, 10000, 500, 'yellow', false)
  
  player = cube(scene, { y: -200, z: 200 }, 200, 'green', false)
  
  renderer = new THREE.WebGLRenderer()
  renderer.setClearColor(0x373A3C)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  container.appendChild(renderer.domElement)
  
  stats = new Stats()
  container.push(stats.dom)
  
  document.addEventListener('keydown', onKeyDown, false)
  document.addEventListener('wheel', scrollCamera, false)
  document.addEventListener('mousedown', mouseDown, false)
  document.addEventListener('mouseup', mouseUp, false)
  document.addEventListener('resize', onWindowResize, false)
}

function onWindowResize() {
  
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  
  requestAnimationFrame(animate)
  
  stats.begin()
  renderer.render(scene, camera)
  stats.end()
}
