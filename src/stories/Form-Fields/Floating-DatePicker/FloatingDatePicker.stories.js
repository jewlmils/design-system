import { fn } from 'storybook/test';
import FloatingDatePicker from './FloatingDatePicker';

export default {
  title: 'Fields/FloatingDatePicker',
  component: FloatingDatePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A floating label date picker component with calendar popup, date range validation, and responsive positioning.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Label text that floats above the input'
    },
    value: {
      control: { type: 'text' },
      description: 'Current date value in YYYY-MM-DD format'
    },
    onChange: {
      action: 'changed',
      description: 'Callback function called when date changes'
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the date picker is disabled'
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes for the container'
    },
    bgClassName: {
      control: { type: 'text' },
      description: 'Background classes for the floating label'
    },
    minDate: {
      control: { type: 'text' },
      description: 'Minimum selectable date in YYYY-MM-DD format'
    },
    maxDate: {
      control: { type: 'text' },
      description: 'Maximum selectable date in YYYY-MM-DD format'
    },
    forceDirection: {
      control: { type: 'select' },
      options: [null, 'top', 'bottom'],
      description: 'Force calendar to open in specific direction'
    },
    calendarClassName: {
      control: { type: 'text' },
      description: 'Additional CSS classes for the calendar popup'
    },
    inputMsg: {
      control: { type: 'text' },
      description: 'Message to display (legacy prop from original component)'
    }
  },
  args: {
    onChange: fn(),
    label: 'Select Date',
    value: '',
    disabled: false,
    className: '',
    bgClassName: 'bg-white text-gray-900',
    forceDirection: null,
    calendarClassName: ''
  }
};

export const Default = {
  args: {
    label: 'Birth Date',
    value: ''
  }
};

export const WithValue = {
  args: {
    label: 'Event Date',
    value: '2024-12-25'
  }
};

export const WithMinMaxDates = {
  args: {
    label: 'Appointment Date',
    value: '',
    minDate: '2024-01-01',
    maxDate: '2024-12-31'
  }
};

export const FutureOnly = {
  args: {
    label: 'Future Event',
    value: '',
    minDate: new Date().toISOString().split('T')[0] // Today's date
  }
};

export const PastOnly = {
  args: {
    label: 'Historical Date',
    value: '',
    maxDate: new Date().toISOString().split('T')[0] // Today's date
  }
};

export const Disabled = {
  args: {
    label: 'Disabled Date',
    value: '2024-01-15',
    disabled: true
  }
};

export const DisabledEmpty = {
  args: {
    label: 'Disabled Empty',
    value: '',
    disabled: true
  }
};

export const ForceOpenTop = {
  args: {
    label: 'Opens Above',
    value: '',
    forceDirection: 'top'
  },
  parameters: {
    docs: {
      description: {
        story: 'Forces the calendar to open above the input field regardless of available space.'
      }
    }
  }
};

export const ForceOpenBottom = {
  args: {
    label: 'Opens Below',
    value: '',
    forceDirection: 'bottom'
  },
  parameters: {
    docs: {
      description: {
        story: 'Forces the calendar to open below the input field regardless of available space.'
      }
    }
  }
};

export const CustomStyling = {
  args: {
    label: 'Custom Styled',
    value: '',
    className: 'border-blue-500',
    bgClassName: 'bg-blue-50 text-blue-800',
    calendarClassName: 'shadow-xl border-blue-300'
  }
};

export const LongLabel = {
  args: {
    label: 'This is a very long label that demonstrates text wrapping behavior',
    value: ''
  }
};

export const DateRangeExample = {
  args: {
    label: 'Conference Date',
    value: '',
    minDate: '2024-06-01',
    maxDate: '2024-06-30'
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with a restricted date range - only dates in June 2024 are selectable.'
      }
    }
  }
};

export const WithCurrentDate = {
  args: {
    label: 'Today\'s Date',
    value: new Date().toISOString().split('T')[0]
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the date picker with today\'s date pre-selected.'
      }
    }
  }
};