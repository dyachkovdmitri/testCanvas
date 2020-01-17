var requestAnimFrame = (function(){
    return window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();

var canvas;
var ctx;
var gameTime = 0;
var isGameOver;
var terrainPattern;

var player = {
    pos: [0, 0]
};

// Speed in pixels per second
var playerSpeed = 200;
var bulletSpeed = 500;
var enemySpeed = 100;
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
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");

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

function render() {
    // ctx.fillStyle = terrainPattern;
  //  ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Render the player if the game isn't over
    if(!isGameOver) {
        renderEntity(player);
    }

//     renderEntities(bullets);
// renderEntities(enemies);
// renderEntities(explosions);
}

function renderEntity(entity) {
    ctx.save();
    ctx.translate(entity.pos[0], entity.pos[1]);
    entity.sprite.render(ctx);
    ctx.restore();
}

function handleInput(dt) {
    if(input.isDown('DOWN') || input.isDown('s')) {
        player.pos[1] += playerSpeed * dt;
    }

    if(input.isDown('UP') || input.isDown('w')) {
        player.pos[1] -= playerSpeed * dt;
    }

    if(input.isDown('LEFT') || input.isDown('a')) {
        player.pos[0] -= playerSpeed * dt;
    }

    if(input.isDown('RIGHT') || input.isDown('d')) {
        player.pos[0] += playerSpeed * dt;
    }

    if(input.isDown('SPACE') &&
        !isGameOver &&
        Date.now() - lastFire > 100) {
        var x = player.pos[0] + player.sprite.size[0] / 2;
        var y = player.pos[1] + player.sprite.size[1] / 2;

        bullets.push({ pos: [x, y],
            dir: 'forward',
            sprite: new Sprite('img/sprites.png', [0, 39], [18, 8]) });
        bullets.push({ pos: [x, y],
            dir: 'up',
            sprite: new Sprite('img/sprites.png', [0, 50], [9, 5]) });
        bullets.push({ pos: [x, y],
            dir: 'down',
            sprite: new Sprite('img/sprites.png', [0, 60], [9, 5]) });

        lastFire = Date.now();
    }
}