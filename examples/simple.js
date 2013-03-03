var signal = require("../signal")
var lift = require("../lift")
var lift2 = require("../lift2")
var lift3 = require("../lift3")

var frameRates = fps(30)
var position = MousePosition()

var positionStr = lift(position, function (pos) {
    return "[x=" + pos.x + ", y=" + pos.y + "]"
})

var main1 = lift(frameRates, Text)
var main2 = lift(positionStr, Text)
var main3 = lift2(frameRates, position, function (rate, pos) {
    return Form({ x: pos.x + 20, y: pos.y + 20 }, Text(rate))
})

var main = lift3(main1, main2, main3, function (a, b, c)  {
    return Combination([a, b, c])
})

render(main)

function render(input) {
    var surface = document.createElement("div")
    document.body.appendChild(surface)

    input(function render(x) {
        surface.innerHTML = ""

        _render(surface, x)
    })

    function _render(surface, x) {
        var type = x[0]
        if (type === "Text") {
            var div = document.createElement("div")
            div.textContent = x[1]
            surface.appendChild(div)
        } else if (type === "Form") {
            var target = document.createElement("div")
            var pos = x[1]

            target.style.position = "absolute"
            target.style.top = pos.y + "px"
            target.style.left = pos.x + "px"

            _render(target, x[2])

            surface.appendChild(target)
        } else if (type === "Combination") {
            var container = document.createElement("div")
            var children = x[1]

            children.forEach(function (x) {
                _render(container, x)
            })

            surface.appendChild(container)
        }
    }
}

function Combination(list) {
    return ["Combination", list]
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