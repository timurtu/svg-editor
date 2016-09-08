/**
 * Created by timur on 9/4/16.
 */

import './styles/game.scss'

let scene, camera, renderer, box, player, target

const speed = 100

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
  obj1.position.z + obj1.geometry.parameters.depth <= obj2.position.x + obj2.geometry.parameters.depth * 2)
  
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
  
  scene = new THREE.Scene()
  
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight,
    1, 10000)
  
  camera.position.z = 1000;
  
  box = cube({ y: -200 }, scene, 200, 'red', true)
  player = cube({ y: -200, z: 200 }, scene, 200, 'green', true)
  building({ y: -200, x: 4000, z: -5000 }, 200, 5000, 'blue', true)
  building({ y: -200, x: -2000, z: -2000 }, 200, 2000, 'blue', true)
  road({ y: -350, x: 2000, z: -3000 }, 10000, 500, 'yellow', true)
  
  const offsetHack = 4
  
  renderer = new THREE.WebGLRenderer()
  
  renderer.setSize(
    window.innerWidth - offsetHack,
    window.innerHeight - offsetHack
  )
  
  player.onclick = function (event) {
    console.log(event)
  }
  
  document.body.appendChild(renderer.domElement)
  
  document.addEventListener('keydown', onKeyDown, false)
  
  function onKeyDown(event) {
    
    event.preventDefault()
    
    switch (event.key) {
      
      case ' ':
        attack(target)
        break
      
      case 'ArrowUp':
      case 'w':
        if (player.position.z > -10800) {
          player.position.z -= speed
          camera.position.z -= speed / 1.1
        }
        break
      
      case 'ArrowDown':
      case 's':
        if (player.position.z < 3200) {
          player.position.z += speed
          camera.position.z += speed / 1.1
        }
        break
      
      case 'ArrowLeft':
      case 'a':
        if (touchedRight(player, box)) {
          return
        }
        
        if (player.position.x > -10500) {
          player.position.x -= speed
          camera.position.x -= speed / 1.05
        }
        break
      
      case 'ArrowRight':
      case 'd':
        if (touchedLeft(player, box)) {
          return
        }
        
        if (player.position.x < 10500) {
          player.position.x += speed
          camera.position.x += speed / 1.05
        }
        break
      
      default:
        console.log(event.key)
        console.log('x', player.position.x)
        console.log('y', player.position.y)
        console.log('z', player.position.z)
    }
    
  }
}

function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  camera.lookAt(player)
}