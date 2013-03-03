var signal = require("./signal")
var nil = {}

module.exports = lift3

function lift3(a, b, c, mapper) {
    return signal(function (send) {
        var lastA = nil
        var lastB = nil
        var lastC = nil

        a(function (aValue) {
            lastA = aValue

            if (lastB !== nil && lastC !== nil) {
                send(mapper(aValue, lastB, lastC))
            }
        })

        b(function (bValue) {
            lastB = bValue

            if (lastA !== nil && lastC !== nil) {
                send(mapper(lastA, bValue, lastC))
            }
        })

        c(function (cValue) {
            lastC = cValue

            if (lastA !== nil && lastB !== nil) {
                send(mapper(lastA, lastB, cValue))
            }
        })
    })
}