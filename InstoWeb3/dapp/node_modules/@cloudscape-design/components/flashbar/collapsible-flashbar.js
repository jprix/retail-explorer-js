import { __assign, __rest, __spreadArray } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import clsx from 'clsx';
import React, { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import customCssProps from '../internal/generated/custom-css-properties';
import { Flash, focusFlashById } from './flash';
import InternalIcon from '../icon/internal';
import { TransitionGroup } from 'react-transition-group';
import { Transition } from '../internal/components/transition';
import useFocusVisible from '../internal/hooks/focus-visible';
import { getVisualContextClassname } from '../internal/components/visual-context';
import styles from './styles.css.js';
import { counterTypes, getFlashTypeCount, getVisibleCollapsedItems } from './utils';
import { animate, getDOMRects } from '../internal/animate';
import { useUniqueId } from '../internal/hooks/use-unique-id';
import { sendToggleMetric } from './internal/analytics';
import { useFlashbar } from './common';
import { throttle } from '../internal/utils/throttle';
// If the number of items is equal or less than this value,
// the toggle element will not be displayed and the Flashbar will look like a regular single-item Flashbar.
var maxNonCollapsibleItems = 1;
var resizeListenerThrottleDelay = 100;
export default function CollapsibleFlashbar(_a) {
    var items = _a.items, restProps = __rest(_a, ["items"]);
    var _b = useState([]), enteringItems = _b[0], setEnteringItems = _b[1];
    var _c = useState([]), exitingItems = _c[0], setExitingItems = _c[1];
    var _d = useState(false), isFlashbarStackExpanded = _d[0], setIsFlashbarStackExpanded = _d[1];
    var getElementsToAnimate = useCallback(function () {
        var flashElements = isFlashbarStackExpanded ? expandedItemRefs.current : collapsedItemRefs.current;
        return __assign(__assign({}, flashElements), { toggleButton: toggleElementRef.current });
    }, [isFlashbarStackExpanded]);
    var prepareAnimations = useCallback(function () {
        var rects = getDOMRects(getElementsToAnimate());
        setInitialAnimationState(rects);
    }, [getElementsToAnimate]);
    var _e = useFlashbar(__assign(__assign({ items: items }, restProps), { onItemsAdded: function (newItems) {
            setEnteringItems(__spreadArray(__spreadArray([], enteringItems, true), newItems, true));
        }, onItemsChanged: function (options) {
            // If not all items have ID, we can still animate collapse/expand transitions
            // because we can rely on each item's index in the original array,
            // but we can't do that when elements are added or removed, since the index changes.
            if ((options === null || options === void 0 ? void 0 : options.allItemsHaveId) && !(options === null || options === void 0 ? void 0 : options.isReducedMotion)) {
                prepareAnimations();
            }
        }, onItemsRemoved: function (removedItems) {
            setExitingItems(__spreadArray(__spreadArray([], exitingItems, true), removedItems, true));
        } })), baseProps = _e.baseProps, breakpoint = _e.breakpoint, isReducedMotion = _e.isReducedMotion, isVisualRefresh = _e.isVisualRefresh, mergedRef = _e.mergedRef, ref = _e.ref;
    var isFocusVisible = useFocusVisible();
    var collapsedItemRefs = useRef({});
    var expandedItemRefs = useRef({});
    var _f = useState(null), initialAnimationState = _f[0], setInitialAnimationState = _f[1];
    var listElementRef = useRef(null);
    var toggleElementRef = useRef(null);
    var _g = useState(false), transitioning = _g[0], setTransitioning = _g[1];
    var flashbarElementId = useUniqueId('flashbar');
    var itemCountElementId = useUniqueId('item-count');
    if (items.length <= maxNonCollapsibleItems && isFlashbarStackExpanded) {
        setIsFlashbarStackExpanded(false);
    }
    var animateFlash = !isReducedMotion;
    function toggleCollapseExpand() {
        sendToggleMetric(items.length, !isFlashbarStackExpanded);
        if (!isReducedMotion) {
            prepareAnimations();
        }
        setIsFlashbarStackExpanded(function (prev) { return !prev; });
    }
    useLayoutEffect(function () {
        if (isFlashbarStackExpanded && (items === null || items === void 0 ? void 0 : items.length)) {
            var lastItem = items[items.length - 1];
            if (lastItem.id !== undefined) {
                focusFlashById(ref.current, lastItem.id);
            }
        }
        // Run this after expanding, but not every time the items change.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFlashbarStackExpanded]);
    var updateBottomSpacing = useMemo(function () {
        return throttle(function () {
            // Allow vertical space between Flashbar and page bottom only when the Flashbar is reaching the end of the page,
            // otherwise avoid spacing with eventual sticky elements below.
            var listElement = listElementRef === null || listElementRef === void 0 ? void 0 : listElementRef.current;
            var flashbar = listElement === null || listElement === void 0 ? void 0 : listElement.parentElement;
            if (listElement && flashbar) {
                var bottom = listElement.getBoundingClientRect().bottom;
                var windowHeight = window.innerHeight;
                // Apply the class first (before rendering)
                // so that we can make calculations based on the applied padding-bottom;
                // then we might decide to remove it or not.
                flashbar.classList.add(styles['spaced-bottom']);
                var applySpacing = isFlashbarStackExpanded && bottom + parseInt(getComputedStyle(flashbar).paddingBottom) >= windowHeight;
                if (!applySpacing) {
                    flashbar.classList.remove(styles['spaced-bottom']);
                }
            }
        }, resizeListenerThrottleDelay);
    }, [isFlashbarStackExpanded]);
    useLayoutEffect(function () {
        window.addEventListener('resize', updateBottomSpacing);
        return function () {
            window.removeEventListener('resize', updateBottomSpacing);
            updateBottomSpacing.cancel();
        };
    }, [updateBottomSpacing]);
    var i18nStrings = restProps.i18nStrings;
    useLayoutEffect(function () {
        // When `useLayoutEffect` is called, the DOM is updated but has not been painted yet,
        // so it's a good moment to trigger animations that will make calculations based on old and new DOM state.
        // The old state is kept in `initialAnimationState`
        // and the new state can be retrieved from the current DOM elements.
        if (initialAnimationState) {
            updateBottomSpacing();
            animate({
                elements: getElementsToAnimate(),
                oldState: initialAnimationState,
                newElementInitialState: function (_a) {
                    var top = _a.top;
                    return ({ scale: 0.9, y: -0.2 * top });
                },
                onTransitionsEnd: function () { return setTransitioning(false); }
            });
            setTransitioning(true);
            setInitialAnimationState(null);
        }
    }, [updateBottomSpacing, getElementsToAnimate, initialAnimationState, isFlashbarStackExpanded]);
    var isCollapsible = items.length > maxNonCollapsibleItems;
    // When using the stacking feature, the items are shown in reverse order (last item on top)
    var reversedItems = items.slice().reverse();
    var countByType = getFlashTypeCount(items);
    var stackDepth = Math.min(3, items.length);
    var itemsToShow = isFlashbarStackExpanded
        ? reversedItems.map(function (item, index) { return (__assign(__assign({}, item), { expandedIndex: index })); })
        : getVisibleCollapsedItems(reversedItems, stackDepth).map(function (item, index) { return (__assign(__assign({}, item), { collapsedIndex: index })); });
    var ariaLabel = i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.ariaLabel;
    var toggleButtonText = i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.toggleButtonText;
    var getItemId = function (item) { var _a, _b; return (_b = (_a = item.id) !== null && _a !== void 0 ? _a : item.expandedIndex) !== null && _b !== void 0 ? _b : 0; };
    // This check allows us to use the standard "enter" Transition only when the notification was not existing before.
    // If instead it was moved to the top of the stack but was already present in the array
    // (e.g, after dismissing another notification),
    // we need to use different, more custom and more controlled animations.
    var hasEntered = function (item) {
        return enteringItems.some(function (_item) { return _item.id && _item.id === item.id; });
    };
    var hasLeft = function (item) { return !('expandedIndex' in item); };
    var hasEnteredOrLeft = function (item) { return hasEntered(item) || hasLeft(item); };
    var showInnerContent = function (item) {
        return isFlashbarStackExpanded || hasLeft(item) || ('expandedIndex' in item && item.expandedIndex === 0);
    };
    var shouldUseStandardAnimation = function (item, index) { return index === 0 && hasEnteredOrLeft(item); };
    var getAnimationElementId = function (item) { return "flash-".concat(getItemId(item)); };
    var renderList = function () {
        var _a;
        return (React.createElement("ul", { ref: listElementRef, className: clsx(styles['flash-list'], isFlashbarStackExpanded ? styles.expanded : styles.collapsed, transitioning && styles['animation-running'], initialAnimationState && styles['animation-ready'], isVisualRefresh && styles['visual-refresh']), id: flashbarElementId, "aria-label": ariaLabel, "aria-describedby": isCollapsible ? itemCountElementId : undefined, style: !isFlashbarStackExpanded || transitioning
                ? (_a = {},
                    _a[customCssProps.flashbarStackDepth] = stackDepth,
                    _a) : undefined },
            React.createElement(TransitionGroup, { component: null }, itemsToShow.map(function (item, index) { return (React.createElement(Transition, { key: getItemId(item), "in": !hasLeft(item), onStatusChange: function (status) {
                    if (status === 'entered') {
                        setEnteringItems([]);
                    }
                    else if (status === 'exited') {
                        setExitingItems([]);
                    }
                } }, function (state, transitionRootElement) {
                var _a;
                var _b, _c, _d;
                return (React.createElement("li", { "aria-hidden": !showInnerContent(item), className: showInnerContent(item)
                        ? clsx(styles['flash-list-item'], !isFlashbarStackExpanded && styles.item, !collapsedItemRefs.current[getAnimationElementId(item)] && styles['expanded-only'])
                        : clsx(styles.flash, styles["flash-type-".concat((_b = item.type) !== null && _b !== void 0 ? _b : 'info')], styles.item), ref: function (element) {
                        if (isFlashbarStackExpanded) {
                            expandedItemRefs.current[getAnimationElementId(item)] = element;
                        }
                        else {
                            collapsedItemRefs.current[getAnimationElementId(item)] = element;
                        }
                    }, style: !isFlashbarStackExpanded || transitioning
                        ? (_a = {},
                            _a[customCssProps.flashbarStackIndex] = (_d = (_c = item.collapsedIndex) !== null && _c !== void 0 ? _c : item.expandedIndex) !== null && _d !== void 0 ? _d : index,
                            _a) : undefined, key: getItemId(item) }, showInnerContent(item) && (React.createElement(Flash
                // eslint-disable-next-line react/forbid-component-props
                , __assign({ 
                    // eslint-disable-next-line react/forbid-component-props
                    className: clsx(animateFlash && styles['flash-with-motion'], isVisualRefresh && styles['flash-refresh']), key: getItemId(item), ref: shouldUseStandardAnimation(item, index) ? transitionRootElement : undefined, transitionState: shouldUseStandardAnimation(item, index) ? state : undefined }, item)))));
            })); }))));
    };
    return (React.createElement("div", __assign({}, baseProps, { className: clsx(baseProps.className, styles.flashbar, styles["breakpoint-".concat(breakpoint)], styles.stack, isFlashbarStackExpanded && styles.expanded, getVisualContextClassname('flashbar')), ref: mergedRef }),
        React.createElement(React.Fragment, null,
            isFlashbarStackExpanded && renderList(),
            isCollapsible && (React.createElement("div", { className: clsx(styles.toggle, isVisualRefresh && styles['visual-refresh'], isFlashbarStackExpanded ? styles.expanded : styles.collapsed, transitioning && styles['animation-running']), onClick: toggleCollapseExpand, ref: toggleElementRef },
                React.createElement("span", { "aria-live": "polite", className: styles.status, role: "status", id: itemCountElementId },
                    toggleButtonText && React.createElement("h2", { className: styles.header }, toggleButtonText),
                    React.createElement("span", { className: styles['item-count'] }, counterTypes.map(function (_a) {
                        var type = _a.type, labelName = _a.labelName, iconName = _a.iconName;
                        return (React.createElement(NotificationTypeCount, { key: type, iconName: iconName, label: i18nStrings ? i18nStrings[labelName] : undefined, count: countByType[type] }));
                    }))),
                React.createElement("button", __assign({ "aria-controls": flashbarElementId, "aria-describedby": itemCountElementId, "aria-expanded": isFlashbarStackExpanded, "aria-label": i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.toggleButtonAriaLabel, className: clsx(styles.button, isFlashbarStackExpanded && styles.expanded) }, isFocusVisible),
                    React.createElement(InternalIcon, { className: styles.icon, size: "normal", name: "angle-down" })))),
            !isFlashbarStackExpanded && renderList())));
}
var NotificationTypeCount = function (_a) {
    var iconName = _a.iconName, label = _a.label, count = _a.count;
    return (React.createElement("span", { className: styles['type-count'] },
        React.createElement("span", { "aria-label": label, role: "img" },
            React.createElement("span", { title: label, "aria-hidden": "true" },
                React.createElement(InternalIcon, { name: iconName }))),
        React.createElement("span", { className: styles['count-number'] }, count)));
};
//# sourceMappingURL=collapsible-flashbar.js.map