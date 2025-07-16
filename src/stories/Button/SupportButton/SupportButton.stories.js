import { fn } from 'storybook/test';

import { SupportButton } from './SupportButton';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Buttons/SupportButton',
  component: SupportButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['outline', 'filled', 'ghost'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    type: {
      control: { type: 'select' },
      options: ['button', 'submit'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    className: {
      control: { type: 'text' },
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Outline = {
  args: {
    variant: 'outline',
    children: 'Support',
  },
};

export const Filled = {
  args: {
    variant: 'filled',
    children: 'Get Help',
  },
};

export const Ghost = {
  args: {
    variant: 'ghost',
    children: 'Contact Support',
  },
};

export const Large = {
  args: {
    size: 'large',
    variant: 'outline',
    children: 'Large Support',
  },
};

export const Small = {
  args: {
    size: 'small',
    variant: 'outline',
    children: 'Small Support',
  },
};

export const Disabled = {
  args: {
    variant: 'outline',
    disabled: true,
    children: 'Disabled Support',
  },
};

export const Submit = {
  args: {
    variant: 'outline',
    type: 'submit',
    children: 'Submit Support Request',
  },
};

export const CustomClass = {
  args: {
    variant: 'outline',
    className: 'shadow-lg ring-2 ring-blue-200',
    children: 'Custom Styled',
  },
};