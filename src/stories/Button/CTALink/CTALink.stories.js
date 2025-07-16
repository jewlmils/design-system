import { fn } from 'storybook/test';

import { CTALink } from './CTALink';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Buttons/CTALink',
  component: CTALink,
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
      options: ['primary', 'secondary', 'outline'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    target: {
      control: { type: 'select' },
      options: ['_blank', '_self', '_parent', '_top'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    href: {
      control: { type: 'text' },
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
    href: 'https://google.com',
    children: 'Get Started',
  },
};

export const Secondary = {
  args: {
    variant: 'secondary',
    href: 'https://google.com',
    children: 'Learn More',
  },
};

export const Outline = {
  args: {
    variant: 'outline',
    href: 'https://google.com',
    children: 'Contact Us',
  },
};

export const Large = {
  args: {
    size: 'large',
    variant: 'primary',
    href: 'https://google.com',
    children: 'Large Link',
  },
};

export const Small = {
  args: {
    size: 'small',
    variant: 'primary',
    href: 'https://google.com',
    children: 'Small Link',
  },
};

export const Disabled = {
  args: {
    variant: 'primary',
    disabled: true,
    href: 'https://google.com',
    children: 'Disabled Link',
  },
};

export const ExternalLink = {
  args: {
    variant: 'primary',
    href: 'https://google.com',
    target: '_blank',
    children: 'Open in New Tab',
  },
};

export const CustomClass = {
  args: {
    variant: 'primary',
    href: 'https://google.com',
    className: 'shadow-lg ring-2 ring-blue-200',
    children: 'Custom Styled',
  },
};