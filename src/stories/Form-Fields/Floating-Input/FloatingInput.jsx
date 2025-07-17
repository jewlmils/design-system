import React, { useState, useEffect, useId } from "react";
import PropTypes from "prop-types";

// mock snackbar hook for storybook
const useSnackbar = () => ({
  showSnackbar: ({ message, actionLabel, timeout, showCloseButton }) => {
    console.log("Snackbar:", { message, actionLabel, timeout, showCloseButton });
  },
});

/** a floating label input component with support for custom content and notifications */
export const FloatingInput = ({
  className = "",
  bgClassName = "bg-white text-midnight",
  type = "text",
  label,
  value = "",
  onChange = () => {},
  required = false,
  inputMsg,
  customContent,
  disabled = false,
  id,
  placeholder,
  ...props
}) => {
  const { showSnackbar } = useSnackbar();
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.toString().length > 0;
  const shouldFloat = isFocused || hasValue;
  const generatedId = useId();
  const inputId = id || generatedId;

  useEffect(() => {
    if (inputMsg) {
      showSnackbar({
        message: inputMsg,
        actionLabel: "",
        timeout: 3000,
        showCloseButton: true,
      });
    }
  }, [inputMsg, showSnackbar]);

  const handleFocus = () => {
    if (!disabled) setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const disabledStyles = disabled
    ? "text-gray-400 cursor-not-allowed border-gray-400"
    : "border-midnight text-midnight";

  const disabledLabelStyles = disabled
    ? "text-gray-500"
    : shouldFloat
    ? "text-carbon"
    : "text-midnight";

  const disabledCustomContentStyles = disabled
    ? "border-gray-700 bg-gray-800"
    : "border-midnight";

  return (
    <div className="relative w-full">
      {customContent ? (
        <div
          className={`pt-6 pb-2 px-[15px] border-2 rounded-md ${disabledCustomContentStyles} ${
            disabled ? "cursor-not-allowed" : ""
          }`}
        >
          <label
            htmlFor={inputId}
            className={`absolute left-[15px] top-[-8px] text-[14px] px-1 ${bgClassName} ${className} ${
              disabled ? "text-gray-500" : "text-carbon"
            }`}
          >
            {label}
          </label>
          <div className={disabled ? "pointer-events-none text-gray-400" : ""}>
            {customContent}
          </div>
        </div>
      ) : (
        <>
          <input
            id={inputId}
            type={type}
            required={required}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            placeholder={placeholder || label}
            aria-label={label}
            {...props}
            className={`w-full rounded-md px-[15px] pt-4 pb-2 border-2 outline-none shadow-none bg-white placeholder-gray-400 focus:placeholder-transparent [&:-webkit-autofill]:shadow-[0_0_0_30px_white_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:inherit] [&:-webkit-autofill]:transition-[background-color] [&:-webkit-autofill]:duration-[5000s] ${disabledStyles}`}
          />
          <label
            htmlFor={inputId}
            className={`absolute left-[15px] pointer-events-none transition-all duration-300 ease-in-out px-1 ${bgClassName} ${
              shouldFloat ? "top-[-8px] text-[14px] translate-y-0" : "top-1/2 -translate-y-1/2"
            } ${disabledLabelStyles} ${className}`}
          >
            {label}
          </label>
        </>
      )}
    </div>
  );
};

FloatingInput.propTypes = {
  className: PropTypes.string,
  bgClassName: PropTypes.string,
  type: PropTypes.oneOf([
    "text",
    "email",
    "password",
    "number",
    "tel",
    "url",
    "search",
    "date",
    "time",
    "datetime-local",
  ]),
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  required: PropTypes.bool,
  inputMsg: PropTypes.string,
  customContent: PropTypes.node,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  "aria-label": PropTypes.string,
  "aria-describedby": PropTypes.string,
};

export default FloatingInput;
