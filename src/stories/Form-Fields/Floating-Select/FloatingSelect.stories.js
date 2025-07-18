import { fn } from 'storybook/test';
import { FloatingSelect } from './FloatingSelect';

export default {
  title: 'Fields/FloatingSelect',
  component: FloatingSelect,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A floating label select component with customizable options and styling.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Label text that floats above the select'
    },
    value: {
      control: { type: 'text' },
      description: 'Current selected value'
    },
    required: {
      control: { type: 'boolean' },
      description: 'Whether the select is required'
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the select is disabled'
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes'
    },
    bgClassName: {
      control: { type: 'text' },
      description: 'Background classes for the label'
    },
    labelKey: {
      control: { type: 'text' },
      description: 'Key to use for option labels'
    },
    valueKey: {
      control: { type: 'text' },
      description: 'Key to use for option values'
    },
    options: {
      control: { type: 'object' },
      description: 'Array of options for the select'
    }
  },
  args: {
    onChange: fn(),
    label: 'Select an option',
    value: '',
    required: false,
    disabled: false,
    className: '',
    bgClassName: 'bg-white text-mainBlack',
    labelKey: 'label',
    valueKey: 'value',
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' }
    ]
  }
};

export const Default = {
  args: {
    label: 'Choose Country',
    value: '',
    options: [
      { label: 'United States', value: 'us' },
      { label: 'Canada', value: 'ca' },
      { label: 'United Kingdom', value: 'uk' },
      { label: 'Australia', value: 'au' }
    ]
  }
};

export const WithValue = {
  args: {
    label: 'Preferred Language',
    value: 'javascript',
    options: [
      { label: 'JavaScript', value: 'javascript' },
      { label: 'TypeScript', value: 'typescript' },
      { label: 'Python', value: 'python' },
      { label: 'Java', value: 'java' }
    ]
  }
};

export const Required = {
  args: {
    label: 'Required Field',
    value: '',
    required: true,
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
      { label: 'Maybe', value: 'maybe' }
    ]
  }
};

export const Disabled = {
  args: {
    label: 'Disabled Field',
    value: 'selected',
    disabled: true,
    options: [
      { label: 'Selected Option', value: 'selected' },
      { label: 'Other Option', value: 'other' }
    ]
  }
};

export const DisabledEmpty = {
  args: {
    label: 'Disabled Empty',
    value: '',
    disabled: true,
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' }
    ]
  }
};

export const CustomStyling = {
  args: {
    label: 'Custom Styled',
    value: '',
    className: 'font-bold text-blue-600',
    bgClassName: 'bg-blue-50 text-blue-800',
    options: [
      { label: 'Blue Option', value: 'blue' },
      { label: 'Green Option', value: 'green' },
      { label: 'Red Option', value: 'red' }
    ]
  }
};

export const CustomKeys = {
  args: {
    label: 'Custom Keys',
    value: '',
    labelKey: 'name',
    valueKey: 'id',
    options: [
      { name: 'John Doe', id: 1 },
      { name: 'Jane Smith', id: 2 },
      { name: 'Bob Johnson', id: 3 }
    ]
  }
};

export const ManyOptions = {
  args: {
    label: 'Many Options',
    value: '',
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
      { label: 'Option 4', value: '4' },
      { label: 'Option 5', value: '5' },
      { label: 'Option 6', value: '6' },
      { label: 'Option 7', value: '7' },
      { label: 'Option 8', value: '8' },
      { label: 'Option 9', value: '9' },
      { label: 'Option 10', value: '10' }
    ]
  }
};

export const LongLabel = {
  args: {
    label: 'This is a very long label that might wrap or overflow',
    value: '',
    options: [
      { label: 'Short', value: 'short' },
      { label: 'Medium Length Option', value: 'medium' },
      { label: 'This is a very long option that might cause overflow', value: 'long' }
    ]
  }
};

export const NumberValues = {
  args: {
    label: 'Rating',
    value: '',
    options: [
      { label: '1 Star', value: 1 },
      { label: '2 Stars', value: 2 },
      { label: '3 Stars', value: 3 },
      { label: '4 Stars', value: 4 },
      { label: '5 Stars', value: 5 }
    ]
  }
};

export const EmptyOptions = {
  args: {
    label: 'No Options',
    value: '',
    options: []
  }
};