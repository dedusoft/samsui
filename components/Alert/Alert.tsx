import type { ComponentProps, FC, PropsWithChildren, ReactNode } from "react";
import type { SamsUIColors } from "../../SamsUITheme";
import { DeepPartial } from "../../helpers/deep-partial";
import { mergeDeep } from "../../helpers/merge-deep";
import { useTheme } from "../../SamsUIThemeContext";
import { twMerge } from "tailwind-merge";
import { HiX } from "react-icons/hi";
export interface SamsUIAlertTheme {
  base: string;
  borderAccent: string;
  closeButton: SamsUIAlertCloseButtonTheme;
  color: SamsUIColors;
  icon: string;
  rounded: string;
  wrapper: string;
}
export interface SamsUIAlertCloseButtonTheme {
  base: string;
  color: SamsUIColors;
  icon: string;
}
export interface AlertProps
  extends PropsWithChildren<Omit<ComponentProps<"div">, "color">> {
  additionalContent?: ReactNode;
  color?: keyof SamsUIColors;
  icon?: FC<ComponentProps<"svg">> | boolean;
  onDismiss?: boolean | (() => void);
  rounded?: boolean;
  theme?: DeepPartial<SamsUIAlertTheme>;
  withBorderAccent?: boolean;
}
export const Alert: FC<AlertProps> = ({
  additionalContent,
  children,
  className,
  color = "info",
  icon: Icon,
  onDismiss,
  rounded = true,
  theme: customTheme = {},
  withBorderAccent,
  ...props
}) => {
  const theme = mergeDeep(useTheme().theme.alert, customTheme);

  return (
    <div
      {...props}
      className={twMerge(
        theme.base,
        theme.color[color],
        rounded && theme.rounded,
        withBorderAccent && theme.borderAccent,
        className
      )}
      role="alert"
    >
      <div className={theme.wrapper}>
        {Icon && typeof Icon === "boolean" && (
          <svg
            className="flex-shrink-0 inline w-4 h-4 mr-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
              fillRule="evenodd"
            />
          </svg>
        )}

        {Icon && typeof Icon !== "boolean" &&  <Icon className={theme.icon} />}
        <div> {children} </div>
        {typeof onDismiss === "function" && (
          <button
            aria-label="Dismiss"
            className={twMerge(
              theme.closeButton.base,
              theme.closeButton.color[color]
            )}
            onClick={onDismiss}
            type="button"
          >
            <HiX className={theme.closeButton.icon} />
          </button>
        )}
      </div>
      {additionalContent && <div>{additionalContent}</div>}
    </div>
  );
};
