var signal = require("./signal")

module.exports = foldp

function foldp(source, folder, initial) {
    return signal(function (send) {
        var state = initial

        source(function (v)  {
            state = folder(state, v)
            send(state)
        })
    })
}