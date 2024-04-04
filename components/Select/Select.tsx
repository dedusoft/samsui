import {
  forwardRef,
  type ComponentProps,
  type FC,
  type PropsWithChildren,
  type ReactNode,
} from "react";
import {
  useTheme,
  type SamsUIBoolean,
  type SamsUIColors,
  type SamsUISizes,
  HelperText,
} from "../../";
import type { DeepPartial } from "../../helpers/deep-partial";
import { mergeDeep } from "../../helpers/merge-deep";
import { twMerge } from "tailwind-merge";
export interface SamsUISelectTheme {
  base: string;
  addon: string;
  field: {
    base: string;
    icon: {
      base: string;
      svg: string;
    };
    select: {
      base: string;
      withIcon: SamsUIBoolean;
      withAddon: SamsUIBoolean;
      withShadow: SamsUIBoolean;
      sizes: SelectSizes;
      colors: SelectColors;
    };
  };
}
export interface SelectColors
  extends Pick<
    SamsUIColors,
    "gray" | "info" | "failure" | "warning" | "success"
  > {
  [key: string]: string;
}
export interface SelectSizes extends Pick<SamsUISizes, "sm" | "md" | "lg"> {
  [key: string]: string;
}
export interface SelectProps
  extends PropsWithChildren,
    Omit<ComponentProps<"select">, "color" | "ref"> {
  addon?: ReactNode;
  color?: keyof SelectColors;
  helperText?: ReactNode;
  icon?: FC<ComponentProps<"svg">>;
  shadow?: boolean;
  sizing?: keyof SelectSizes;
  theme?: DeepPartial<SamsUISelectTheme>;
}
export const Select: import("react").ForwardRefExoticComponent<
  SelectProps & import("react").RefAttributes<HTMLSelectElement>
> = forwardRef(
  (
    {
      addon,
      children,
      className,
      color = "gray",
      helperText,
      icon: Icon,
      shadow,
      sizing = "md",
      theme: customTheme = {},
      ...props
    },
    ref
  ) => {
    const theme = mergeDeep(useTheme().theme.select, customTheme);
    return (
      <div className={twMerge(theme.base, className)}>
        {addon && <span className={theme.addon}>{addon}</span>}
        <div className={theme.field.base}>
          {Icon && (
            <div className={theme.field.icon.base}>
              <Icon className={theme.field.icon.svg} />
            </div>
          )}

          <select
            className={twMerge(
              theme.field.select.base,
              theme.field.select.colors[color],
              theme.field.select.sizes[sizing],
              theme.field.select.withIcon[Icon ? "on" : "off"],
              theme.field.select.withAddon[addon ? "on" : "off"],
              theme.field.select.withShadow[shadow ? "on" : "off"]
            )}
            {...props}
            ref={ref}
          >
            {children}
          </select>
        </div>
        {helperText && (<HelperText color={color} >{helperText}</HelperText>)}
      </div>
    );
  }
);
