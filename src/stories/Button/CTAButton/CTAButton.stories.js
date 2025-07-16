import { fn } from 'storybook/test';

import { CTAButton } from './CTAButton';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Buttons/CTAButton',
  component: CTAButton,
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
      options: ['primary', 'secondary'],
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
export const Primary = {
  args: {
    variant: 'primary',
    children: 'Get Started',
  },
};

export const Secondary = {
  args: {
    variant: 'secondary',
    children: 'Learn More',
  },
};

export const Large = {
  args: {
    size: 'large',
    variant: 'primary',
    children: 'Large Button',
  },
};

export const Small = {
  args: {
    size: 'small',
    variant: 'primary',
    children: 'Small Button',
  },
};

export const Disabled = {
  args: {
    variant: 'primary',
    disabled: true,
    children: 'Disabled Button',
  },
};

export const Submit = {
  args: {
    variant: 'primary',
    type: 'submit',
    children: 'Submit Form',
  },
};

export const CustomClass = {
  args: {
    variant: 'primary',
    className: "shadow-lg border-2 border-yellow-500",
    children: 'Custom Styled',
  },
};