import { FC, PropsWithChildren, useState } from "react";
import { AccordionPanelContext } from "./AccordionPanelContext";

export interface AccordionPanelProps extends PropsWithChildren<any> {
    isOpen?: boolean;
    setOpen?: () => void;
}

export const AccordionPanel: FC<AccordionPanelProps> = ({ children, ...props }) => {
    const { alwaysOpen } = props;
    const [isOpen, setOpen] = useState(props.isOpen);
    const provider = alwaysOpen ? { ...props, isOpen, setOpen: () => setOpen(!isOpen) } : props;

    return (
        <AccordionPanelContext.Provider value={provider}>
            { children }
        </AccordionPanelContext.Provider>
    );
}