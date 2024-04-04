import {
  forwardRef,
  type ComponentProps,
  type FC,
  type ReactNode,
} from "react";
import type {
  SamsUIBoolean,
  SamsUIColors,
  SamsUISizes,
} from "../../SamsUITheme";
import type { DeepPartial } from "../../helpers/deep-partial";
import { mergeDeep } from "../../helpers/merge-deep";
import { useTheme } from "../../SamsUIThemeContext";
import { twMerge } from "tailwind-merge";
import { HelperText } from "../HelperText";

export interface SamsUITextInputTheme {
  base: string;
  addon: string;
  field: {
    base: string;
    icon: {
      base: string;
      svg: string;
    };
    rightIcon: {
      base: string;
      svg: string;
    };
    input: {
      base: string;
      sizes: SamsUITextInputSizes;
      colors: SamsUITextInputColors;
      withIcon: SamsUIBoolean;
      withRightIcon: SamsUIBoolean;
      withAddon: SamsUIBoolean;
      withShadow: SamsUIBoolean;
    };
  };
}
export interface SamsUITextInputColors
  extends Pick<
    SamsUIColors,
    "gray" | "info" | "failure" | "warning" | "success"
  > {
  [key: string]: string;
}
export interface SamsUITextInputSizes
  extends Pick<SamsUISizes, "sm" | "md" | "lg"> {
  [key: string]: string;
}
export interface TextInputProps
  extends Omit<ComponentProps<"input">, "ref" | "color"> {
  addon?: ReactNode;
  color?: keyof SamsUITextInputColors;
  helperText?: ReactNode;
  icon?: FC<ComponentProps<"svg">>;
  rightIcon?: FC<ComponentProps<"svg">>;
  shadow?: boolean;
  sizing?: keyof SamsUITextInputSizes;
  theme?: DeepPartial<SamsUITextInputTheme>;
}
export const TextInput: import("react").ForwardRefExoticComponent<
  TextInputProps & import("react").RefAttributes<HTMLInputElement>
> = forwardRef(
  (
    {
      addon,
      className,
      color = "gray",
      helperText,
      icon: Icon,
      rightIcon: RightIcon,
      shadow,
      sizing = "md",
      theme: customTheme = {},
      ...props
    },
    ref
  ) => {
    const theme = mergeDeep(useTheme().theme.textInput, customTheme);

    return (
      <>
        <div className={twMerge(theme.base, className)}>
          {addon && <span className={theme.addon}>{addon}</span>}
          <div className={theme.field.base}>
            {Icon && (
              <div className={theme.field.icon.base}>
                <Icon className={theme.field.icon.svg} />
              </div>
            )}
            {RightIcon && (
              <div className={theme.field.rightIcon.base}>
                <RightIcon className={theme.field.rightIcon.svg} />
              </div>
            )}
            <input
              type="text"
              className={twMerge(
                theme.field.input.base,
                theme.field.input.colors[color],
                theme.field.input.sizes[sizing],
                theme.field.input.withIcon[Icon ? "on" : "off"],
                theme.field.input.withRightIcon[RightIcon ? "on" : "off"],
                theme.field.input.withAddon[addon ? "on" : "off"],
                theme.field.input.withShadow[shadow ? "on" : "off"]
              )}
              {...props}
              ref={ref}
            />
          </div>
        </div>
        {helperText && <HelperText color={color}>{helperText}</HelperText>}
      </>
    );
  }
);
