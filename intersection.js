function onIntersect(it, unit) {
    if (it.id === 9999) {   // это указатель
        return true
    }
    if (unit.id === 345) {   // это след
        return false
    }

    if (unit.fill === 'white') {   // это дом
        return false
    }
    if (it.id > 19999 && it.id < 21001 && unit.id > 19999 && unit.id < 21001) {   // это ресурсы
        return true;
    }


    if (unit.unitType > 9) { //проверка нужен ли ресурс
        if (init.id!==it.task.swag&&unit.unitType === it.task.unitType + 10 && it.task.now === "goto") {

            let home = getNearestHome(unit);
            if (getDist(unit.left, unit.top, home[0], home[1]) > unit.radius + 20) {//swag вне дома
                console.log("TAKERESherthertherthert", it.id, it.task);
                it.task.now = "takeRes";
                it.task.swag = unit.id;
                // it.task.left = null;
                // it.task.top = null;
            }}
            return false
        }


        if (it.task !== undefined && it.task !== null && it.task.unitType === unit.unitType ) { //начало добычи
            //  console.log("MINE1");
            it.task.now = "mine";
            it.task.id = unit.id;
            it.task.left = null;

            it.task.top = null;
            return true;
        }

        if (unit.unitType === GRASS) {// проход сквозь траву
            return false
        }


        return true
    }