function moveDirect(unit, direction) {
    unit.left += dirDic[direction][0];
    unit.top += dirDic[direction][1];
}

function reverse(unit, direction) {
    unit.left += -dirDic[direction][0];
    unit.top += -dirDic[direction][1];
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
    20: [0, 0]
};


function moveUnit(it) {
    // console.log("steps", it.failed);

    if (canvasContext.destinations.has(it.id)) {
        if (it.id > 0 && it.id < 1000) {
            if (!tryMove(it)) {
                if (it.failed !== undefined) {
                    it.failed.push(it.left);
                    it.failed.push(it.top)
                }
                if (!tryMove(it, 1)) {
                    if (!tryMove(it, 2)) {
                        if (!tryMove(it, 3)) {
                            if (!tryMove(it, -1)) {
                                if (!tryMove(it, -2)) {
                                    if (!tryMove(it, -3)) {
                                        // if (it.failed === undefined) {
                                        //     it.failed = [it.left, it.top]
                                        // } else {
                                        //     it.failed.push(it.left);
                                        //     it.failed.push(it.top)
                                        // }
                                        //
                                        // tryMove(it, 4);

                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}


function tryMove(unit, changeDirection) {
    if (changeDirection === undefined) {
        changeDirection = 0
    }
 //   if(unit.okSteps===undefined){unit.okSteps=0;}
    var direction = limitDirection(getDirection(unit) + changeDirection);

    // console.log(changeDirection);
   //  console.log(direction);
    // console.log(getDirection(unit));
    moveDirect(unit, direction);
    // let enemy = enemyInRange(unit);
    // if (enemy != null) {
    //     if (shoot(unit, 200, enemy.left, enemy.top)) {
    //         //  canvas.remove(enemy);
    //     }
    // }


    // if (unit.failed !== undefined) {
    //     console.log("number failed steps", unit.failed.length);
    // }
    // if (checkFailed(unit)) {
    //     unit.okSteps=0;
    //     //  console.log("ALREADY BE HERE ", direction);
    //     reverse(unit, direction);
    //  //   addUnit(345, "red", unit.left, unit.top, 0.3);
    //     return false;
    // }
    if (intersectsAll(unit)) {
   //     unit.okSteps=0;
        //console.log("INTERSECTED ", direction);
        reverse(unit, direction);
      //  addUnit(345, "blue", unit.left, unit.top, 0.3);
        return false;
    } else {
  //      unit.okSteps++;
        //addUnit(345, 'yellow', unit.left, unit.top, 0.3);
        return true;
    }
}

function checkFailed(me) {
    if(me.okSteps>3){me.failed === undefined; return false;}
    if (me.failed === undefined) return false;
    if (me.failed.length===350){
        me.failed=me.failed.splice(0,50)
    }
    for (let i = 0; i < me.failed.length - 1; i = i + 2) {
        if (me.failed[i] === me.left && me.failed[i + 1] === me.top) {
            return true;
        }
    }
    return false;
}


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
        if (step % 400 === 0) {//степень упоротости, как долго будет пытаться идти к цели
            if (Math.abs(realDist - oldDist) < 2) {
                canvasContext.destinations.delete(it.id);
                // console.log('losted');
                // it.fill = 'red';
                return 20;
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
            return 20
        }
    }
    return 20
}

function intersect(it, unit) {
    if (((it.left - unit.left) * (it.left - unit.left) + (it.top - unit.top) * (it.top - unit.top)) < (it.radius + unit.radius) * (it.radius + unit.radius)) {
        return onIntersect(it, unit);
    } else return false;

}

function inRange(r1, x1, y1, r2, x2, y2) {
    return ((x1 + r1 - x2 - r2) * (x1 + r1 - x2 - r2) + (y1 + r1 - y2 - r2) * (y1 + r1 - y2 - r2)) < 200 * 200
}

function getDist(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
}

function enemyInRange(unit) {
    var isi = null;
    canvas.getObjects().forEach(it => {
        if (it.id !== unit.id) {
            if (inRange(unit.radius, unit.left, unit.top, it.radius, it.left, it.top)) {
                if (it.fill === "red") {
                    //   console.log("ENEMY");//todo break;

                    isi = it;
                }
            }
        }
    });
    return isi;
}

function intersectsAll(unit) {
    var isi = false;
    canvas.getObjects().forEach(it => {
        if (it.id !== unit.id) {
            if (intersect(unit, it)) {
                isi = true
            }
        }
    });
    return isi;
}

function intersectWith(unit) {
    var isi = null;
    canvas.getObjects().forEach(it => {
        if (it.id !== unit.id) {
            if (intersect(unit, it)) {
                isi = it
            }
        }
    });
    return isi;
}

function limitDirection(direction) {
    if (direction === 8) {
        return 0
    }
    if (direction === 9) {
        return 1
    }
    if (direction === 10) {
        return 2
    }
    if (direction === 11) {
        return 3
    }
    if (direction === 12) {
        return 4
    }

    if (direction === -1) {
        return 7
    }

    if (direction === -2) {
        return 6
    }
    if (direction === -3) {
        return 5
    }
    if (direction >20) {
        return 20
    }

    return direction;
}