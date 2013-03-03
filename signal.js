module.exports = signal

function signal(creation) {
    var listeners = []
    var started = false

    return consumeSignal

    function consumeSignal(cb) {
        listeners.push(cb)

        if (!started) {
            started = true
            creation(forward)
        }
    }

    function forward(value) {
        listeners.forEach(function (cb) { cb(value) })
    }
}