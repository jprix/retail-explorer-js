import { __assign } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect } from 'react';
import { applyDisplayName } from '../internal/utils/apply-display-name';
import CollapsibleFlashbar from './collapsible-flashbar';
import NonCollapsibleFlashbar from './non-collapsible-flashbar';
import { sendRenderMetric } from './internal/analytics';
export default function Flashbar(props) {
    useEffect(function () {
        if (props.items.length > 0) {
            sendRenderMetric(props.items);
        }
    }, [props.items]);
    if (isStackedFlashbar(props)) {
        return React.createElement(CollapsibleFlashbar, __assign({}, props));
    }
    else {
        return React.createElement(NonCollapsibleFlashbar, __assign({}, props));
    }
}
function isStackedFlashbar(props) {
    return 'stackItems' in props && props.stackItems;
}
applyDisplayName(Flashbar, 'Flashbar');
//# sourceMappingURL=index.js.map