// DESC: Sorts given array (arr) of objects into a specific order
//          dictated by key array (keyArr). 
// INPUT: arr to be ordered, keyArr to order by, and object key
//          from arr that matches keyArr elements.
// NOTES: Algorithm variable descriptions...
//          i = key Crawler
//          j = arr Crawler
//          k = starting position for both arrays
// OUTPUT: Updated arr in the proper order

module.exports = function(arr,keyArr,objKey) {

    const swap = (a,b) => [arr[a], arr[b]] = [arr[b], arr[a]]; 

    let [i,j,k] = [0,0,0];
    while (k < arr.length-1) {
        if (arr[j][objKey] === keyArr[i]) {
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

    return;
};