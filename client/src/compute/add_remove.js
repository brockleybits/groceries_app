// Take an old array and new array, compare them.
// Deliver an array of two arrays:
//   addArray has values to add
//   removeArray has values to remove.


export function addRemove(origArr, newArr) {

    let addRemoveObj = {};
    let addArray = [];
    let removeArray = [];

    for (let num of origArr) {
        addRemoveObj[num] = "remove"
    }

    for (let num of newArr) {
        if (addRemoveObj[num]) addRemoveObj[num] = 0;
        else addRemoveObj[num] = "add";
    }

    for (let num of Object.keys(addRemoveObj)) {
        if (addRemoveObj[num] === "add") addArray.push(num);
        if (addRemoveObj[num] === "remove") removeArray.push(num);
    }

    return [addArray, removeArray];
}