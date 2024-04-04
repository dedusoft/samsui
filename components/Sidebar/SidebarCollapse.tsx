import {
  useId,
  type ComponentProps,
  type FC,
  type PropsWithChildren,
  type ReactElement,
  useState,
  useEffect,
} from "react";
import type { DeepPartial } from "../../helpers/deep-partial";
import type { SamsUIBoolean } from "../../SamsUITheme";
import type { SidebarItemProps } from "./SidebarItem";
import { HiChevronDown } from "react-icons/hi";
import { twMerge } from "tailwind-merge";
import { useSidebarContext } from "./SidebarContext";
import { mergeDeep } from "../../helpers/merge-deep";
import { useTheme } from "../../SamsUIThemeContext";
import { Tooltip } from "../Tooltip";
import { SidebarItemContext } from "./SidebarItemContext";
export interface SamsUISidebarCollapseTheme {
  button: string;
  icon: {
    base: string;
    open: SamsUIBoolean;
  };
  label: {
    base: string;
    icon: {
      base: string;
      open: SamsUIBoolean;
    };
  };
  list: string;
}
export interface SidebarCollapseProps
  extends PropsWithChildren,
    Pick<
      SidebarItemProps,
      "active" | "as" | "href" | "icon" | "label" | "labelColor"
    >,
    ComponentProps<"button"> {
  onClick?: ComponentProps<"button">["onClick"];
  open?: boolean;
  chevronIcon?: FC<ComponentProps<"svg">>;
  renderChevronIcon?: (
    theme: DeepPartial<SamsUISidebarCollapseTheme>,
    open: boolean
  ) => ReactElement;
  theme?: DeepPartial<SamsUISidebarCollapseTheme>;
}
// Sidebar when it is collapse
export const SidebarCollapse: FC<SidebarCollapseProps> = ({
  children,
  className,
  icon: Icon,
  label,
  chevronIcon: ChevronIcon = HiChevronDown,
  renderChevronIcon,
  open = false,
  theme: customTheme = {},
  ...props
}) => {
  const id = useId();
  const { isCollapsed } = useSidebarContext();
  const [isOpen, setOpen] = useState(open);
  const theme = mergeDeep(useTheme().theme.sidebar.collapse, customTheme);
  useEffect(() => setOpen(open), [open]);

  const Wrapper: FC<any> = ({ children }) => {
    return (
      <li>
        {isCollapsed && !isOpen ? (
          <Tooltip content={label} placement="right">
            {children}
          </Tooltip>
        ) : (
          children
        )}
      </li>
    );
  };

  return (
    <Wrapper>
      <button
        id={`samsui-sidebar-collapse-${id}`}
        onClick={() => setOpen(!isOpen)}
        title={label}
        type="button"
        className={twMerge(
            twMerge(theme.button, className)
        )}
        {...props}
      >
        {Icon && (
            <Icon aria-hidden ={true} className={ twMerge(
                theme.icon.base,
                theme.icon.open[isOpen ? "on" : "off"]
              )} />
        )}

        {isCollapsed ? (
            <span className="sr-only">{label}</span>
        ): (
            <>
                <span className={theme.label.base}>{label}</span>
                {renderChevronIcon ? (
                    renderChevronIcon(theme, isOpen)
                ) : (
                    <ChevronIcon aria-hidden={true} className={twMerge(
                        theme.label.icon.base,
                        theme.label.icon.open[isOpen ? "on" : "off"]
                      )}/>
                )}
            </>
        )}
      </button>

      <ul
        aria-labelledby={`samsui-sidebar-collapse-${id}`}
        hidden={!isOpen}
        className={theme.list}
      >
        <SidebarItemContext.Provider value={{ isInsideCollapse: true }} >
            {children}
        </SidebarItemContext.Provider>
      </ul>
    </Wrapper>
  );
};
