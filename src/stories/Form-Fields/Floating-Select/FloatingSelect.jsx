import React, { useState, useId } from "react";
import PropTypes from "prop-types";

export const FloatingSelect = ({
    label,
    value,
    onChange = () => {},
    required = false,
    options = [],
    disabled = false,
    className = "",
    bgClassName = "bg-white text-mainBlack",
    labelKey = "label",
    valueKey = "value",
    id,
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = value && value.toString().length > 0;
    const shouldFloat = isFocused || hasValue;
    const generatedId = useId();
    const selectId = id || generatedId;

    const handleFocus = () => {
        if (!disabled) {
            setIsFocused(true);
        }
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const disabledStyles = disabled
        ? "text-gray-400 cursor-not-allowed border-gray-400"
        : "border-mainBlack text-mainBlack";

    const disabledLabelStyles = disabled
        ? "text-gray-500"
        : shouldFloat
        ? "text-carbon"
        : "text-mainBlack";

    return (
        <div className="relative w-full min-w-[300px]">
            <select
                id={selectId}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                disabled={disabled}
                required={required}
                aria-label={label}
                {...props}
                className={`w-full min-w-[300px] rounded-md px-[20px] pt-5 pb-3 border-2 outline-none appearance-none bg-transparent text-base ${disabledStyles} ${className}`}
            >
                <option value="" disabled hidden className={className}></option>
                {options.map((option, index) => (
                    <option
                        key={option[valueKey] ?? index}
                        value={option[valueKey]}
                        className={className}
                    >
                        {option[labelKey]}
                    </option>
                ))}
            </select>
            <label
                htmlFor={selectId}
                className={`absolute left-[20px] transition-all duration-300 ease-in-out px-1 pointer-events-none ${
                    shouldFloat
                        ? "top-[-8px] text-[14px] translate-y-0"
                        : "top-1/2 -translate-y-1/2 text-base"
                } ${disabledLabelStyles} ${bgClassName} ${className}`}
            >
                {label}
            </label>
        </div>
    );
};

FloatingSelect.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    required: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.object),
    disabled: PropTypes.bool,
    className: PropTypes.string,
    bgClassName: PropTypes.string,
    labelKey: PropTypes.string,
    valueKey: PropTypes.string,
    id: PropTypes.string,
    "aria-label": PropTypes.string,
    "aria-describedby": PropTypes.string,
};

export default FloatingSelect;