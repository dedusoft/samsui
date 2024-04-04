import { createContext, useContext } from "react";
import type { AccordionPanelProps } from "./AccordionPanel";
type AccordionPanelContextProps = Omit<AccordionPanelProps, 'children'>;

export const AccordionPanelContext = createContext<AccordionPanelContextProps | undefined>(undefined);

export function useAccordionContext() {
    const context = useContext(AccordionPanelContext);

    if(!context) {
        throw new Error('useAccordionContext should be used within the AccordionPanelContext Provider');
    }
    return context;
}