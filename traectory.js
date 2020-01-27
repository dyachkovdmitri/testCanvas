
function moveDirect(unit, direction) {
    unit.left += dirDic[direction][0];
    unit.top += dirDic[direction][1];
}

function reverse(unit, direction) {
    unit.left += -dirDic[direction][0];
    unit.top += -dirDic[direction][1];
}

function tryMove(unit, changeDirection) {
    if (changeDirection === undefined) {
        changeDirection = 0
    } else {
    }
    var direction = getDirection(unit) + changeDirection;
    if (direction>10) {
        return true
    }
    if (direction === 8) {
        direction = 0
    }
    if (direction === 9) {
        direction = 1
    }
    if (direction === 10) {
        direction = 2
    }

    if (direction === -1) {
        direction = 7
    }

    if (direction === -2) {
        direction = 6
    }
    if (direction === -3) {
        direction = 5
    }
    moveDirect(unit, direction);
    let enemy = enemyInRange(unit);
    if(enemy!=null){
       console.log(unit.id, " shoot");
        if(shoot(unit,200, enemy.left,enemy.top)){
          //  canvas.remove(enemy);
        }
    }

   // console.log("go");
    if (intersectsAll(unit)) {
        reverse(unit, direction);
        return false;
    } else return true;
}


var dirDic = {
    0: [0, -1],
    1: [1, -1],
    2: [1, 0],
    3: [1, 1],
    4: [0, 1],
    5: [-1, 1],
    6: [-1, 0],
    7: [-1, -1],
    11: [0, 0]
};

function getDirection(it) {
    var destination = canvasContext.destinations.get(it.id);

    if (destination != null) {
        var objectX = it.left;
        var objectY = it.top;
        var destinationX = destination[0];
        var destinationY = destination[1];

        var step = destination[2] + 1;
        var realDist = getDist(objectX, objectY, destinationX, destinationY);
        var oldDist = destination[3];
        destination = [destinationX, destinationY, step, oldDist];
        if (step % 100 === 0) {
            if (Math.abs(realDist - oldDist) < 2) {
                canvasContext.destinations.delete(it.id);
                it.fill = 'red';
                return 11;
            }
            destination = [destinationX, destinationY, step, realDist];
        }
        canvasContext.destinations.set(it.id, destination);
        //console.log("go to ", destination, getDist(objectX, objectY, destinationX, destinationY));
        if (objectX === destinationX && objectY > destinationY) return 0;
        if (objectX < destinationX && objectY > destinationY) return 1;
        if (objectX < destinationX && objectY === destinationY) return 2;
        if (objectX < destinationX && objectY < destinationY) return 3;
        if (objectX === destinationX && objectY < destinationY) return 4;
        if (objectX > destinationX && objectY < destinationY) return 5;
        if (objectX > destinationX && objectY === destinationY) return 6;
        if (objectX > destinationX && objectY > destinationY) return 7;
        if (objectX === destinationX && objectY === destinationY) {
            canvasContext.destinations.delete(it.id);
            return 11
        }
    }
    return 11
}

function intersect(r1, x1, y1, r2, x2, y2) {
    return ((x1 + r1 - x2 - r2) * (x1 + r1 - x2 - r2) + (y1 + r1 - y2 - r2) * (y1 + r1 - y2 - r2)) < (r1 + r2) * (r1 + r2)
}

function inRange(r1, x1, y1, r2, x2, y2) {
    return ((x1 + r1 - x2 - r2) * (x1 + r1 - x2 - r2) + (y1 + r1 - y2 - r2) * (y1 + r1 - y2 - r2)) < 200*200
}

function getDist(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
}

function enemyInRange(unit) {
    var isi = null;
    canvas.getObjects().forEach(it => {
        if (it.id != unit.id) {
            if (inRange(unit.radius, unit.left, unit.top, it.radius, it.left, it.top)) {
                if(it.fill==="blue"){
             //   console.log("ENEMY");//todo break;

                isi = it;}
            }
        }
    });
    return isi;
}

function intersectsAll(unit) {
    var isi = false;
    canvas.getObjects().forEach(it => {
        if (it.id != unit.id) {
            if (intersect(unit.radius, unit.left, unit.top, it.radius, it.left, it.top)) {
                isi = true
            }
        }
    });
    return isi;
}

function intersectWith(unit) {
    var isi = null;
    canvas.getObjects().forEach(it => {
        if (it.id != unit.id) {
            if (intersect(unit.radius, unit.left, unit.top, it.radius, it.left, it.top)) {
                isi = it
            }
        }
    });
    return isi;
}