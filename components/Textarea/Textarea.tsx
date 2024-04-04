import { forwardRef, type ComponentProps, type ReactNode } from "react";
import type { SamsUIBoolean, SamsUIColors } from "../../SamsUITheme";
import type { DeepPartial } from "../../helpers/deep-partial";
import { mergeDeep } from "../../helpers/merge-deep";
import { useTheme } from "../../SamsUIThemeContext";
import { twMerge } from "tailwind-merge";
import { HelperText } from "../HelperText";

export interface SamsUITextareaTheme {
  base: string;
  colors: TextareaColors;
  withShadow: SamsUIBoolean;
}
export interface TextareaColors
  extends Pick<
    SamsUIColors,
    "gray" | "info" | "failure" | "warning" | "success"
  > {
  [key: string]: string;
}
export interface TextareaProps
  extends Omit<ComponentProps<"textarea">, "color" | "ref"> {
  color?: keyof TextareaColors;
  helperText?: ReactNode;
  shadow?: boolean;
  theme?: DeepPartial<SamsUITextareaTheme>;
}
export const Textarea: import("react").ForwardRefExoticComponent<
  TextareaProps & import("react").RefAttributes<HTMLTextAreaElement>
> = forwardRef(
  (
    {
      className,
      color = "gray",
      helperText,
      shadow,
      theme: customTheme = {},
      ...props
    },
    ref
  ) => {
    const theme = mergeDeep(useTheme().theme.textarea, customTheme);

    return (
      <>
        <textarea
          ref={ref}
          className={twMerge(
            theme.base,
            theme.colors[color],
            theme.withShadow[shadow ? "on" : "off"],
            className
          )}
          {...props}
        />
        {helperText && <HelperText color={color}>{helperText}</HelperText>}
      </>
    );
  }
);
