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
var tact =0;


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

   // writeSector(200,200,100,80,80);
    // nature.createRocks(4, 43, 100);
    // nature.createTrees(10, 100, 30);
    // for (var i = 5; i <40; i++) {
    //     addUnit(i, "green", randomInt(500, 600), randomInt(200, 300), randomInt(2, 5));
    //     moveTo(i, randomInt(1700, 1701), randomInt(780, 781));
    // }

    // moveTo(i, 500, 500);
    //}
    //  addUnit(1, "green", 200, 200, 20);
    //  addUnit(5, "red", 100, 200, 20);
    //  addUnit(3, "black", 200, 20, 20);
    //  addUnit(4, "blue", 100, 100, 20);
    //
    //
    //  moveTo(1, 800, 800);
    //  moveTo(5, 800, 800);
    //  moveTo(3, 100, 800);
    //  moveTo(4, 800, 800);
    //  addUnit(2, "gray", 400, 400, 200);


    // document.getElementById('play-again').addEventListener('click', function() {
    //     reset();
    // });

    //  reset();
    lastTime = Date.now();
    main();
}

function update(dt) {
    gameTime += dt;
    handleInput(dt);
    renderMoving();

    // updateEntities(dt);
    //
    // // It gets harder over time by adding enemies using this
    // // equation: 1-.993^gameTime
    // if(Math.random() < 1 - Math.pow(.993, gameTime)) {
    //     enemies.push({
    //         pos: [canvas.width,
    //             Math.random() * (canvas.height - 39)],
    //         sprite: new Sprite('img/sprites.png', [0, 78], [80, 39],
    //             6, [0, 1, 2, 3, 2, 1])
    //     });
    // }

    // checkCollisions();

    //   scoreEl.innerHTML = score;
}

function renderMoving() {
    tact++;

    //console.log(canvasContext.destinations);
    canvas.getObjects().forEach(
        it => {
            if (it.id > 4 && it.id < 50) {
                if (!tryMove(it)) {
                    if (!tryMove(it, 1)) {
                        if (!tryMove(it, 2)) {
                            if (!tryMove(it, 3)) {
                                if (!tryMove(it, -1)) {
                                    if (tryMove(it, -2)) {
                                        tryMove(it, -3)
                                    }
                                }
                            }
                        }
                    }
                }
               // console.log("UNIT SELECTED11111", it.id, it.left, it.top, selectionField);
                if (it.left > selectionField[0] && it.left < selectionField[2] && it.top > selectionField[1] && it.top < selectionField[3])
                    it.set('stroke', 'red');
                    console.log("UNIT SELECTED", it);
            }

        })
}


function selectObjects(unit) {
    console.log("TOP", unit.left, unit.top, selectionField)
    if (unit.left > selectionField[0] && unit.left < selectionField[2] && unit.top < selectionField[1] && unit.top > selectionField[3])
        console.log("UNIT SELECTED");
}

function render() {
    // ctx.fillStyle = terrainPattern;
    //  ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Render the player if the game isn't over
    //      renderEntity(player);
    //   i+=1;
    //   rect.set('left',i);
    //   console.log(i);
    canvas.renderAll();
    //canvas.renderAndResetBound();


//     renderEntities(bullets);
// renderEntities(enemies);
// renderEntities(explosions);
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