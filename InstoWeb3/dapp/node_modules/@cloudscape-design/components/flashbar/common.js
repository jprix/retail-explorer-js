import { __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import useBaseComponent from '../internal/hooks/use-base-component';
import { useMergeRefs } from '../internal/hooks/use-merge-refs';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useContainerBreakpoints } from '../internal/hooks/container-queries';
import { useReducedMotion, useVisualRefresh } from '../internal/hooks/use-visual-mode';
import { getBaseProps } from '../internal/base-component';
import { focusFlashById } from './flash';
export var componentName = 'Flashbar';
// Common logic for collapsible and non-collapsible Flashbar
export function useFlashbar(_a) {
    var items = _a.items, onItemsAdded = _a.onItemsAdded, onItemsChanged = _a.onItemsChanged, onItemsRemoved = _a.onItemsRemoved, restProps = __rest(_a, ["items", "onItemsAdded", "onItemsChanged", "onItemsRemoved"]);
    var __internalRootRef = useBaseComponent(componentName).__internalRootRef;
    var allItemsHaveId = useMemo(function () { return items.every(function (item) { return 'id' in item; }); }, [items]);
    var baseProps = getBaseProps(restProps);
    var ref = useRef(null);
    var _b = useContainerBreakpoints(['xs']), breakpoint = _b[0], breakpointRef = _b[1];
    var mergedRef = useMergeRefs(ref, breakpointRef, __internalRootRef);
    var isReducedMotion = useReducedMotion(breakpointRef);
    var isVisualRefresh = useVisualRefresh();
    var _c = useState(items), previousItems = _c[0], setPreviousItems = _c[1];
    var _d = useState(null), nextFocusId = _d[0], setNextFocusId = _d[1];
    // Track new or removed item IDs in state to only trigger focus changes for newly added items.
    // https://reactjs.org/docs/hooks-faq.html#how-do-i-implement-getderivedstatefromprops
    if (items) {
        var newItems = items.filter(function (_a) {
            var id = _a.id;
            return id && !previousItems.some(function (item) { return item.id === id; });
        });
        var removedItems = previousItems.filter(function (_a) {
            var id = _a.id;
            return id && !items.some(function (item) { return item.id === id; });
        });
        if (newItems.length > 0 || removedItems.length > 0) {
            setPreviousItems(items);
            if (onItemsAdded) {
                onItemsAdded(newItems);
            }
            if (onItemsRemoved) {
                onItemsRemoved(removedItems);
            }
            var newFocusItems = newItems.filter(function (_a) {
                var ariaRole = _a.ariaRole;
                return ariaRole === 'alert';
            });
            if (newFocusItems.length > 0) {
                setNextFocusId(newFocusItems[0].id);
            }
            if (onItemsChanged) {
                onItemsChanged({ allItemsHaveId: allItemsHaveId, isReducedMotion: isReducedMotion });
            }
        }
    }
    useEffect(function () {
        if (nextFocusId) {
            focusFlashById(ref.current, nextFocusId);
        }
    }, [nextFocusId, ref]);
    return { allItemsHaveId: allItemsHaveId, baseProps: baseProps, breakpoint: breakpoint, isReducedMotion: isReducedMotion, isVisualRefresh: isVisualRefresh, mergedRef: mergedRef, ref: ref };
}
//# sourceMappingURL=common.js.map