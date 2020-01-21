function getDestination(id) {
    return canvasContext.destinations.get(id);
}

function getObject(id) {
    var result = null;
    canvas.getObjects().forEach(it => {
        if (it.id === id) return result = id
    });
    return result;
}

function moveDirect(unit, direction) {
    console.log(direction);
    unit.left += dirDic[direction][0];
    unit.top += dirDic[direction][1];
}

function reverse(unit, direction) {
    unit.left += -dirDic[direction][0];
    unit.top += -dirDic[direction][1];
}

function tryMove(unit, changeDirection) {
    if (changeDirection == undefined) {
        changeDirection = 0
    } else {
        console.log('changeDirection to ', getDirection(unit) + changeDirection)
    }
    var direction = getDirection(unit) + changeDirection;
    if (direction === 11) {
        return true
    }
    if (direction === 8) {
        direction = 0
    }
    if (direction === 9) {
        direction = 1
    }

    if (direction === -1) {
        direction = 7
    }

    if (direction === -2) {
        direction = 6
    }
    moveDirect(unit, direction);
    if (intersectsAll(unit.radius, unit.left, unit.top)) {
        reverse(unit, direction);
        return false
    } else return true
}


// function moveDirect2(id, direction) {
//     var unit = getObject(id);
//     moveDirect(unit, direction);
//     var object = intersectsAll(unit.radius, unit.left, unit.top);
//     if (object != null) {
//         if (direction === 7) {
//             direction = -1
//         }
//         moveDirect2(id, direction + 1);
//     }
// }

function getLeftDirection(dir) {
}

function getRightDirection(dir) {
}

function initDir() {


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
    if (canvasContext.destinations.get(it.id) != null) {
        var objectX = it.left;
        var objectY = it.top;
        var destinationX = canvasContext.destinations.get(it.id)[0];
        var destinationY = canvasContext.destinations.get(it.id)[1];
        if (objectX === destinationX && objectY > destinationY) return 0;
        if (objectX < destinationX && objectY > destinationY) return 1;
        if (objectX < destinationX && objectY === destinationY) return 2;
        if (objectX < destinationX && objectY < destinationY) return 3;
        if (objectX === destinationX && objectY < destinationY) return 4;
        if (objectX > destinationX && objectY < destinationY) return 5;
        if (objectX > destinationX && objectY === destinationY) return 6;
        if (objectX > destinationX && objectY > destinationY) return 7;
        if (objectX === destinationX && objectY === destinationY) return 11


    }
    return 11
}

function intersect(r1, x1, y1, r2, x2, y2) {
    if (((x1 + r1 - x2 - r2) * (x1 + r1 - x2 - r2) + (y1 + r1 - y2 - r2) * (y1 + r1 - y2 - r2)) < (r1 + r2) * (r1 + r2)) {
        console.log("INTERSECT", " ", r1, " ", x1, " ", y1, " ", r2, " ", x2, " ", y2)
    }
    return ((x1 + r1 - x2 - r2) * (x1 + r1 - x2 - r2) + (y1 + r1 - y2 - r2) * (y1 + r1 - y2 - r2)) < (r1 + r2) * (r1 + r2)

}

function intersectsAll(r1, x1, y1) {
    var isi = false;
    canvas.getObjects().forEach(it => {
        if (it.id != 1) {
            if (intersect(r1, x1, y1, it.radius, it.left, it.top)) {
                isi = true
            }
        }
    });
    return isi;
}