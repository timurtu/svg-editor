/**
 * Created by timur on 9/4/16.
 */

import Crafty from 'craftyjs'

Crafty.init(300, 300)

Crafty.background('black')

Crafty.e('2D, Canvas, Color, Fourway')
  .attr({x: 10, y: 10, w: 30, h: 30})
  .color('red')
  .fourway(3)
