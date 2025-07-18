import React, { useEffect } from "react";
import PropTypes from 'prop-types';

const Snackbar = ({
    message = "This is a snackbar",
    open = false,
    onClose,
    timeout = 4000,
    actionLabel = "",
    onAction = null,
    className = "",
    showCloseButton = false,
}) => {
    useEffect(() => {
        if (open && timeout) {
            const timer = setTimeout(() => {
                onClose?.();
            }, timeout);
            return () => clearTimeout(timer);
        }
    }, [open, timeout, onClose]);

    if (!open) return null;

    const handleActionClick = () => {
        onAction?.();
        onClose?.();
    };

    return (
        <div
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[344px] max-w-[90%] ${className}`}
        >
            <div className="py-1 pl-4 pr-2 rounded shadow-lg flex items-center gap-4 min-h-[48px] bg-[#322F35] text-[#F5EFF7]">
                <p className="text-sm flex-grow">{message}</p>

                {actionLabel && (
                    <button
                        type="button"
                        onClick={handleActionClick}
                        className="text-sm h-10 py-2.5 px-3 rounded-full text-[#D0BCFF] hover:bg-[rgba(208,188,255,0.08)] min-w-[59px] transition-colors duration-200"
                    >
                        {actionLabel}
                    </button>
                )}

                {showCloseButton && (
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close snackbar"
                        className="w-10 h-10 flex items-center justify-center rounded-full text-[#F5EFF7] hover:bg-[rgba(255,255,255,0.08)] transition-colors duration-200"
                    >
                        {/* Using × symbol instead of material icons for better compatibility */}
                        <span className="text-lg leading-none">×</span>
                    </button>
                )}
            </div>
        </div>
    );
};

Snackbar.propTypes = {
    /** The message to display in the snackbar */
    message: PropTypes.string,
    /** Whether the snackbar is open/visible */
    open: PropTypes.bool,
    /** Function called when the snackbar should be closed */
    onClose: PropTypes.func,
    /** Auto-close timeout in milliseconds (0 to disable) */
    timeout: PropTypes.number,
    /** Label for the action button */
    actionLabel: PropTypes.string,
    /** Function called when the action button is clicked */
    onAction: PropTypes.func,
    /** Additional CSS classes */
    className: PropTypes.string,
    /** Whether to show the close button */
    showCloseButton: PropTypes.bool,
};

export default Snackbar;