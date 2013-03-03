module.exports = into

function into(signal, cb) {
    var list = []
    signal(function (value) {
        list.push(value)
    })

    if (cb) {
        process.nextTick(function () {
            cb(list)
        })
    }

    return list
}