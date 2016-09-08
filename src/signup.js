/**
 * Created by timur on 9/7/16.
 */

import dom from 'domali'
import { ipcRenderer } from 'electron'


dom.getId('signup-form').onsubmit = function (event) {
  
  event.preventDefault()
  
  const user = Array.prototype.map.call(event.target, function (targ) {
    switch (targ.value) {
      case 'Sign up':
        return null
        break
      case '':
        targ.style.borderLeft = 'rgb(255, 60, 60) solid .25em'
        alert(`The ${targ.get('id')} field is required.`)
        break
      default:
        targ.style.borderLeft = 'none'
        return targ.value
    }
  })
    .filter(x => x !== null && x !== undefined)
  
  // Validated successfully
  if (user.length === 4) {
    
    alert('New user account created successfully!')
    
    ipcRenderer.send('close-signup')
  }
  
}

