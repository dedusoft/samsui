import type { ComponentProps, FC, PropsWithChildren, ReactElement } from 'react';
import type { SamsUIBoolean } from '../../SamsUITheme';
import type { DeepPartial } from '../../helpers/deep-partial';
// import type { SamsUIAccordionComponentTheme } from './AccordionContent';
import type { AccordionPanelProps } from './AccordionPanel';
// import type { SamsUIAccordionTitleTheme } from './AccordionTitle';
export interface SamsUIAccordionTheme {
    root: SamsUIAccordionRootTheme;
//     content: SamsUIAccordionComponentTheme;
//     title: SamsUIAccordionTitleTheme;
}
export interface SamsUIAccordionRootTheme {
    base: string;
    flush: SamsUIBoolean;
}
export interface AccordionProps extends PropsWithChildren<ComponentProps<'div'>> {
    alwaysOpen?: boolean;
    arrowIcon?: FC<ComponentProps<'svg'>>;
    children: ReactElement<AccordionPanelProps> | ReactElement<AccordionPanelProps>[];
    flush?: boolean;
    collapseAll?: boolean;
    theme?: DeepPartial<SamsUIAccordionTheme>;
}
export declare const Accordion: FC<AccordionProps> & {
    Panel: FC<AccordionPanelProps>;
    // Title: FC<import("./AccordionTitle").AccordionTitleProps>;
    // Content: FC<import("./AccordionContent").AccordionContentProps>;
};
