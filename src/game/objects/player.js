/**
 * Created by timur on 9/8/16.
 */

import cube from './cube'
import { speed } from '../globals'
import { camera } from '../engine'


const player = cube({ y: -200, z: 200 }, 200, 'green', false)

export const move = {
  
  forward() {
    if (player.position.z > -10800) {
      player.position.z -= speed
      camera.position.z -= speed
    }
  },
  
  back() {
    if (player.position.z < 3200) {
      player.position.z += speed
      camera.position.z += speed
    }
  },
  
  left() {
    if (player.position.x > -10500) {
      player.position.x -= speed
      camera.position.x -= speed
    }
  },
  
  right() {
    if (player.position.x < 10500) {
      player.position.x += speed
      camera.position.x += speed
    }
  }
}

export default player
