import { fn } from 'storybook/test';
import Snackbar from './Snackbar';

export default {
  title: 'Notification/Snackbar',
  component: Snackbar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    message: {
      control: { type: 'text' },
      description: 'The message to display in the snackbar',
    },
    open: {
      control: { type: 'boolean' },
      description: 'Whether the snackbar is open/visible',
    },
    timeout: {
      control: { type: 'number', min: 0, max: 10000, step: 500 },
      description: 'Auto-close timeout in milliseconds (0 to disable)',
    },
    actionLabel: {
      control: { type: 'text' },
      description: 'Label for the action button',
    },
    showCloseButton: {
      control: { type: 'boolean' },
      description: 'Whether to show the close button',
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes',
    },
  },
  args: { 
    onClose: fn(),
    onAction: fn(),
  },
};

export const Default = {
  args: {
    message: 'This is a default snackbar message',
    open: true,
    timeout: 0,
  },
};

export const WithAction = {
  args: {
    message: 'Message sent successfully',
    open: true,
    timeout: 0,
    actionLabel: 'UNDO',
  },
};

export const WithCloseButton = {
  args: {
    message: 'This snackbar has a close button',
    open: true,
    timeout: 0,
    showCloseButton: true,
  },
};

export const WithActionAndClose = {
  args: {
    message: 'Email archived',
    open: true,
    timeout: 0,
    actionLabel: 'UNDO',
    showCloseButton: true,
  },
};

export const LongMessage = {
  args: {
    message: 'This is a very long message that demonstrates how the snackbar handles longer text content gracefully',
    open: true,
    timeout: 0,
    actionLabel: 'RETRY',
  },
};

export const AutoClose = {
  args: {
    message: 'This message will auto-close after 3 seconds',
    open: true,
    timeout: 3000,
  },
};

export const CustomStyling = {
  args: {
    message: 'Custom styled snackbar',
    open: true,
    timeout: 0,
    actionLabel: 'VIEW',
    className: 'bottom-12',
  },
};