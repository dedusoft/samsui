import React, { useState } from "react";

interface AccordionProps {
  children: React.ReactNode;
}

interface PanelProps {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

interface TitleProps {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

interface ContentProps {
  children: React.ReactNode;
  isActive?: boolean;
}



const Panel: React.FC<PanelProps> = ({ isActive, onClick,children }) => {
  return <>{children}</>;
};

const Title: React.FC<TitleProps> = ({ children, isActive, onClick }) => {
  return (
    <button
      type="button"
      className={`${
        isActive ? "font-bold" : "font-medium"
      } w-full p-5 text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800`}
      onClick={onClick}
    >
      <span>{children}</span>
      <svg
        data-accordion-icon
        className={`w-3 h-3 rotate-180 shrink-0 ${
          isActive ? "transform rotate-0" : ""
        }`}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 6"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5 5 1 1 5"
        />
      </svg>
    </button>
  );
};

const Content: React.FC<ContentProps> = ({ children, isActive }) => {
  return (
    <div
      className={`${
        isActive ? "block" : "hidden"
      } p-5 border border-b-0 border-gray-200 dark:border-gray-700`}
    >
      {children}
    </div>
  );
};

const Accordion: React.FC<AccordionProps> & {
  Panel: React.FC<PanelProps>;
  Title: React.FC<TitleProps>;
  Content: React.FC<ContentProps>;
} = ({ children }) => {
  const [activePanel, setActivePanel] = useState<number | null>(null);

  const handleTitleClick = (index: number) => {
    if (activePanel === index) {
      // Clicking the active panel should close it
      setActivePanel(null);
    } else {
      setActivePanel(index);
    }
  };

  return (
    <div
      className="accordion"
      id="accordion-collapse"
      data-accordion="collapse"
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement<any>(child, {
            isActive: activePanel === index,
            onClick: () => handleTitleClick(index),
          });
        }
        return child;
      })}
    </div>
  );
};

Accordion.Panel = Panel;
Accordion.Title = Title;
Accordion.Content = Content;

export default Accordion;