import type { MutableRefObject } from "react";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type PropsWithChildren,
  useState,
} from "react";
import {
  useTheme,
  type SamsUIBoolean,
  type SamsUIPositions,
  type SamsUISizes,
} from "../../";
import type { DeepPartial } from "../../helpers/deep-partial";
import { ModalBody, type SamsUIModalBodyTheme } from "./ModalBody";
import { ModalFooter, type SamsUIModalFooterTheme } from "./ModalFooter";
import { ModalHeader, type SamsUIModalHeaderTheme } from "./ModalHeader";
import { mergeDeep } from "../../helpers/merge-deep";
import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useMergeRefs,
  useRole,
} from "@floating-ui/react";
import { ModalContext } from "./ModalContext";
import { twMerge } from "tailwind-merge";
export interface SamsUIModalTheme {
  root: SamsUIModalRootTheme;
  content: SamsUIModalContentTheme;
  body: SamsUIModalBodyTheme;
  header: SamsUIModalHeaderTheme;
  footer: SamsUIModalFooterTheme;
}
export interface SamsUIModalRootTheme {
  base: string;
  show: SamsUIBoolean;
  sizes: ModalSizes;
  positions: ModalPositions;
}
export interface SamsUIModalContentTheme {
  base: string;
  inner: string;
}
export interface ModalPositions extends SamsUIPositions {
  [key: string]: string;
}
export interface ModalSizes extends Omit<SamsUISizes, "xs"> {
  [key: string]: string;
}
export interface ModalProps
  extends PropsWithChildren<ComponentPropsWithoutRef<"div">> {
  onClose?: () => void;
  position?: keyof ModalPositions;
  popup?: boolean;
  root?: HTMLElement;
  show?: boolean;
  size?: keyof ModalSizes;
  dismissible?: boolean;
  theme?: DeepPartial<SamsUIModalTheme>;
  initialFocus?: number | MutableRefObject<HTMLElement | null>;
}

// {
//     Header: import("react").FC<import("./ModalHeader").ModalHeaderProps>;
//     Body: import("react").FC<import("./ModalBody").ModalBodyProps>;
//     Footer: import("react").FC<import("./ModalFooter").ModalFooterProps>;
//   } &
export const Modal: import("react").ForwardRefExoticComponent<
  ModalProps & import("react").RefAttributes<HTMLDivElement>
> = forwardRef(
  (
    {
      children,
      className,
      dismissible = false,
      onClose,
      popup,
      position = "center",
      root,
      show,
      size = "2xl",
      theme: customTheme = {},
      initialFocus,
      ...props
    },
    theirRef
  ) => {
    const [headerId, setHeaderId] = useState<any>(undefined);
    const theme = mergeDeep(useTheme().theme.modal, customTheme);
    const { context } = useFloating({
      open: show,
      onOpenChange: () => onClose && onClose(),
    });
    const ref = useMergeRefs([context.refs.setFloating, theirRef]);
    const click = useClick(context);
    const dismiss = useDismiss(context, {
      outsidePressEvent: "mousedown",
      enabled: dismissible,
    });
    const role = useRole(context);
    const { getFloatingProps } = useInteractions([click, dismiss, role]);
    if (!show) {
      return null;
    }
    return (
      <ModalContext.Provider value={{ popup, onClose, setHeaderId }}>
        <FloatingPortal root={root}>
          <FloatingOverlay
            lockScroll={true}
            className={twMerge(
              theme.root.base,
              theme.root.positions[position],
              show ? theme.root.show.on : theme.root.show.off,
              className
            )}
            {...props}
          >
            <FloatingFocusManager context={context} initialFocus={initialFocus}>
              <div
                ref={ref}
                {...getFloatingProps}
                className={twMerge(theme.content.base, theme.root.sizes[size])}
              >
                <div className={theme.content.inner}>{children}</div>
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        </FloatingPortal>
      </ModalContext.Provider>
    );
  }
);

// Modal.Header = ModalHeader;
// Modal.Body = ModalBody;
// Modal.Footer = ModalFooter;
