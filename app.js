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
    nature.createGrass(5);
    work(addWorker(1, "green", 100, 400, 4), ROCK);
   // work(addWorker(2, "green", 100, 400, 6), GRASS);
    // work(addWorker(3, "green", 100, 400, 4), ROCK);
    addUnit(1001, "gray", 200, 149, 50, true);
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
    // if (tact % 150 === 0) {
    //   //  nature.createFireRain(1);
    // }

    let sum = false;
    //console.log(canvasContext.destinations);
    canvas.getObjects().forEach(
        it => {
            try {
                if (it.id < 900) {
                    doTask(it);

                    // console.log(tact, it.task);
                    // workUnit(it);
                    // //  console.log(tact, it.task);
                    // moveUnit(it);
                    // //  console.log(tact, it.task);
                    // transportUnit(it);
                    // shootUnit(it);
                    // attackUnit(it);
                    select(it);
                } else if (!sum && it.id > 19999 && it.id < 21001) {
                    // console.log(it.id);
                    sum = sumRes(it);
                    // sum = true;
                } else if (it.id === FIRERAIN) {
                    let intersected = intersectWith(it);
                    if (intersected != null && intersected.fill === 'gray') {
                        canvas.remove(it)
                    }
                    if (intersected != null && intersected.fill === 'green') {
                        canvas.remove(it);
                        canvas.remove(intersected);
                    }
                    if (it.top > randomInt(400, 4000) && it.top < randomInt(600, 700)) {
                        canvas.remove(it);
                    }
                    it.set('top', it.top + 1);
                }
            } catch (e) {
                console.log(e)
            }
        });
    selectionField = [0, 0, 0, 0]
}

function render() {
    canvas.renderAll();
}

function handleInput(dt) {
    if (input.isDown('DOWN') || input.isDown('s')) {


    }

    if (input.isDown('UP') || input.isDown('w')) {

    }

    if (input.isDown('LEFT') || input.isDown('a')) {

    }

    if (input.isDown('RIGHT') || input.isDown('d')) {

    }

    if (input.isDown('SPACE')) {


    }
}