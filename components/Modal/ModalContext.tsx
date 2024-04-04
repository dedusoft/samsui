import { createContext, useContext } from "react";

type ModalContextProps = {
    popup?: boolean;
    setHeaderId: (id: string | undefined) => void;
    onClose?: () => void;
};
export const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export function useModalContext() {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModalContext should be used within the ModalContext provider!');
    }
    return context;
};
export {};
