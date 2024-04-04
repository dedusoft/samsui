import {
  useId,
  type ComponentProps,
  type ElementType,
  type FC,
  type PropsWithChildren,
  useLayoutEffect,
} from "react";
import type { DeepPartial } from "../../helpers/deep-partial";
import { mergeDeep } from "../../helpers/merge-deep";
import { useTheme } from "../../SamsUIThemeContext";
import { useModalContext } from "./ModalContext";
import { twMerge } from "tailwind-merge";
import { HiOutlineX } from "react-icons/hi";
export interface SamsUIModalHeaderTheme {
  base: string;
  popup: string;
  title: string;
  close: {
    base: string;
    icon: string;
  };
}
export interface ModalHeaderProps
  extends PropsWithChildren<ComponentProps<"div">> {
  as?: ElementType;
  theme?: DeepPartial<SamsUIModalHeaderTheme>;
}
export const ModalHeader: FC<ModalHeaderProps> = ({
  as: Component = "h3",
  children,
  className,
  theme: customTheme = {},
  id,
  ...props
}) => {
  const innerHeaderId = useId();
  const headerId = id || innerHeaderId;
  const theme = mergeDeep(useTheme().theme.modal.header, customTheme);
  const { popup, onClose, setHeaderId } = useModalContext();
  useLayoutEffect(() => {
    setHeaderId(headerId);
    return () => setHeaderId(undefined);
  }, [headerId, setHeaderId]);

  return (
    <div className={twMerge(theme.base, popup && theme.popup, className)} {...props} >
        <Component className={theme.title} id={headerId}>{children}</Component>
        <button className={theme.close.base} type="button" onClick={onClose}>
            <HiOutlineX className={theme.close.icon} />
        </button>
    </div>
  );
};
