/** @type { import('@storybook/react-vite').StorybookConfig } */
import React from 'react'; // Import React to resolve the error

const config = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@storybook/addon-designs",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
};

export default config;
