import type {
  ElementProps,
  Placement,
  ReferenceType,
  UseRoleProps,
} from "@floating-ui/react";
import {
  autoUpdate,
  safePolygon,
  useClick,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import type { Dispatch, RefObject, SetStateAction } from "react";
import { getMiddleware, getPlacement } from "../components/Floating/helpers";
export type UseBaseFloatingParams = {
  placement?: "auto" | Placement;
  open: boolean;
  arrowRef?: RefObject<HTMLDivElement>;
  setOpen: Dispatch<SetStateAction<boolean>>;
};
export const useBaseFLoating: <Type extends ReferenceType>({
  open,
  arrowRef,
  placement,
  setOpen,
}: UseBaseFloatingParams) => {
  placement: Placement;
  strategy: import("@floating-ui/react").Strategy;
  middlewareData: import("@floating-ui/react").MiddlewareData;
  x: number;
  y: number;
  isPositioned: boolean;
  update: () => void;
  floatingStyles: import("react").CSSProperties;
  refs: {
    reference: import("react").MutableRefObject<
      import("@floating-ui/react-dom").ReferenceType | null
    >;
    floating: import("react").MutableRefObject<HTMLElement | null>;
    setReference: (
      node: import("@floating-ui/react-dom").ReferenceType | null
    ) => void;
    setFloating: (node: HTMLElement | null) => void;
  } & import("@floating-ui/react").ExtendedRefs<Type>;
  elements: {
    reference: import("@floating-ui/react-dom").ReferenceType | null;
    floating: HTMLElement | null;
  } & import("@floating-ui/react").ExtendedElements<Type>;
  context: {
    placement: Placement;
    x: number;
    y: number;
    strategy: import("@floating-ui/react").Strategy;
    middlewareData: import("@floating-ui/react").MiddlewareData;
    isPositioned: boolean;
    update: () => void;
    floatingStyles: import("react").CSSProperties;
    open: boolean;
    onOpenChange: (open: boolean, event?: Event | undefined) => void;
    events: import("@floating-ui/react").FloatingEvents;
    dataRef: import("react").MutableRefObject<
      import("@floating-ui/react").ContextData
    >;
    nodeId: string | undefined;
    floatingId: string;
    refs: import("@floating-ui/react").ExtendedRefs<Type>;
    elements: import("@floating-ui/react").ExtendedElements<Type>;
  };
} = ({ open, arrowRef, placement = "top", setOpen }) => {
  return useFloating({
    placement: getPlacement({ placement }),
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: getMiddleware({ placement, arrowRef }),
  });
};
export type UseFloatingInteractionsParams = {
  context: ReturnType<typeof useFloating>["context"];
  trigger?: "hover" | "click";
  role?: UseRoleProps["role"];
  interactions?: ElementProps[];
};
export const useFloatingInteractions: ({
  context,
  trigger,
  role,
  interactions,
}: UseFloatingInteractionsParams) => {
  getReferenceProps: (
    userProps?: import("react").HTMLProps<Element> | undefined
  ) => Record<string, unknown>;
  getFloatingProps: (
    userProps?: import("react").HTMLProps<HTMLElement> | undefined
  ) => Record<string, unknown>;
  getItemProps: (
    userProps?: import("react").HTMLProps<HTMLElement> | undefined
  ) => Record<string, unknown>;
} = ({ context, trigger, role = "tooltip", interactions = [] }) => {
  return useInteractions([
    useClick(context, { enabled: trigger === "click" }),
    useHover(context, {
      enabled: trigger === "hover",
      handleClose: safePolygon(),
    }),
    useDismiss(context),
    useRole(context, { role }),
    ...interactions,
  ]);
};
