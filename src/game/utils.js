/**
 * Created by timur on 9/8/16.
 */

export function setPosition(pos, obj) {
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