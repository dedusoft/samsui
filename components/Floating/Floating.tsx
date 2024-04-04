import { type Placement } from "@floating-ui/core";
import {
  useRef,
  type ComponentProps,
  type FC,
  type PropsWithChildren,
  type ReactNode,
  useState,
  useEffect,
} from "react";
import { autoUpdate, useFocus } from "@floating-ui/react";
import { twMerge } from "tailwind-merge";
import {
  useBaseFLoating,
  useFloatingInteractions,
} from "../../helpers/use-floating";
import { getArrowPlacement } from "./helpers";

export interface SamsUIFloatingTheme {
  arrow: SamsUIFloatingArrowTheme;
  animation: string;
  base: string;
  content: string;
  hidden: string;
  style: {
    auto: string;
    dark: string;
    light: string;
  };
  target: string;
}
export interface SamsUIFloatingArrowTheme {
  base: string;
  placement: string;
  style: {
    dark: string;
    light: string;
    auto: string;
  };
}
export type FloatingStyle = "dark" | "light" | "auto";
export interface FloatingProps
  extends PropsWithChildren,
    Omit<ComponentProps<"div">, "content" | "style"> {
  animation?: false | `duration-${number}`;
  arrow?: boolean;
  content: ReactNode;
  placement?: "auto" | Placement;
  style?: FloatingStyle;
  theme: SamsUIFloatingTheme;
  trigger?: "hover" | "click";
  minWidth?: number;
}
/**
 * @see https://floating-ui.com/docs/react-dom-interactions
 */
export const Floating: FC<FloatingProps> = ({
  animation = "duration-300",
  arrow = true,
  children,
  className,
  content,
  placement = "top",
  style = "dark",
  theme,
  trigger = "hover",
  minWidth,
  ...props
}) => {
  const arrowRef = useRef(null);
  const [open, setOpen] = useState(false);
  const floatingProperties = useBaseFLoating({
    open,
    placement,
    arrowRef,
    setOpen,
  });
  const {
    context,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
    refs,
    strategy,
    update,
    x,
    y,
  } = floatingProperties;
  const focus = useFocus(context);
  const { getFloatingProps, getReferenceProps } = useFloatingInteractions({
    context,
    role: "tooltip",
    trigger,
    interactions: [focus],
  });

  useEffect(() => {
    if (refs.reference.current && refs.floating.current && open) {
      return autoUpdate(refs.reference.current, refs.floating.current, update);
    }
  }, [open, refs.floating, refs.reference, update]);

  return (
    <>
      <div
        ref={refs.setReference}
        className={theme.target}
        {...getReferenceProps}
      >
        {children}
      </div>
      <div
        ref={refs.setFloating}
        {...getFloatingProps({
          className: twMerge(
            theme.base,
            animation && `${theme.animation} ${animation}`,
            !open && theme.hidden,
            theme.style[style],
            className
          ),
          style: {
            position: strategy,
            top: y ?? " ",
            left: x ?? " ",
            minWidth,
          },
          ...props,
        })}
      >
        <div className={theme.content}>{content}</div>
        {arrow && (
          <div
            className={twMerge(
              theme.arrow.base,
              style === "dark" && theme.arrow.style.dark,
              style === "light" && theme.arrow.style.light,
              style === "auto" && theme.arrow.style.auto
            )}
            ref={arrowRef}
            style={{
              top: arrowY ?? " ",
              left: arrowX ?? " ",
              right: " ",
              bottom: " ",
              [getArrowPlacement({
                placement: floatingProperties.placement,
              })]: theme.arrow.placement,
            }}
          >
            {"\u00A0"}
          </div>
        )}
      </div>
    </>
  );
};
