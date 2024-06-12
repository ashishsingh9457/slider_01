import React from 'react';
import Slider from '../components/Slider/Slider';

export default {
  title: 'Slider',
  component: Slider,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: [
          'Continuous Single',
          'Continuous Range',
          'Discreet Single',
          'Discreet Range',
        ],
      },
    },
    numSteps: {
      control: {
        type: 'number',
        min: 2,
        max: 10,
        step: 1,
      },
    },
    handleSize: {
      control: {
        type: 'radio',
        options: ['size_24', 'size_32'],
      },
    },
  },
};

const Template = (args) => (
  <Slider {...args} onChange={(value) => actions.logEvent('onChange', value)} />
);

export const ContinuousSingle = Template.bind({});
ContinuousSingle.args = {
  type: 'Continuous Single',
  handleSize: 'size_24',
};

export const ContinuousRange = Template.bind({});
ContinuousRange.args = {
  type: 'Continuous Range',
  handleSize: 'size_24',
};

export const DiscreetSingle = Template.bind({});
DiscreetSingle.args = {
  type: 'Discreet Single',
  numSteps: 5,
  handleSize: 'size_32',
};

export const DiscreetRange = Template.bind({});
DiscreetRange.args = {
  type: 'Discreet Range',
  numSteps: 5,
  handleSize: 'size_32',
};