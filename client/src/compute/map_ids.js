export function mapIds(keyId, targetId, mapArr) {

    let resultArray = []
    let keyObj = {};

    for (let i=0; i<mapArr.length; i++) {
        if (keyObj[mapArr[i][keyId]]) keyObj[mapArr[i][keyId]].push(mapArr[i][targetId]);
        else keyObj[mapArr[i][keyId]] = [mapArr[i][targetId]];
    }

    let keyObjKeys = Object.keys(keyObj);
    let tempObj = {};

    for (let j=0; j<keyObjKeys.length; j++) {
        tempObj[keyId] = keyObjKeys[j];
        tempObj[targetId] = keyObj[keyObjKeys[j]];
        resultArray.push(tempObj);
        tempObj = {};
    }
    return resultArray;
}