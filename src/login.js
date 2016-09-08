/**
 * Created by timur on 9/7/16.
 */

import dom from 'domali'
import { ipcRenderer } from 'electron'

dom.getId('signup-button').onclick = () => ipcRenderer.send('signup')

const user = { name: 'bob' }
dom.getId('login-form').onsubmit = () => ipcRenderer.send('start-game', user)
