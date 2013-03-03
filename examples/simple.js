var signal = require("../signal")
var lift = require("../lift")
var lift2 = require("../lift2")

var frameRates = fps(30)
var position = MousePosition()

var positionStr = lift(position, function (pos) {
    return "[x=" + pos.x + ", y=" + pos.y + "]"
})

// var main = lift(frameRates, Text)
// var main = lift(positionStr, Text)
var main = lift2(frameRates, position, function (rate, pos) {
    return Form({ x: pos.x + 20, y: pos.y + 20 }, Text(rate))
})

render(main)

console.log("hi!")

function render(input) {
    var surface = document.createElement("div")
    document.body.appendChild(surface)

    input(function render(x) {
        _render(surface, x)
    })

    function _render(surface, x) {
        surface.innerHTML = ""

        var type = x[0]
        if (type === "Text") {
            renderText(surface, x[1])
        } else if (type === "Form") {
            var target = document.createElement("div")
            var pos = x[1]

            console.log("pos", pos)

            target.style.position = "absolute"
            target.style.top = pos.y + "px"
            target.style.left = pos.x + "px"

            _render(target, x[2])

            surface.appendChild(target)
        }
    }

    function renderText(surface, text) {
        surface.textContent = text
    }
}

function Form(pos, shape) {
    return ["Form", pos, shape]
}

function Text(str) { return ["Text", str] }

function MousePosition() {
    return signal(function (send) {
        document.addEventListener("mousemove", function (ev) {
            send(getXY(ev))
        })
    })

    function getXY(e) {
        var posx = 0;
        var posy = 0;
        if (!e) {
            e = window.event;
        }
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        } else if (e.clientX || e.clientY)  {
            posx = e.clientX + document.body.scrollLeft +
                document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop +
                document.documentElement.scrollTop;
        }
        return { x: posx, y: posy }
    }
}

function fps(x) {
    var frameRate = Math.round(1000.0 / x)

    return signal(function (send) {
        var prev = Date.now()

        setTimeout(tick, frameRate)

        function tick() {
            var curr = Date.now()
            var diff = curr - prev
            prev = curr

            send(diff)

            setTimeout(tick, frameRate)
        }
    })
}