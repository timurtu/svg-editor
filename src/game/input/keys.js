/**
 * Created by timur on 9/8/16.
 */

import { move } from '../movement'


export function onKeyDown(event) {
  
  event.preventDefault()
  
  switch (event.key) {
    case 'ArrowUp':
    case 'w':
      move.forward()
      break
    
    case 'ArrowDown':
    case 's':
      move.back()
      break
    
    case 'ArrowLeft':
    case 'a':
      move.left()
      break
    
    case 'ArrowRight':
    case 'd':
      move.right()
      break
    
    default:
      console.log(event.key)
  }
}
