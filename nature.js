let nature = {
    createRocks(number, radius, maxSize) {
        for (var j = 0; j < number; j++) {
            var size = randomInt(1, maxSize);
            let nextLeft = randomInt(0, 1800);
            let nextTop = randomInt(0, 800);
            for (var i = 0; i < size; i++) {
                addUnit(j * 100 + 1000 + i, "gray", nextLeft, nextTop, randomInt(10, radius), true);
                nextLeft = nextLeft + randomInt(-radius * 2, radius * 2);
                nextTop = nextTop + randomInt(-radius * 2, radius * 2)
            }
        }
    },
    createTrees(number, maxSize, density) {
        for (var j = 0; j < number; j++) {
            var size = randomInt(1, maxSize);
            let nextLeft = randomInt(0, 1800);
            let nextTop = randomInt(0, 800);
            for (var i = 0; i < size; i++) {
                addUnit(j * 100 + 1000 + i, "brown", nextLeft, nextTop, randomInt(2, 4));
                nextLeft = nextLeft + randomInt(-density, density);
                nextTop = nextTop + randomInt(-density, density)
            }
        }
    },

    createRiver(bend, width, length) {
        var firstPoint;
        if (randomInt(0, 10) % 2 === 0) {
            firstPoint = addUnit(2000, "blue", 0, randomInt(0, 800), randomInt(width / 2, width));
        } else {
            firstPoint = addUnit(2000, "blue", randomInt(0, 1700), 0, randomInt(width / 2, width));
        }
        var radius = randomInt(width / 2, width);

        for (var j = 0; j < length; j++) {
            var isBend = (randomInt(0, bend) % bend === 0);
            var dirX = randomInt(-1,1);
            var dirY = randomInt(-1,1);
            if(isBend){
                dirX = randomInt(-1,1);
                dirY = randomInt(-1,1);
            }

            radius = randomInt(width / 2, width);
            addUnit(j * 100 + 2000 , "blue", prevX+radius*dirX, prevY+radius*dirY, radius);
        }
    }
};


