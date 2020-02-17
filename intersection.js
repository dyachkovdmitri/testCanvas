function onIntersect(it, unit) {
    if(it.id===9999){   // это указатель
        return true
    }

    if(it.id>19999&&it.id<21001&&unit.id>19999&&unit.id<21001){   // это ресурсы
       return true;
    }


    if (unit.unitType > 9 ) { //проверка нужен ли ресурс
        if (it.task !== null&&it.task !== undefined && unit.unitType === it.task.unitType && it.task.now!=="gotoBase") {
            it.task.now = "takeRes";
            console.log("TAKERES", it);
            it.task.id = unit.id;
            canvasContext.destinations.delete(it.id);
        }
        return false
    }
   // console.log(it);
    if (it.task !== undefined && it.task !== null && it.task.unitType === unit.unitType) {
        it.task.now = "mine";
        it.task.id = unit.id;
        console.log("MINE", it);
        canvasContext.destinations.delete(it.id);
        return false;
    }
    return true
}