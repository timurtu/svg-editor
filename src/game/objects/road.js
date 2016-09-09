/**
 * Created by timur on 9/8/16.
 */

import { setPosition } from '../movement'


const road = (scene, pos, length, width, color, dev) => {
  
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

export default road
