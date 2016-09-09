/**
 * Created by timur on 9/8/16.
 */

import { speed, bound } from './globals'
import { camera, player } from './engine'


export const move = {
  
  forward() {
    if (player.position.z > bound.n) {
      player.position.z -= speed
      camera.position.z -= speed
    }
  },
  
  back() {
    if (player.position.z < bound.s) {
      player.position.z += speed
      camera.position.z += speed
    }
  },
  
  right() {
    if (player.position.x < bound.e) {
      player.position.x += speed
      camera.position.x += speed
    }
  },
  
  left() {
    if (player.position.x > bound.w) {
      player.position.x -= speed
      camera.position.x -= speed
    }
  }
}

export const setPosition = (pos, obj) => {
  
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
