import {
  useState,
  type ComponentProps,
  type FC,
  type PropsWithChildren,
} from "react";
import type { DeepPartial } from "../../helpers/deep-partial";
import { ToastContext, type Duration } from "./ToastContext";
import { ToastToggle } from "./ToastToggle";
import { useTheme } from "../../SamsUIThemeContext";
import { mergeDeep } from "../../helpers/merge-deep";
import { twMerge } from "tailwind-merge";

export interface SamsUIToastTheme {
  root: {
    base: string;
    closed: string;
  };
  toggle: {
    base: string;
    icon: string;
  };
}
const durationClasses = {
  75: "duration-75",
  100: "duration-100",
  150: "duration-150",
  200: "duration-200",
  300: "duration-300",
  500: "duration-500",
  700: "duration-700",
  1000: "duration-1000",
};
export interface ToastProps extends PropsWithChildren<ComponentProps<"div">> {
  duration?: Duration;
  theme?: DeepPartial<SamsUIToastTheme>;
}
export const Toast: FC<ToastProps> & {
  Toggle: FC<import("./ToastToggle").ToastToggleProps>;
} = ({
  children,
  className,
  duration = 300,
  theme: customTheme = {},
  ...props
}) => {
  const [isClosed, setIsClosed] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const theme = mergeDeep(useTheme().theme.toast, customTheme);
  if (isRemoved) {
    return null;
  }
  return (
    <ToastContext.Provider
      value={{ duration, isClosed, isRemoved, setIsClosed, setIsRemoved }}
    >
      <div
        role="alert"
        className={twMerge(
          theme.root.base,
          durationClasses[duration],
          isClosed && theme.root.closed,
          className
        )}
        {...props}
      >
        {children}
      </div>
    </ToastContext.Provider>
  );
};

Toast.Toggle = ToastToggle;
