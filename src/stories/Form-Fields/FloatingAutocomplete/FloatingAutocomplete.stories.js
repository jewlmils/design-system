// FloatingAutoComplete.stories.js
import { fn } from 'storybook/test';
import AutocompleteWithProvider from './FloatingAutocomplete';

const simpleSuggestions = [
    'Apple',
    'Banana',
    'Cherry',
    'Date',
    'Elderberry',
    'Fig',
    'Grape',
    'Honeydew',
    'Kiwi',
    'Lemon'
];

export default {
    title: 'Fields/FloatingAutocomplete',
    component: AutocompleteWithProvider,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'A floating label autocomplete component with multi-select support, tag management, and snackbar notifications.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        suggestions: { 
            control: 'object',
            description: 'Array of suggestions to display in the dropdown'
        },
        label: { 
            control: 'text',
            description: 'Label text that floats above the input'
        },
        placeholder: { 
            control: 'text',
            description: 'Placeholder text for the input field'
        },
        maxSelected: { 
            control: 'number',
            description: 'Maximum number of items that can be selected'
        },
        required: { 
            control: 'boolean',
            description: 'Whether the field is required'
        },
        className: { 
            control: 'text',
            description: 'Additional CSS classes for the component'
        },
        inputMsg: { 
            control: 'text',
            description: 'Custom message to show in snackbar when max selection is reached'
        },
        selected: {
            control: 'object',
            description: 'Array of pre-selected items'
        },
        onChange: {
            action: 'changed',
            description: 'Callback function when selection changes'
        },
        name: {
            control: 'text',
            description: 'Name attribute for the input'
        },
        type: {
            control: 'text',
            description: 'Input type attribute'
        }
    },
    args: {
        onChange: fn(),
        label: 'Select Items',
        placeholder: 'Type to search...',
        suggestions: simpleSuggestions,
        selected: [],
        maxSelected: Infinity,
        required: false,
        className: '',
        inputMsg: '',
        name: '',
        type: 'text'
    }
};

export const Default = {
    args: {
        label: 'Select Fruits',
        placeholder: 'Type to search...',
        suggestions: simpleSuggestions
    }
};

export const WithPreSelected = {
    args: {
        label: 'Select Fruits',
        placeholder: 'Type to search...',
        suggestions: simpleSuggestions,
        selected: ['Apple', 'Banana']
    }
};

export const LimitedSelection = {
    args: {
        label: 'Select up to 3 fruits',
        placeholder: 'Type to search...',
        suggestions: simpleSuggestions,
        maxSelected: 3
    }
};

export const Required = {
    args: {
        label: 'Required Field',
        placeholder: 'Type to search...',
        suggestions: simpleSuggestions,
        required: true
    }
};

export const WithCustomMessage = {
    args: {
        label: 'Select up to 2 items',
        placeholder: 'Type to search...',
        suggestions: simpleSuggestions,
        maxSelected: 2,
        inputMsg: 'You can only select 2 items maximum!'
    }
};

export const LongSuggestionsList = {
    args: {
        label: 'Select Programming Languages',
        placeholder: 'Type to search...',
        suggestions: [
            'JavaScript', 'Python', 'Java', 'C++', 'C#', 'Ruby', 'Go', 'Rust',
            'TypeScript', 'PHP', 'Swift', 'Kotlin', 'Scala', 'R', 'MATLAB',
            'Perl', 'Haskell', 'Clojure', 'Erlang', 'Elixir', 'Dart', 'Lua'
        ]
    }
};