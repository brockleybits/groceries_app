// Algorithm to sort dB query results array into the preferred order...
// Takes: arr to be ordered, and order to arrange arr into
// i = key Crawler
// j = arr Crawler
// k = starting position for both arrays
// Returns: new array in the proper order

export function buildMapArray(obj,order,objKey) {

    const swap = (a,b) => [arr[a], arr[b]] = [arr[b], arr[a]]; 
    const key = order;

    let arr = [];
    for (let id of Object.keys(obj)) {
        arr.push(obj[id]);
    }

    let [i,j,k] = [0,0,0];
    while (k < arr.length-1) {
        if (arr[j][objKey] === key[i]) {
            if (k !== j) swap(k,j);
            k++;
            i=k;
            j=i;
        } else {
            if (j === arr.length-1) {
                j=k;
                i++;
            } else {
                j++;
            }
        }
    }

    return arr;
};