var signal = require("../../signal")

module.exports = from

function from(list) {
    return signal(function (send) {
        process.nextTick(function () {
            list.forEach(function (v) { send(v) })
        })
    })
}