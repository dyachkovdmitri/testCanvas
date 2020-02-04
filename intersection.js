function onIntersect(it, unit) {
    if (it.needRes!==undefined && it.needRes!==null&&it.needRes == unit.unitType) {
        it.inWork=true;
        canvasContext.destinations.delete(it.id);
        return false
        // it.set('angle', (tact % 72) * 5);
    } return true
}