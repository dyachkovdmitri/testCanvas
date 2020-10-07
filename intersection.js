function onIntersect(it, intersected) {
    if (it.id === 9999) {   // это указатель
        return true
    }
    if (intersected.id === 345) {   // это след
        return false
    }

    if (intersected.fill === 'white') {   // это дом
        return false
    }
    if (it.id > 19999 && it.id < 21001 && intersected.id > 19999 && intersected.id < 21001) {   // это ресурсы
        return true;
    }


    if (intersected.unitType > 9) { //проверка нужен ли ресурс
        if (intersected.id !== it.task.swag && intersected.unitType === it.task.unitType + 10 && it.task.now === "goto") {

            let home = getNearestHome(intersected);
            if (getDist(intersected.left, intersected.top, home[0], home[1]) > intersected.radius + 20) {//swag вне дома
                console.log("TAKERESherthertherthert", it.id, it.task);
                it.task.now = "takeRes";
                it.task.swag = intersected.id;
            }
        }
        return false
    }


    if (it.task !== undefined && it.task !== null && it.task.unitType === intersected.unitType&&intersected.unitType!==undefined) { //начало добычи
        console.log("MINE1", it.id, it.task.unitType, intersected.id, intersected.unitType);
        it.task.now = "mine";
        it.task.id = intersected.id;
        it.task.left = null;
        it.task.left = null;
        it.task.top = null;
        return true;
    }

    if (intersected.unitType === GRASS) {// проход сквозь траву
        return false
    }
    return true
}