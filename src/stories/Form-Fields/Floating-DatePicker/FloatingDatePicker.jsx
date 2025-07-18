import React, { useState, useEffect, useRef } from "react";
import { format, addMonths, addYears, subMonths, subYears } from 'date-fns';

function FloatingDatePicker({
    className = "",
    label = "Date",
    value,
    onChange = () => { },
    inputMsg,
    bgClassName = "bg-white text-gray-900",
    minDate,
    maxDate,
    calendarClassName = "",
    forceDirection = "bottom", // Changed default to "bottom"
    disabled = false,
    ...props
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : null);
    const [displayDate, setDisplayDate] = useState(value ? new Date(value) : new Date());
    const [tempSelectedDate, setTempSelectedDate] = useState(null);
    const inputRef = useRef(null);
    const calendarRef = useRef(null);
    const [calendarPosition, setCalendarPosition] = useState({ top: 0, left: 0 });
    const [openDirection, setOpenDirection] = useState("bottom");

    // Normalize date to avoid time interference
    const normalizeDate = (date) => {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        return d;
    };

    // Handle input change
    const handleInputChange = (e) => {
        if (disabled) return;
        const date = new Date(e.target.value);
        if (!isNaN(date.getTime())) {
            setSelectedDate(normalizeDate(date));
            onChange(e.target.value);
        }
    };

    // Handle input focus
    const handleInputFocus = () => {
        if (disabled) return;
        setIsFocused(true);
    };

    // Handle input blur
    const handleInputBlur = () => {
        setIsFocused(false);
    };

    // Handle date selection from calendar
    const handleDateSelect = (date) => {
        if (disabled) return;
        const normalizedDate = normalizeDate(date);
        setTempSelectedDate(normalizedDate);
        setSelectedDate(normalizedDate);
    };

    // Handle navigation (prev/next month)
    const handleMonthChange = (direction) => {
        const newDate = direction === 'prev' ? subMonths(displayDate, 1) : addMonths(displayDate, 1);
        setDisplayDate(newDate);
    };

    // Handle navigation (prev/next year)
    const handleYearChange = (direction) => {
        const newDate = direction === 'prev' ? subYears(displayDate, 1) : addYears(displayDate, 1);
        setDisplayDate(newDate);
    };

    const handleConfirm = () => {
        if (tempSelectedDate) {
            const formatted = format(tempSelectedDate, 'yyyy-MM-dd');
            setSelectedDate(tempSelectedDate);
            onChange(formatted);
            setIsOpen(false);
        }
    };

    const handleCancel = () => {
        setTempSelectedDate(null);
        setIsOpen(false);
    };

    // Get days of the month to render in calendar
    const getDaysInMonth = () => {
        const date = new Date(displayDate);
        const year = date.getFullYear();
        const month = date.getMonth();

        const startOfMonth = new Date(year, month, 1);
        const endOfMonth = new Date(year, month + 1, 0);
        const startDay = startOfMonth.getDay();
        const endDay = endOfMonth.getDate();

        const totalDays = 35;
        const days = [];

        const prevMonthLastDay = new Date(year, month, 0).getDate();
        for (let i = startDay - 1; i >= 0; i--) {
            days.push({
                day: prevMonthLastDay - i,
                date: new Date(year, month - 1, prevMonthLastDay - i),
                currentMonth: false
            });
        }

        for (let i = 1; i <= endDay; i++) {
            days.push({
                day: i,
                date: new Date(year, month, i),
                currentMonth: true
            });
        }

        const nextDays = totalDays - days.length;
        for (let i = 1; i <= nextDays; i++) {
            days.push({
                day: i,
                date: new Date(year, month + 1, i),
                currentMonth: false
            });
        }

        return days;
    };

    const parsedMinDate = minDate ? normalizeDate(new Date(minDate)) : null;
    const parsedMaxDate = maxDate ? normalizeDate(new Date(maxDate)) : null;

    const isDateInRange = (date) => {
        return (
            (!parsedMinDate || date >= parsedMinDate) &&
            (!parsedMaxDate || date <= parsedMaxDate)
        );
    };

    const daysInMonth = getDaysInMonth();
    const monthName = format(displayDate, 'MMMM');
    const year = format(displayDate, 'yyyy');

    // Force bottom positioning for all calendars
    const setPosition = () => {
        if (inputRef.current) {
            const inputRect = inputRef.current.getBoundingClientRect();
            const calendarWidth = 320;
            const spacing = 8; // Space between input and calendar

            // Calculate horizontal position (prevent overflow)
            let leftPosition = inputRect.left;
            const rightEdge = leftPosition + calendarWidth;

            if (rightEdge > window.innerWidth) {
                leftPosition = window.innerWidth - calendarWidth - 10;
            }
            if (leftPosition < 10) {
                leftPosition = 10;
            }

            // Always position below the input field
            setCalendarPosition({
                top: inputRect.bottom + spacing + window.scrollY,
                left: leftPosition
            });

            setOpenDirection("bottom");
        }
    };

    useEffect(() => {
        if (isOpen) {
            setPosition();
            const handleResize = () => setPosition();
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [isOpen, forceDirection]);

    const formattedDate = selectedDate && !isNaN(selectedDate.getTime())
        ? format(selectedDate, 'yyyy-MM-dd')
        : "";

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isOpen &&
                calendarRef.current &&
                !calendarRef.current.contains(event.target) &&
                inputRef.current &&
                !inputRef.current.contains(event.target)
            ) {
                handleConfirm();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, tempSelectedDate]);

    // Check if a date is selected (for styling)
    const isDateSelected = (date) => {
        return tempSelectedDate &&
            tempSelectedDate.getTime() === normalizeDate(date).getTime();
    };

    const hasValue = selectedDate && !isNaN(selectedDate.getTime());
    const shouldFloat = hasValue || isOpen || isFocused;

    return (
        <>
            <div className={`relative w-full min-w-[30rem] min-h-[4.5rem] ${className}`}>
                {/* Input field with label and placeholder */}
                <input
                    type="text"
                    ref={inputRef}
                    value={formattedDate}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    placeholder=""
                    disabled={disabled}
                    className={`w-full rounded-md px-[15px] py-3 border-2 outline-none shadow-none bg-white placeholder-gray-400 focus:placeholder-transparent transition-all duration-200 overflow-x-auto whitespace-nowrap ${disabled
                        ? 'text-gray-400 cursor-not-allowed border-gray-400'
                        : 'border-gray-900 text-gray-900 focus:border-blue-500'
                        }`}
                    {...props}
                />


                <label
                    title={label}
                    className={`absolute left-[15px] max-w-[calc(100%-3.5rem)] pointer-events-none transition-all duration-200 ease-in-out px-1 ${bgClassName} ${shouldFloat
                        ? "top-[-8px] text-[12px] text-blue-600 whitespace-normal break-words"
                        : "top-[14px] text-[16px] truncate"
                        } ${disabled ? 'text-gray-500' : shouldFloat ? 'text-blue-600' : 'text-gray-700'}`}
                >
                    {label}
                </label>

                {/* Calendar Icon Button */}
                <button
                    className={`absolute right-[10px] top-[14px] rounded-full w-8 h-8 flex items-center justify-center bg-transparent transition-colors ${disabled ? 'cursor-not-allowed' : 'hover:bg-gray-100'
                        }`}
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    type="button"
                    disabled={disabled}
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={disabled ? 'text-gray-400' : 'text-gray-900'}
                    >
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                </button>


            </div>

            {/* Calendar popup */}
            {isOpen && (
                <div
                    ref={calendarRef}
                    className={`fixed z-50 border border-gray-300 shadow-2xl rounded-md ${bgClassName} ${calendarClassName}`}
                    style={{
                        top: `${calendarPosition.top}px`,
                        left: `${calendarPosition.left}px`,
                        width: '320px',
                        minWidth: '320px'
                    }}
                >
                    {/* Header with month/year navigation */}
                    <div className="flex align-middle w-full h-[64px]">
                        <div className="flex flex-row justify-around items-center w-1/2">
                            <button type="button" onClick={() => handleMonthChange('prev')} className="p-1 hover:bg-gray-100 rounded-full">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="15,18 9,12 15,6"></polyline>
                                </svg>
                            </button>
                            <span className="text-gray-900 text-[12px] font-medium">{monthName}</span>
                            <button type="button" onClick={() => handleMonthChange('next')} className="p-1 hover:bg-gray-100 rounded-full">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="9,18 15,12 9,6"></polyline>
                                </svg>
                            </button>
                        </div>

                        <div className="flex flex-row justify-around items-center w-1/2">
                            <button type="button" onClick={() => handleYearChange('prev')} className="p-1 hover:bg-gray-100 rounded-full">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="15,18 9,12 15,6"></polyline>
                                </svg>
                            </button>
                            <span className="text-gray-900 text-[12px] font-medium">{year}</span>
                            <button type="button" onClick={() => handleYearChange('next')} className="p-1 hover:bg-gray-100 rounded-full">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="9,18 15,12 9,6"></polyline>
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Calendar grid */}
                    <div className="grid grid-cols-7 px-[12px] gap-1">
                        {["S", "M", "T", "W", "T", "F", "S"].map((day, idx) => (
                            <div key={idx} className="text-center text-sm text-gray-600 font-medium p-2">{day}</div>
                        ))}
                        {daysInMonth.map(({ day, date, currentMonth }, idx) => (
                            <button
                                key={idx}
                                type="button"
                                disabled={!currentMonth || !isDateInRange(date)}
                                className={`p-2 w-9 h-9 text-center text-sm rounded-full transition-colors ${currentMonth && isDateInRange(date)
                                    ? `cursor-pointer ${isDateSelected(date)
                                        ? 'bg-blue-500 text-white'
                                        : 'text-gray-900 hover:bg-blue-100'
                                    }`
                                    : "text-gray-400 cursor-default"
                                    }`}
                                onClick={() => currentMonth && isDateInRange(date) && handleDateSelect(date)}
                            >
                                {day}
                            </button>
                        ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex px-[12px] py-[8px] h-[56px]">
                        <div className="flex gap-[8px] justify-end align-bottom w-full">
                            <button
                                type="button"
                                className="px-4 py-2.5 text-[12px] font-semibold text-blue-600 hover:bg-blue-50 rounded"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="px-4 py-2.5 text-[12px] font-semibold text-blue-600 hover:bg-blue-50 rounded"
                                onClick={handleConfirm}
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default FloatingDatePicker;