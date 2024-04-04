import type { ComponentProps, FC, PropsWithChildren } from "react";
import type { DeepPartial } from "../../helpers/deep-partial";
import { SamsUIStateColors } from "../../SamsUITheme";
import { mergeDeep } from "../../helpers/merge-deep";
import { useTheme } from "../../SamsUIThemeContext";
import { twMerge } from "tailwind-merge";
export interface SamsUILabelTheme {
  root: SamsUILabelRootTheme;
}
export interface SamsUILabelRootTheme {
  base: string;
  colors: LabelColors;
  disabled: string;
}
export interface LabelColors extends SamsUIStateColors {
  [key: string]: string;
  default: string;
}
export interface LabelProps
  extends PropsWithChildren<Omit<ComponentProps<"label">, "color">> {
  color?: keyof LabelColors;
  disabled?: boolean;
  theme?: DeepPartial<SamsUILabelTheme>;
  value?: string;
}
export const Label: FC<LabelProps> = ({
  children,
  className,
  color = "default",
  disabled = false,
  theme: customTheme = {},
  value,
  ...props
}) => {
  const theme = mergeDeep(useTheme().theme.label, customTheme);

  return (
    <label
      className={twMerge(
        theme.root.base,
        theme.root.colors[color],
        disabled && theme.root.disabled,
        className
      )}
      {...props}
    >
      {value ?? children ?? ""}
    </label>
  );
};
