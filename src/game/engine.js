/**
 * Created by timur on 9/8/16.
 */


import dom from 'domali'
import Stats from 'stats.js'
import { onKeyDown } from './input/keys'
import cube from './objects/cube'
import building from './objects/building'
import road from './objects/road'
import player from './objects/player'


const container = dom.create('div')

export let scene, camera, renderer, box, stats

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
  
  box = cube({ y: -200 }, 200, 'red', false)
  scene.add(box)
  
  building(scene, { y: -200, x: 4000, z: -5000 }, 200, 5000, 'blue', false)
  building(scene, { y: -200, x: -2000, z: -2000 }, 200, 2000, 'blue', false)
  scene.add(road(scene, { y: -350, x: 2000, z: -3000 }, 10000, 500, 'yellow', false))
  scene.add(player)
  
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
  window.addEventListener('resize', onWindowResize, false)
}

function mouseUp(e) {
  
  switch (e.button) {
    
    case 2:
      document.removeEventListener('mousemove', rotateCamera, false)
      break
  }
}

function mouseDown(e) {
  
  switch (e.button) {
    
    case 2:
      document.addEventListener('mousemove', rotateCamera, false)
      break
  }
}

// amount of mouse movements to keep track of and average mouse movement by
const mouseMoveCount = 10
let mouseMoves = []
const lookSensitivity = {
  h: Math.PI / 1400,
  v: Math.PI / 1800,
}

function rotateCamera(event) {
  
  // Need to fire at least one event to calculate movement
  if (mouseMoves.length === mouseMoveCount) {
    
    const sum = mouseMoves
      .reduce((x, y) => {
        return {
          x: x.x + y.x,
          y: x.y + y.y
        }
      }, { x: 0, y: 0 })
    
    const avg = Object.assign({}, sum, {
      x: sum.x / mouseMoveCount,
      y: sum.y / mouseMoveCount
    })
    
    const differenceModifier = { x: avg.x - event.clientX, y: avg.y - event.clientY }
    
    camera.rotation.y += lookSensitivity.h * differenceModifier.x
    
    // don't let the camera go above or below the world
    const diff = camera.rotation.x + lookSensitivity.v * differenceModifier.y
    const distance = 1.2
    
    if (diff < distance && diff > -distance) {
      camera.rotation.x = diff
    }
  }
  
  mouseMoves = mouseMoves
    .slice(0, mouseMoveCount - 1)
  
  mouseMoves.unshift({
    x: event.clientX,
    y: event.clientY,
  })
}

const scrollCamera = event => event.deltaY > 0 ? scrollOut() : scrollIn()

const maxScrollDistanceZ = 1500
const maxScrollDistanceY = 500

function scrollOut() {
  
  if (camera.position.z < player.position.z + maxScrollDistanceZ) {
    
    camera.position.z += speed
    
  } else if (camera.position.y < maxScrollDistanceY) {
    
    camera.position.y += speed
  }
}

function scrollIn() {
  
  if (camera.position.z > player.position.z) {
    
    if (camera.position.y > 0) {
      
      camera.position.z -= speed
      camera.position.y -= speed
    }
    camera.position.z -= speed
  }
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
