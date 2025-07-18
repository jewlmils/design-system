import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import PropTypes from 'prop-types';

// Mock Snackbar Context for Storybook compatibility
const SnackbarContext = createContext();

const SnackbarProvider = ({ children }) => {
    const [snackbar, setSnackbar] = useState({ open: false, message: '', actionLabel: '', timeout: 3000, showCloseButton: false });

    const showSnackbar = (config) => {
        setSnackbar({ ...config, open: true });
    };

    const hideSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    return (
        <SnackbarContext.Provider value={{ showSnackbar, hideSnackbar }}>
            {children}
            <Snackbar
                message={snackbar.message}
                open={snackbar.open}
                onClose={hideSnackbar}
                timeout={snackbar.timeout}
                actionLabel={snackbar.actionLabel}
                showCloseButton={snackbar.showCloseButton}
            />
        </SnackbarContext.Provider>
    );
};

const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context) {
        // Fallback for when context is not available
        return {
            showSnackbar: (config) => console.log('Snackbar:', config.message),
            hideSnackbar: () => console.log('Snackbar hidden')
        };
    }
    return context;
};

// Snackbar component
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
            className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[344px] max-w-[90%] ${className}`}
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
                        <span className="text-lg leading-none">×</span>
                    </button>
                )}
            </div>
        </div>
    );
};

// Main FloatingAutocomplete component
function FloatingAutocomplete({
    suggestions = [],
    label = "Select",
    type,
    className = "",
    selected = [],
    onChange,
    renderTag,
    renderSuggestion,
    placeholder = "",
    required = false,
    name = "",
    maxSelected = Infinity,
    inputMsg = "",
    ...props
}) {
    const [query, setQuery] = useState("");
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [selectedTags, setSelectedTags] = useState(selected);
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef(null);
    const { showSnackbar } = useSnackbar();

    const getItemValue = (item) => typeof item === 'string' ? item : item.name;

    useEffect(() => {
        if (selectedTags.length >= maxSelected && maxSelected !== Infinity) {
            showSnackbar({
                message: inputMsg || `Select up to ${maxSelected} item(s) only`,
                actionLabel: "",
                timeout: 3000,
                showCloseButton: true,
            });
        }
    }, [inputMsg, selectedTags.length, maxSelected, showSnackbar]);

    useEffect(() => {
        const lowerQuery = query.toLowerCase();
        const filtered = suggestions.filter(item => {
            const value = getItemValue(item);
            return value?.toLowerCase().includes(lowerQuery) && !selectedTags.includes(item);
        });
        setFilteredSuggestions(filtered);
    }, [query, selectedTags, suggestions]);

    useEffect(() => {
        if (typeof onChange === 'function') {
            onChange(selectedTags);
        }
    }, [selectedTags, onChange]);

    const handleAddTag = (tag) => {
        if (selectedTags.length >= maxSelected) return;
        setSelectedTags([...selectedTags, tag]);
        setQuery("");
    };

    const handleRemoveTag = (tag) => {
        setSelectedTags(selectedTags.filter(t => t !== tag));
    };

    const handleKeyDown = (e) => {
        if (e.key === "Backspace" && query === "" && selectedTags.length > 0) {
            setSelectedTags(prev => prev.slice(0, -1));
        }
    };

    const hasContent = isFocused || query || selectedTags.length > 0;

    return (
        <div className={`relative ${className}`}>
            <label
                htmlFor={name}
                className={`absolute left-4 px-1 transition-all duration-200 z-10 bg-anti_flash_white pointer-events-none
                    ${hasContent 
                        ? "top-[-8px] text-xs text-planetary_blue font-medium" 
                        : "top-1/2 -translate-y-1/2 text-sm text-gray-500"
                    }
                `}
            >
                {label}
            </label>

            <div
                className={`w-full px-4 py-3 pt-4 border-2 rounded-md bg-transparent relative z-0 transition-all min-h-[56px]
                    ${isFocused ? "border-planetary_blue" : "border-gray-300"}`}
                onClick={() => inputRef.current?.focus()}
            >
                <div className="flex flex-wrap items-center gap-2 max-h-32 overflow-y-auto overflow-x-hidden pr-2">
                    {selectedTags.map(tag =>
                        renderTag ? (
                            renderTag(tag, () => handleRemoveTag(tag))
                        ) : (
                            <span
                                key={getItemValue(tag)}
                                className="flex items-center max-w-full bg-blue-100 text-planetary_blue px-2 py-1 rounded-full text-sm overflow-hidden whitespace-nowrap text-ellipsis"
                            >
                                <span className="truncate max-w-[120px] sm:max-w-[200px]">
                                    {getItemValue(tag)}
                                </span>
                                <button
                                    type="button"
                                    className="ml-1 text-planetary_blue hover:text-red-500 shrink-0"
                                    onClick={() => handleRemoveTag(tag)}
                                >
                                    ×
                                </button>
                            </span>
                        )
                    )}

                    <input
                        ref={inputRef}
                        type={type || 'text'}
                        name={name}
                        value={query}
                        placeholder={hasContent ? placeholder : ""}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        onKeyDown={handleKeyDown}
                        className="flex-grow outline-none border-none bg-transparent text-base focus:outline-none focus:ring-0 focus:border-transparent min-w-0"
                        {...props}
                    />
                </div>
            </div>

            {(isFocused || query) && (
                <ul className="absolute z-50 mt-1 w-full bg-anti_flash_white border rounded-md shadow-md max-h-60 overflow-auto">
                    {filteredSuggestions.length === 0 ? (
                        <li className="px-4 py-2 text-gray-500 text-sm truncate sm:text-base">
                            No results found
                        </li>
                    ) : (
                        filteredSuggestions.map((item) => (
                            <li
                                key={getItemValue(item)}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => handleAddTag(item)}
                                className="cursor-pointer px-4 py-2 hover:bg-blue-100 text-sm sm:text-base truncate"
                            >
                                {renderSuggestion ? renderSuggestion(item) : getItemValue(item)}
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
}

FloatingAutocomplete.propTypes = {
    /** Array of suggestions to display */
    suggestions: PropTypes.array,
    /** Label for the input field */
    label: PropTypes.string,
    /** Input type */
    type: PropTypes.string,
    /** Additional CSS classes */
    className: PropTypes.string,
    /** Array of pre-selected items */
    selected: PropTypes.array,
    /** Callback function when selection changes */
    onChange: PropTypes.func,
    /** Custom function to render tags */
    renderTag: PropTypes.func,
    /** Custom function to render suggestions */
    renderSuggestion: PropTypes.func,
    /** Placeholder text for input */
    placeholder: PropTypes.string,
    /** Whether the field is required */
    required: PropTypes.bool,
    /** Name attribute for the input */
    name: PropTypes.string,
    /** Maximum number of items that can be selected */
    maxSelected: PropTypes.number,
    /** Custom message to show when max is reached */
    inputMsg: PropTypes.string,
};

// Wrapper component that provides context
const AutocompleteWithProvider = (props) => {
    return (
        <SnackbarProvider>
            <FloatingAutocomplete {...props} />
        </SnackbarProvider>
    );
};

AutocompleteWithProvider.propTypes = FloatingAutocomplete.propTypes;

export default AutocompleteWithProvider;
export { FloatingAutocomplete, SnackbarProvider, useSnackbar };