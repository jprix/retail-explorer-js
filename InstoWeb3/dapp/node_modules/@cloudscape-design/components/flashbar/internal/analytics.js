// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { Metrics } from '../../internal/metrics';
import { getFlashTypeCount } from '../utils';
var eventContext = 'csa_flashbar';
export var sendRenderMetric = function (items) {
    var countByType = getFlashTypeCount(items);
    Metrics.sendPanoramaMetric({
        eventContext: eventContext,
        eventType: 'render',
        eventValue: items.length.toString(),
        eventDetail: countByType
    });
};
export var sendToggleMetric = function (itemsCount, expanded) {
    Metrics.sendPanoramaMetric({
        eventContext: eventContext,
        eventType: expanded ? 'expand' : 'collapse',
        eventValue: itemsCount.toString()
    });
};
export var sendDismissMetric = function (itemType) {
    Metrics.sendPanoramaMetric({
        eventContext: eventContext,
        eventType: 'dismiss',
        eventValue: itemType
    });
};
//# sourceMappingURL=analytics.js.map