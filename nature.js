let nature = {
    createRocks(number, radius, maxSize) {
        for (var j = 0; j < number; j++) {
            var size = randomInt(1, maxSize);
            let nextLeft = randomInt(0, 1800);
            let nextTop = randomInt(0, 800);
            for (var i = 0; i < size; i++) {
                addUnit(j * 100 + 1000 + i, "gray", nextLeft, nextTop, randomInt(10, radius), true);
                nextLeft = nextLeft + randomInt(-radius*2, radius*2);
                nextTop = nextTop + randomInt(-radius*2, radius*2)
            }
        }
    },
    createTrees(number, maxSize,density) {
        for (var j = 0; j < number; j++) {
            var size = randomInt(1, maxSize);
            let nextLeft = randomInt(0, 1800);
            let nextTop = randomInt(0, 800);
            for (var i = 0; i < size; i++) {
                addUnit(j * 100 + 1000 + i, "brown", nextLeft, nextTop, randomInt(2, 4));
                nextLeft = nextLeft + randomInt(-density, density);
                nextTop = nextTop + randomInt(-density,density)
            }
        }
    },

};
