/**
 * Created by timur on 9/8/16.
 */

import cube from './cube'


const building = (scene, pos, cubeSize, size, color, dev) => {
  
  const numOfCubes = size / cubeSize
  const cubes = []
  
  for (let i = 0; i < numOfCubes; i++) {
    cubes.push(cube(scene, { x: pos.x + i * cubeSize, z: pos.z, y: -200 }, cubeSize, color, dev))
    cubes.push(cube(scene, { x: pos.x + i * cubeSize, z: pos.z }, cubeSize, color, dev))
    cubes.push(cube(scene, { x: pos.x + i * cubeSize, z: pos.z, y: 200 }, cubeSize, color, dev))
    cubes.push(cube(scene, { x: pos.x + i * cubeSize, z: pos.z, y: 400 }, cubeSize, color, dev))
    cubes.push(cube(scene, { x: pos.x + i * cubeSize, z: pos.z, y: 600 }, cubeSize, color, dev))
  }
  
  return cubes
}

export default building
