// Add an emoji to beginning of each category name
// using object key below.


module.exports = function(dbArray,selector) {

    const categoryEmojiKey = {
        "PCD": "\u{1F36B}",
        "PDE": "\u{1F34E}",
        "FZN": "\u{1F9CA}",
        "DRY": "\u{1F9C0}",
        "MET": "\u{1F357}",
        "BBY": "\u{1F35E}",
        "BVE": "\u{1F9C3}",
        "PCE": "\u{1FA92}",
        "HHD": "\u{1F9FA}",
        "GOR": "\u{1F3E1}",
        "HWE": "\u{1F527}",
        "ETS": "\u{1F50B}",
        "ZZZ": "\u{1F984}"
    };

    for (let x of dbArray) {
        if (categoryEmojiKey[x[selector]]) {
            x.category_name = categoryEmojiKey[x[selector]]
                .concat("\u{00A0}\u{00A0}\u{00A0}")
                .concat(x.category_name);
        }
    }

    return;
};