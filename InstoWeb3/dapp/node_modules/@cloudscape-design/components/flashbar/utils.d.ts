import { FlashbarProps, FlashType } from './interfaces';
import { IconProps } from '../icon/interfaces';
export declare const FOCUS_THROTTLE_DELAY = 2000;
export interface StackableItem extends FlashbarProps.MessageDefinition {
    expandedIndex: number;
    collapsedIndex?: number;
}
export declare function getItemType(item: FlashbarProps.MessageDefinition): "progress" | FlashbarProps.Type;
export declare function getVisibleCollapsedItems(items: ReadonlyArray<FlashbarProps.MessageDefinition>, desiredLength: number): ReadonlyArray<StackableItem>;
export declare function getFlashTypeCount(items: readonly FlashbarProps.MessageDefinition[]): Record<FlashType, number>;
export type LabelName = 'errorCountAriaLabel' | 'warningCountAriaLabel' | 'successCountAriaLabel' | 'infoCountAriaLabel' | 'inProgressCountAriaLabel';
export declare const counterTypes: {
    type: FlashType;
    labelName: LabelName;
    iconName: IconProps.Name;
}[];
//# sourceMappingURL=utils.d.ts.map