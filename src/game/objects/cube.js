/**
 * Created by timur on 9/8/16.
 */

import { setPosition } from '../utils'


export default function cube(pos, size, color, dev) {
  
  const geometry = new THREE.BoxGeometry(size, size, size)
  
  const material = new THREE.MeshBasicMaterial({
    color,
    wireframe: dev
  })
  
  const obj = new THREE.Mesh(geometry, material)
  
  setPosition(pos, obj)
  
  return obj
}
