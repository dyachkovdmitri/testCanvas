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

function init() {
    initContext();
    addUnit(1, "green", 200, 200, 40);
    moveTo(1, 800, 800);
    addUnit(2, "gray", 400, 400, 40);


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
    //console.log(canvasContext.destinations);
    canvas.getObjects().forEach(
        it => {
            if (canvasContext.destinations.get(it.id) != null) {
                var objectX = it.left;
                var objectY = it.top;
                var destinationX = canvasContext.destinations.get(it.id)[0];
                var destinationY = canvasContext.destinations.get(it.id)[1];


                if (destinationX > objectX) {
                    it.left = objectX + 1
                } else if (destinationX < objectX) {
                    it.left = objectX - 1
                }
                if (destinationY > objectY) {
                    it.set('top', objectY + 1)
                } else if (destinationY < objectY) {
                    it.set('top', objectY - 1)
                }

                var center = intersectsAll(it.radius, it.left, it.top);

                if (center != null) {
                    it.top = objectY;
                    it.left = objectX;
                    if (destinationX > objectX && !intersect(it.radius, it.left + 1, it.top, center.radius, center.left, center.top)) {
                        it.left = objectX + 1
                    } else if (destinationX < objectX && !intersect(it.radius, it.left - 1, it.top, center.radius, center.left, center.top)) {
                        it.left = objectX - 1
                    }
                    if (destinationY > objectY && !intersect(it.radius, it.left, it.top + 1, center.radius, center.left, center.top)) {
                        it.top = objectY + 1
                    } else if (destinationY < objectY && !intersect(it.radius, it.left, it.top - 1, center.radius, center.left, center.top)) {
                        it.top = objectY - 1
                    }


                }


                if (objectX - destinationX < 1 && objectY - destinationY < 1 && objectX - destinationX > -1 && objectY - destinationY > -1) {
                    canvasContext.destinations.delete(it.id);
                    console.log("get dest", objectX, " ", objectY)
                }

            } else {
                // console.log(rect.get('top'),rect.get('left'))
            }

        })
}

function intersect(r1, x1, y1, r2, x2, y2) {
    if (((x1 + r1 - x2 - r2) * (x1 + r1 - x2 - r2) + (y1 + r1 - y2 - r2) * (y1 + r1 - y2 - r2)) < (r1 + r2) * (r1 + r2)) {
        console.log("INTERSECT")
    }
    return ((x1 + r1 - x2 - r2) * (x1 + r1 - x2 - r2) + (y1 + r1 - y2 - r2) * (y1 + r1 - y2 - r2)) < (r1 + r2) * (r1 + r2)

}

function intersectsAll(r1, x1, y1) {
    var isi = null;
    canvas.getObjects().forEach(it => {
        if (it.id != 1) {
            if (intersect(r1, x1, y1, it.radius, it.left, it.top))
                isi = {left: it.left, top: it.top, radius: it.radius}
        }
    });
    return isi;
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