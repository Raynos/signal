var test = require("tape")

var into = require("./util/into")
var from = require("./util/from")

var signal = require("../signal")
var lift = require("../lift")
var lift2 = require("../lift2")
var foldp = require("../foldp")

test("create simple signal", function (assert) {
    var source = signal(function (send) {
        send(1)
        send(2)
    })

    var list = []
    source(function (v) { list.push(v) })

    assert.deepEqual(list, [1, 2])

    assert.end()
})

test("multi sending", function (assert) {
    var source = from([1, 2])

    var list1 = into(source)
    var list2 = into(source)

    process.nextTick(function () {
        assert.deepEqual(list1, [1, 2])
        assert.deepEqual(list2, [1, 2])

        assert.end()
    })
})

test("can lift a value", function (assert) {
    var source = from([1, 2])

    var doubles = lift(source, function (x) {
        return x * 2
    })

    into(doubles, function (list) {
        assert.deepEqual(list, [2, 4])

        assert.end()
    })
})

test("can lift2 a value", function (assert) {
    var source1 = from([1, 2])
    var source2 = from([3, 4])

    var tuples = lift2(source1, source2, function (x, y) {
        return [x, y]
    })

    into(tuples, function (list) {
        assert.deepEqual(list, [[2, 3], [2, 4]])

        assert.end()
    })
})

test("can foldp a signal", function (assert) {
    var source1 = from([22, 23, 24])

    var count = foldp(source1, function (acc, v) {
        return ++acc
    }, 0)

    into(count, function (list) {
        assert.deepEqual(list, [1, 2, 3])

        assert.end()
    })
})