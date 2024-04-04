import type {
  ComponentPropsWithoutRef,
  ElementType,
  FC,
  RefAttributes,
} from "react";
import { type ReactNode } from "react";
import type { DeepPartial } from "../../helpers/deep-partial";
import type {
  SamsUIBoolean,
  SamsUIColors,
  SamsUIGradientColors,
  SamsUIGradientDuoToneColors,
  SamsUISizes,
} from "../../SamsUITheme";
import type { PositionInButtonGroup } from "./ButtonGroup";
import ButtonGroup from "./ButtonGroup";
import { ButtonBase } from "./ButtonBase";
import { mergeDeep } from "../../helpers/merge-deep";
import { useTheme } from "../../SamsUIThemeContext";
import { twMerge } from "tailwind-merge";
import { Spinner } from "../Spinner";
// import { genericForwardRef } from "../../helpers/generic-forward-ref";

export interface SamsUIButtonTheme {
  base: string;
  fullSized: string;
  color: SamsUIColors;
  disabled: string;
  isProcessing: string;
  spinnerSlot: string;
  spinnerLeftPosition: ButtonSizes;
  gradient: ButtonGradientColors;
  gradientDuoTone: ButtonGradientDuoToneColors;
  inner: SamsUIButtonInnerTheme;
  label: string;
  outline: SamsUIButtonOutlineTheme;
  pill: SamsUIBoolean;
  size: ButtonSizes;
}
export interface SamsUIButtonInnerTheme {
  base: string;
  position: PositionInButtonGroup;
  outline: string;
  isProcessingPadding: ButtonSizes;
}
export interface SamsUIButtonOutlineTheme extends SamsUIBoolean {
  color: ButtonOutlineColors;
  pill: SamsUIBoolean;
}
export interface ButtonColors
  extends Pick<
    SamsUIColors,
    | "dark"
    | "failure"
    | "gray"
    | "info"
    | "light"
    | "purple"
    | "success"
    | "warning"
  > {
  [key: string]: string;
}
export interface ButtonGradientColors extends SamsUIGradientColors {
  [key: string]: string;
}
export interface ButtonGradientDuoToneColors
  extends SamsUIGradientDuoToneColors {
  [key: string]: string;
}
export interface ButtonOutlineColors extends Pick<SamsUIColors, "gray"> {
  [key: string]: string;
}
export interface ButtonSizes
  extends Pick<SamsUISizes, "xs" | "sm" | "lg" | "xl"> {
  [key: string]: string;
}

export type ButtonProps<T extends ElementType = "button"> = {
  as?: T ;
  href?: string | undefined;
  color?: keyof SamsUIColors | undefined;
  fullSized?: boolean | undefined;
  gradientDuoTone?: keyof ButtonGradientDuoToneColors | undefined;
  gradientMonochrome?: keyof ButtonGradientColors | undefined;
  target?: string | undefined;
  isProcessing?: boolean | undefined;
  processingLabel?: string | undefined;
  processingSpinner?: ReactNode;
  label?: ReactNode;
  outline?: boolean ;
  pill?: boolean ;
  positionInGroup?: keyof PositionInButtonGroup | undefined;
  size?: keyof ButtonSizes | undefined;
  theme?: DeepPartial<SamsUIButtonTheme>;
} & ComponentPropsWithoutRef<T> &
  RefAttributes<T>;

export const Button: FC<ButtonProps> & {
  Group: FC<import("./ButtonGroup").ButtonGroupProps>;
} = ({
  children,
  className,
  color = "info",
  disabled,
  fullSized,
  isProcessing = false,
  processingLabel = "Loading...",
  processingSpinner,
  gradientDuoTone,
  gradientMonochrome,
  label,
  ref,
  outline = false,
  pill = false,
  positionInGroup = "none",
  size = "md",
  theme: customTheme = {},
  ...props
}) => {
  const { buttonGroup: groupTheme, button: buttonTheme } = useTheme().theme;

  const theme = mergeDeep(buttonTheme, customTheme);

  return (
    <ButtonBase ref={ref} disabled = {disabled} className={
      twMerge(
        theme.base,
        disabled && theme.disabled,
        !gradientDuoTone && !gradientMonochrome && theme.color[color],
        gradientDuoTone &&
          !gradientMonochrome &&
          theme.gradientDuoTone[gradientDuoTone],
        !gradientDuoTone &&
          gradientMonochrome &&
          theme.gradient[gradientMonochrome],
        outline && (theme.outline.color[color] ?? theme.outline.color.default),
        theme.pill[pill ? "on" : "off"],
        fullSized && theme.fullSized,
        groupTheme.position[positionInGroup],
        className
      )
    }
    {...props}
    >
      <span className={twMerge(
        theme.inner.base,
        theme.outline[outline ? "on" : "off"],
        theme.outline.pill[outline && pill ? "on" : "off"],
        theme.size[size],
        outline && !theme.outline.color[color] && theme.inner.outline,
        isProcessing && theme.isProcessing,
        isProcessing && theme.inner.isProcessingPadding[size],
        theme.inner.position[positionInGroup]
      )}>
        <>
          {isProcessing && (
            <span className={twMerge(
              theme.spinnerSlot,
              theme.spinnerLeftPosition[size]
            )}>
              {processingSpinner || (
                <Spinner size={size} />
              )}
            </span>
          )}
          {typeof children !== "undefined" ? children: (
            <span className={twMerge(theme.label)}>
              {isProcessing ? processingLabel: label}
            </span>
          ) }
        </>
      </span>
    </ButtonBase>
  );
};

Button.Group = ButtonGroup;
