var signal = require("./signal")
var nil = {}

module.exports = lift2

function lift2(a, b, mapper) {
    return signal(function (send) {
        var lastA = nil
        var lastB = nil

        a(function (aValue) {
            lastA = aValue

            if (lastB !== nil) {
                send(mapper(aValue, lastB))
            }
        })

        b(function (bValue) {
            lastB = bValue

            if (lastA !== nil) {
                send(mapper(lastA, bValue))
            }
        })
    })
}