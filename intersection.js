function onIntersect(it, unit) {
    if(it.id===9999){
        return true
    }
    if (unit.unitType > 9 ) {
        if (it.purpose !== null&&it.purpose !== undefined && unit.unitType === it.purpose.unitType && it.purpose.now!=="gotoBase") {
            it.purpose.now = "takeRes";
            it.purpose.id = unit.id;
            canvasContext.destinations.delete(it.id);
        }
        return false
    }
    if (it.needRes !== undefined && it.needRes !== null && it.needRes === unit.unitType) {
        it.inWork = true;
        canvasContext.destinations.delete(it.id);
        return false;
    }
    return true
}