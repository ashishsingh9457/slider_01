export const getValueFromPosition = (position, sliderWidth) => {
  const percentage = (position / sliderWidth) * 100;
  return percentage;
};

export const getPositionFromValue = (value, sliderWidth) => {
  const position = (value / 100) * sliderWidth;
  return (position / sliderWidth) * 100;
};