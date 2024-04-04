import type { ComponentProps, FC } from "react";
import type { DeepPartial } from "../../helpers/deep-partial";
import { HiX } from "react-icons/hi";
import { mergeDeep } from "../../helpers/merge-deep";
import { useTheme } from "../../SamsUIThemeContext";
import { useToastContext } from "./ToastContext";
import { twMerge } from "tailwind-merge";
export interface FlowbiteToastToggleTheme {
  base: string;
  icon: string;
}
export interface ToastToggleProps extends ComponentProps<"button"> {
  theme?: DeepPartial<FlowbiteToastToggleTheme>;
  xIcon?: FC<ComponentProps<"svg">>;
  onDismiss?: () => void;
}
export const ToastToggle: FC<ToastToggleProps> = ({
  className,
  onClick,
  theme: customTheme = {},
  xIcon: XIcon = HiX,
  onDismiss,
  ...props
}) => {
  const theme = mergeDeep(useTheme().theme.toast.toggle, customTheme);
  const { duration, isClosed, isRemoved, setIsClosed, setIsRemoved } =
    useToastContext();

  const handleClick = (e: any) => {
    if (onClick) onClick(e);
    if (onDismiss) {
      onDismiss();
      return;
    }
    setIsClosed(!isClosed);
    setTimeout(() => setIsRemoved(!isRemoved), duration);
  };

  return (
    <button
      aria-label="Close"
      onClick={handleClick}
      type="button"
      className={twMerge(theme.base, className)}
    >
      <XIcon aria-hidden="true" className={theme.icon} />
    </button>
  );
};
