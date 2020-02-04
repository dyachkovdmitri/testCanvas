var requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 300);
        };
})();

var canvas;
var rect;
var gameTime = 0;
var tact = 0;


// Speed in pixels per second
var lastTime;

function main() {
    var now = Date.now();
    var dt = (now - lastTime) / 1000.0;
    update(dt);
    render();
    lastTime = now;
    requestAnimFrame(main);
}

function randomInt(min, max) {
    return min + Math.floor((max - min) * Math.random());
}


function init() {
    initContext();


    // addUnit(3, "green", 100, 100, 4);
    // addUnit(4, "green", 109, 100, 4);
    // addUnit(5, "green", 100, 100, 4);
    // addUnit(6, "green", 109, 100, 4);
    // addUnit(7, "green", 100, 100, 4);
    // addUnit(8, "green", 109, 100, 4);
    // addUnit(9, "green", 100, 100, 4);
    // addUnit(10, "green", 109, 100, 4);
    //
    // addUnit(900, "blue", 500, 500, 5);

    // writeSector(200,200,100,80,80);
     nature.createRocks(10, 43, 40);
    // nature.createRiver(5, 30, 120);
    // nature.createTrees(10, 100, 30);
   // for (var i = 0; i < 10; i++) {
        //work(addWorker(3, "green", randomInt(500, 600), randomInt(200, 300), randomInt(2, 8)));
        work(addWorker(1, "green", 100, 100, 6));
     //   (addWorker(3, "red", 400, 400, 4));
    //    moveTo(i, randomInt(1700, 1701), randomInt(780, 781));
 //   }

    lastTime = Date.now();
    main();
}

function update(dt) {
    gameTime += dt;
    handleInput(dt);
    renderMoving();
}

function renderMoving() {
    tact++;
    //console.log(canvasContext.destinations);
    canvas.getObjects().forEach(
        it => {
            if(it.id<900){
            workUnit(it);
            moveUnit(it);
            shootUnit(it);
            attackUnit(it)}
        });
    selectionField = [0, 0, 0, 0]
}

function render() {
    canvas.renderAll();
}

function handleInput(dt) {
    if (input.isDown('DOWN') || input.isDown('s')) {
        rect.set("top", rect.get("top") + 1)
    }

    if (input.isDown('UP') || input.isDown('w')) {
        rect.set("top", rect.get("top") - 1)
    }

    if (input.isDown('LEFT') || input.isDown('a')) {
        rect.set("left", rect.get("left") - 1)
    }

    if (input.isDown('RIGHT') || input.isDown('d')) {
        rect.set("left", rect.get("left") + 1)
    }

    if (input.isDown('SPACE') &&
        !isGameOver &&
        Date.now() - lastFire > 100) {
        var x = player.pos[0] + player.sprite.size[0] / 2;
        var y = player.pos[1] + player.sprite.size[1] / 2;

        bullets.push({
            pos: [x, y],
            dir: 'forward',
            sprite: new Sprite('img/sprites.png', [0, 39], [18, 8])
        });
        bullets.push({
            pos: [x, y],
            dir: 'up',
            sprite: new Sprite('img/sprites.png', [0, 50], [9, 5])
        });
        bullets.push({
            pos: [x, y],
            dir: 'down',
            sprite: new Sprite('img/sprites.png', [0, 60], [9, 5])
        });

        lastFire = Date.now();
    }
}