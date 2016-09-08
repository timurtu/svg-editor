/**
 * Created by timur on 9/4/16.
 */

import dom from 'domali'
import Stats from 'stats.js'
import './styles/game.scss'
import { touchedFront } from './game/bounds'


const container = dom.create('div')

let scene, camera, renderer, box, player, target, stats

let windowHalfX = window.innerWidth / 2
let windowHalfY = window.innerHeight / 2

const speed = Math.PI * 10

init()
animate()

function setPosition(pos, obj) {
  if (pos.y) {
    obj.position.y = pos.y
  }
  
  if (pos.x) {
    obj.position.x = pos.x
  }
  
  if (pos.z) {
    obj.position.z = pos.z
  }
}

function road(pos, length, width, color, dev) {
  const geometry = new THREE.BoxGeometry(width, 0, length)
  const material = new THREE.MeshBasicMaterial({
    color,
    wireframe: dev
  })
  
  const obj = new THREE.Mesh(geometry, material)
  
  setPosition(pos, obj)
  
  scene.add(obj)
  return obj
}

function cube(pos, scene, size, color, dev) {
  
  const geometry = new THREE.BoxGeometry(size, size, size)
  
  const material = new THREE.MeshBasicMaterial({
    color,
    wireframe: dev
  })
  
  const obj = new THREE.Mesh(geometry, material)
  
  setPosition(pos, obj)
  
  scene.add(obj)
  
  return obj
}

function building(pos, cubeSize, size, color, dev) {
  
  const numOfCubes = size / cubeSize
  const cubes = []
  
  for (let i = 0; i < numOfCubes; i++) {
    cubes.push(cube({ x: pos.x + i * cubeSize, z: pos.z, y: -200 }, scene, cubeSize, color, dev))
    cubes.push(cube({ x: pos.x + i * cubeSize, z: pos.z }, scene, cubeSize, color, dev))
    cubes.push(cube({ x: pos.x + i * cubeSize, z: pos.z, y: 200 }, scene, cubeSize, color, dev))
    cubes.push(cube({ x: pos.x + i * cubeSize, z: pos.z, y: 400 }, scene, cubeSize, color, dev))
    cubes.push(cube({ x: pos.x + i * cubeSize, z: pos.z, y: 600 }, scene, cubeSize, color, dev))
  }
  return cubes
}

function attack(target) {
  
  if (target) {
    
  } else {
    console.log('Please select a target to attack')
  }
}

function touchedLeft(obj1, obj2) {
  
  const withinContactLeftX = (obj1.position.x + obj1.geometry.parameters.width >
  obj2.position.x - obj2.geometry.parameters.width / 2 &&
  obj1.position.x + obj1.geometry.parameters.width / 2 < obj2.position.x + obj2.geometry.parameters.width / 2)
  const withinContactLeftZ = (obj1.position.z + obj1.geometry.parameters.depth >
  obj2.position.z - obj2.geometry.parameters.depth / 2 &&
  obj1.position.z + obj1.geometry.parameters.depth < obj2.position.x + obj2.geometry.parameters.depth * 2)
  
  return withinContactLeftX && withinContactLeftZ
}

function touchedRight(obj1, obj2) {
  
  console.log('x pos 1', obj1.position.x)
  console.log('x pos 2', obj2.position.x)
  
  const withinContactRightX = (obj1.position.x - obj1.geometry.parameters.width * 2 < obj2.position.x + obj2.geometry.parameters.width &&
  obj1.position.x - obj1.geometry.parameters.width * 2 < obj2.position.x - obj2.geometry.parameters.width / 2)
  const withinContactRightZ = (obj1.position.z - obj1.geometry.parameters.depth <
  obj2.position.z + obj2.geometry.parameters.depth * 2 &&
  obj1.position.z - obj1.geometry.parameters.depth <= obj2.position.x - obj2.geometry.parameters.depth / 2)
  
  return withinContactRightX && withinContactRightZ
}

function init() {
  
  dom.render(container)
  
  scene = new THREE.Scene()
  
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight,
    1, 10000)
  
  camera.position.z = 1000
  
  box = cube({ y: -200 }, scene, 200, 'red', false)
  player = cube({ y: -200, z: 200 }, scene, 200, 'green', false)
  building({ y: -200, x: 4000, z: -5000 }, 200, 5000, 'blue', false)
  building({ y: -200, x: -2000, z: -2000 }, 200, 2000, 'blue', false)
  road({ y: -350, x: 2000, z: -3000 }, 10000, 500, 'yellow', false)
  
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

function scrollCamera(event) {
  
  (event.deltaY > 0) ? scrollOut() : scrollIn()
}

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

function onKeyDown(event) {
  
  event.preventDefault()
  
  switch (event.key) {
    
    case ' ':
      attack(target)
      break
    
    case 'ArrowUp':
    case 'w':
      
      if (touchedFront(player, box)) {
        return
      }
      
      if (player.position.z > -10800) {
        player.position.z -= speed
        camera.position.z -= speed
      }
      
      break
    
    case 'ArrowDown':
    case 's':
      
      if (player.position.z < 3200) {
        player.position.z += speed
        camera.position.z += speed
      }
      
      break
    
    case 'ArrowLeft':
    case 'a':
      
      // if (touchedRight(player, box)) {
      //   return
      // }
      
      if (player.position.x > -10500) {
        player.position.x -= speed
        camera.position.x -= speed
      }
      
      break
    
    case 'ArrowRight':
    case 'd':
      
      // if (touchedLeft(player, box)) {
      //   return
      // }
      
      if (player.position.x < 10500) {
        player.position.x += speed
        camera.position.x += speed
      }
      
      break
    
    default:
      console.log(event.key)
      console.log('x', player.position.x)
      console.log('y', player.position.y)
      console.log('z', player.position.z)
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
  // camera.lookAt(player)
  
  stats.end()
}
