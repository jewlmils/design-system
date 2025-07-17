import { fn } from 'storybook/test';
import { FloatingInput } from './FloatingInput';

export default {
  title: 'Fields/FloatingInput',
  component: FloatingInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A floating label input component with support for custom content and snackbar notifications.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      description: 'HTML input type'
    },
    label: {
      control: { type: 'text' },
      description: 'Label text that floats above the input'
    },
    value: {
      control: { type: 'text' },
      description: 'Current input value'
    },
    required: {
      control: { type: 'boolean' },
      description: 'Whether the input is required'
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the input is disabled'
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes for the label'
    },
    bgClassName: {
      control: { type: 'text' },
      description: 'Background classes for the label'
    },
    inputMsg: {
      control: { type: 'text' },
      description: 'Message to show in snackbar when component mounts'
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text'
    }
  },
  args: {
    onChange: fn(),
    type: 'text',
    label: 'Enter your text',
    value: '',
    required: false,
    disabled: false,
    className: '',
    bgClassName: 'bg-white text-midnight'
  }
};

export const Default = {
  args: {
    type: 'text',
    label: 'Full Name',
    value: ''
  }
};

export const WithValue = {
  args: {
    type: 'text',
    label: 'Email Address',
    value: 'john@example.com'
  }
};

export const EmailInput = {
  args: {
    type: 'email',
    label: 'Email Address',
    value: '',
    required: true
  }
};

export const PasswordInput = {
  args: {
    type: 'password',
    label: 'Password',
    value: '',
    required: true
  }
};

export const NumberInput = {
  args: {
    type: 'number',
    label: 'Age',
    value: ''
  }
};

export const Required = {
  args: {
    type: 'text',
    label: 'Required Field',
    value: '',
    required: true
  }
};

export const Disabled = {
  args: {
    type: 'text',
    label: 'Disabled Field',
    value: 'Cannot edit this',
    disabled: true
  }
};

export const DisabledEmpty = {
  args: {
    type: 'text',
    label: 'Disabled Empty',
    value: '',
    disabled: true
  }
};

export const CustomStyling = {
  args: {
    type: 'text',
    label: 'Custom Styled',
    value: '',
    className: 'font-bold text-blue-600',
    bgClassName: 'bg-blue-50 text-blue-800'
  }
};

export const WithSnackbarMessage = {
  args: {
    type: 'text',
    label: 'Field with Message',
    value: '',
    inputMsg: 'This field will show a snackbar message!'
  }
};

export const WithCustomContent = {
  args: {
    label: 'Custom Content',
    customContent: 'This is custom content inside the input'
  }
};

export const CustomContentDisabled = {
  args: {
    label: 'Disabled Custom Content',
    disabled: true,
    customContent: 'This custom content is disabled'
  }
};

export const LongLabel = {
  args: {
    type: 'text',
    label: 'This is a very long label that might wrap or overflow',
    value: ''
  }
};