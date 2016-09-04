/**
 * Created by timur on 9/4/16.
 */

import './main.scss'

let scene, camera, renderer
let geometry, material, mesh

init()
animate()

function init() {
  
  scene = new THREE.Scene()
  
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight,
    1, 10000)
  
  camera.position.z = 1000;
  
  geometry = new THREE.BoxGeometry(200, 200, 200)
  
  material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true
  })
  
  mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)
  
  const offsetHack = 4
  
  renderer = new THREE.WebGLRenderer()
  
  renderer.setSize(
    window.innerWidth - offsetHack,
    window.innerHeight - offsetHack
  )
  
  document.body.appendChild(renderer.domElement)
  document.addEventListener('keydown', onKeyDown, false)
  
  function onKeyDown(event) {
    
    event.preventDefault()
    
    switch (event.key) {
      
      case 'ArrowRight':
        mesh.rotation.y += 0.1
        break
      
      case 'ArrowLeft':
        mesh.rotation.y -= 0.1
        break
      
      case 'ArrowUp':
        mesh.rotation.x += 0.1
        break
      
      case 'ArrowDown':
        mesh.rotation.x -= 0.1
        break
      
      default:
        console.log(event.key)
    }
    
  }
}

function animate() {
  
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}