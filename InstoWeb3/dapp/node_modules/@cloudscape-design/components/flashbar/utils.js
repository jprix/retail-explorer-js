import { __assign } from "tslib";
export var FOCUS_THROTTLE_DELAY = 2000;
var typesToColors = {
    error: 'red',
    info: 'blue',
    progress: 'blue',
    success: 'green',
    warning: 'blue'
};
function getColorFromType(type) {
    var defaultColor = 'blue';
    return type ? typesToColors[type] || defaultColor : defaultColor;
}
export function getItemType(item) {
    if (item.loading) {
        return 'progress';
    }
    else {
        return item.type || 'info';
    }
}
function getItemColor(item) {
    return getColorFromType(getItemType(item));
}
/*
 Returns a selection of notifications, preserving the order when possible but making sure that all different colors in
 the stack are represented in the returned array.
 The order corresponds to how they are represented when using the collapsible feature (newest first, oldest last).
 */
export function getVisibleCollapsedItems(items, desiredLength) {
    // First `desiredLength` items in the original array,
    // together with `isColorRepeated` to tell if they can be subject to be replaced later on if necessary
    var itemsOnTop = [];
    // Items that fall outside `desiredIndexLength` but need to be "promoted" if possible
    // because they are of a different color which otherwise wouldn't be represented
    var itemsToPromote = [];
    var addedColors = new Set();
    var allPossibleColors = Object.keys(typesToColors).length;
    var finalLength = Math.min(items.length, desiredLength);
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var color = getItemColor(item);
        var isColorRepeated = addedColors.has(color);
        if (i < finalLength) {
            itemsOnTop.push({ item: __assign(__assign({}, item), { expandedIndex: i }), isColorRepeated: isColorRepeated });
        }
        else {
            if (addedColors.size === allPossibleColors) {
                // No need to keep looking for unrepresented colors, we can stop looping
                break;
            }
            else if (!isColorRepeated) {
                itemsToPromote.push(__assign(__assign({}, item), { expandedIndex: i }));
            }
        }
        addedColors.add(color);
    }
    // Generate the new array with the selected items, by picking from both arrays.
    // First, from the non-repeated items within the desired length...
    // We loop `itemsOnTop` starting from the end because we prefer to preserve the first ones rather than the old ones
    var reversedInitialSelection = [];
    var slotsReservedForPromotions = 0;
    for (var j = itemsOnTop.length - 1; j >= 0; j--) {
        var item = itemsOnTop[j];
        if (item.isColorRepeated && slotsReservedForPromotions < itemsToPromote.length) {
            slotsReservedForPromotions += 1;
        }
        else {
            reversedInitialSelection.push(item.item);
        }
    }
    var selectedItems = reversedInitialSelection.reverse();
    // ...and then complete the selection with as many promotable items as we can fit in the rest of the array
    for (var k = 0; selectedItems.length < desiredLength; k++) {
        selectedItems.push(itemsToPromote[k]);
    }
    return selectedItems;
}
export function getFlashTypeCount(items) {
    var count = { error: 0, info: 0, progress: 0, success: 0, warning: 0 };
    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
        var item = items_1[_i];
        var type = getItemType(item);
        count[type] += 1;
    }
    return count;
}
export var counterTypes = [
    { type: 'error', labelName: 'errorCountAriaLabel', iconName: 'status-negative' },
    { type: 'warning', labelName: 'warningCountAriaLabel', iconName: 'status-warning' },
    { type: 'success', labelName: 'successCountAriaLabel', iconName: 'status-positive' },
    { type: 'info', labelName: 'infoCountAriaLabel', iconName: 'status-info' },
    { type: 'progress', labelName: 'inProgressCountAriaLabel', iconName: 'status-in-progress' },
];
//# sourceMappingURL=utils.js.map