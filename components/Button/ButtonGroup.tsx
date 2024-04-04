import {
  useMemo,
  type FC,
  Children,
  cloneElement,
  isValidElement,
  ReactNode,
  ComponentPropsWithRef,
} from "react";
import type { DeepPartial } from "../../helpers/deep-partial";
import { mergeDeep } from "../../helpers/merge-deep";
import { useTheme } from "../../SamsUIThemeContext";
import { twMerge } from "tailwind-merge";
export interface SamsUIButtonGroupTheme {
  base: string;
  position: PositionInButtonGroup;
}
export interface PositionInButtonGroup {
  none: string;
  start: string;
  middle: string;
  end: string;
}
export interface ButtonGroupProps extends ComponentPropsWithRef<"div"> {
  children?:  ReactNode;
  theme?: DeepPartial<SamsUIButtonGroupTheme>;
  outline?: boolean;
  pill?: boolean;
}
export const ButtonGroup: FC<ButtonGroupProps> = ({
  children,
  className,
  outline,
  pill,
  theme: customTheme = {},
  ...props
}) => {
  const items = useMemo(
    () =>
      children && Children.map(children, (child, index) => {
        if (isValidElement(child)) {
          return cloneElement<any>(child, {
            outline,
            pill,
            positionInGroup:
              index === 0
                ? "start"
                : index === children.toString().length - 1
                ? "end"
                : "middle",
          });
        }
      }),
    [children, outline, pill]
  );

  const theme = mergeDeep(useTheme().theme.buttonGroup, customTheme);
  return (
    <div
      className={twMerge(theme.base, className)}
      role="group"
      {...props}
    >
        {items}
    </div>
  );
};

export default ButtonGroup;
