# signal

Implementation of signal data type

## Example

```js
var signal = require("signal/signal")
var lift = require("signal/lift")
var lift2 = require("signal/lift2")
var lift3 = require("signal/lift3")

// A signal that emits a dt at x fps.
var fps = require("signal/fps")
// A signal that emits { x: mouseX, y: mouseY } every time mouse changes
var MousePosition = require("signal/mouse-position")
// Text(str) returns a text shape that can be rendered
var Text = require("signal/text")
// Form(pos, shape) renders the shape at the x, y co-ords of position
var Form = require("signal/form")
// Combination(shapes) renders all shapes as a list
var Combination = require("signal/combination")
// render(signal) does the magic of rendering your renderable things
var render = require("signal/render")

var frameRates = fps(30)
var position = MousePosition()

// Transform the frameRates and position into a renderable thing.
// In this case, the frameRate as text, the position as a text string
// and the frame rate rendered near the x,y of the mouse
var main = lift2(frameRates, position, function display(frameRate, pos) {
    return Combination([
        Text(frameRate)
        , Text("[x=" + pos.x + ", y=" + pos.y + "]")
        , Form({ x: pos.x + 20, y: pos.y + 20 }, Text(frameRate))
    ])
})

render(main)
```

## Installation

`npm install signal`

## Contributors

 - Raynos

## MIT Licenced


  [1]: https://secure.travis-ci.org/Raynos/signal.png
  [2]: http://travis-ci.org/Raynos/signal
  [3]: http://david-dm.org/Raynos/signal.png
  [4]: http://david-dm.org/Raynos/signal
  [5]: http://ci.testling.com/Raynos/signal.png
  [6]: http://ci.testling.com/Raynos/signal
