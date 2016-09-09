/**
 * Created by timur on 9/8/16.
 */

import { speed } from '../globals'
import { player, camera } from '../engine'


export const mouseUp = e => {
  
  switch (e.button) {
    
    case 2:
      document.removeEventListener('mousemove', rotateCamera, false)
      break
  }
}

export const mouseDown = e => {
  
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

function rotateCamera(e) {
  
  // Need to fire at least one e to calculate movement
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
    
    const differenceModifier = { x: avg.x - e.clientX, y: avg.y - e.clientY }
    
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
    x: e.clientX,
    y: e.clientY,
  })
}

export const scrollCamera = e => e.deltaY > 0 ? scrollOut() : scrollIn()

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
