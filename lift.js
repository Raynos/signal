var signal = require("./signal")

module.exports = lift

function lift(source, mapping) {
    return signal(function creation(send) {
        source(function (v) {
            send(mapping(v))
        })
    })
}