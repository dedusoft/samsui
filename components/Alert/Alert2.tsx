import React, { useState } from "react";

interface AlertType {
  type?: "success" | "danger" | "warning" | "info";
  color?: string;
  title?: string;
}

interface AlertProps {
  type?: AlertType["type"];
  message?: string;
  icon?: boolean;
  onClick?: () => void;
  rounded?: boolean;
  bordered?: boolean;
  withBorderAccent?: boolean;
  additionalContent?: string;
}

const Alert: React.FC<AlertProps> = ({
  type,
  message,
  icon: IconComponent,
  onClick, // Todo: perform something after the alert btn is clicked
  rounded, // Todo: make the alert rounded or not
  bordered,
  withBorderAccent, // Todo: give an accentborder to the alert
  additionalContent,
}) => {
  const [isAlertVisible, setIsAlertVisible] = useState(true);

  // array of alert types
  const alertTypes: AlertType[] = [
    { type: "success", color: "green", title: "Success" },
    { type: "danger", color: "red", title: "Error" },
    { type: "warning", color: "yellow", title: "Warning" },
    { type: "info", color: "blue", title: "Info" },
    { color: "dark", title: "Messsage" },
  ];

  // Get the color and title base on the type passed
  const { color, title } =
    alertTypes.find((alert) => alert.type === type) || {};

  // Defined a border in case 'bordered is pass as argument'
  const hasBorder = bordered
    ? `border border-${color}-300 dark:border-${color}-800`
    : "";

  // give a color to the card and its content
  const isColored = color
    ? `bg-${color}-50 text-${color}-800 dark:bg-gray-800 dark:text-${color}-400`
    : "";

  // handler to view more info about the alert
  const handleViewMore = () => {};

  const handleAlertDismissed = () => {
    setIsAlertVisible(false);
  };

  // An alert that contains additional contents
  if (additionalContent) {
    return (
      <>
        {isAlertVisible && (
          <div
            className={`p-4 mb-4 rounded-lg ${isColored} ${hasBorder}`}
            role="alert"
          >
            <div className="flex items-center">
              <svg
                className="flex-shrink-0 w-4 h-4 mr-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">{title}</span>
              <h3 className="text-lg font-medium">{message}</h3>
            </div>
            <div className="mt-2 mb-4 text-sm">{additionalContent}</div>
            <div className="flex">
              <button
                type="button"
                onClick={handleViewMore}
                className={`text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
              >
                <svg
                  className="-ml-0.5 mr-2 h-3 w-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 14"
                >
                  <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                </svg>
                View more
              </button>
              <button
                type="button"
                onClick={handleAlertDismissed}
                className="text-blue-800 bg-transparent border border-blue-800 hover:bg-blue-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-blue-600 dark:border-blue-600 dark:text-blue-400 dark:hover:text-white dark:focus:ring-blue-800"
                data-dismiss-target="#alert-additional-content-1"
                aria-label="Close"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div
      className={`flex items-center p-4 mb-4 text-sm rounded-lg  ${isColored} ${hasBorder} `}
      role="alert"
    >
      {IconComponent && (
        <svg
          className="flex-shrink-0 inline w-4 h-4 mr-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
            fillRule="evenodd"
          />
        </svg>
      )}
      <span className="sr-only">{title}</span>
      <div>
        <span className="font-medium">{title} alert!</span> {message}
      </div>
    </div>
  );
};

export default Alert;
