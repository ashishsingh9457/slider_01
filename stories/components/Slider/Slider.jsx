import React, { useState, useRef } from 'react';
import { getValueFromPosition, getPositionFromValue } from '../../utils/helpers';
import './Slider.css';

const Slider = ({
  type = 'Continuous Single',
  numSteps = 10,
  handleSize = 'size_24',
  onChange,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [sliderRange, setSliderRange] = useState([0, 0]);
  const [draggedHandle, setDraggedHandle] = useState(null);
  const containerRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const position = e.clientX - rect.left;
    const sliderWidth = rect.width;
    const handlePosition =
      type === 'Continuous Range' || type === 'Discreet Range'
        ? [
            getPositionFromValue(sliderRange[0], sliderWidth),
            getPositionFromValue(sliderRange[1], sliderWidth),
          ]
        : [getPositionFromValue(sliderValue, sliderWidth)];

    const closestHandle = handlePosition.reduce(
      (prev, curr, index) =>
        Math.abs(curr - position) < Math.abs(prev - position) ? curr : prev,
      Infinity
    );

    setDraggedHandle(handlePosition.indexOf(closestHandle));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggedHandle(null);
    if (type === 'Continuous Single' || type === 'Discreet Single') {
      onChange(sliderValue);
    } else {
      onChange(sliderRange);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const rect = containerRef.current.getBoundingClientRect();
    const position = e.clientX - rect.left;
    const sliderWidth = rect.width;

    if (type === 'Continuous Single') {
      const value = getValueFromPosition(position, sliderWidth);
      setSliderValue(value);
    } else if (type === 'Discreet Single') {
      const step = 100 / numSteps;
      const value = Math.round(getValueFromPosition(position, sliderWidth) / step) * step;
      setSliderValue(value);
    } else if (type === 'Continuous Range') {
      const range = [...sliderRange];

      if (draggedHandle === 0) {
        range[0] = Math.min(getValueFromPosition(position, sliderWidth), range[1] - 1);
      } else {
        range[1] = Math.max(getValueFromPosition(position, sliderWidth), range[0] + 1);
      }

      setSliderRange(range);
    } else {
      const step = 100 / numSteps;
      const range = [...sliderRange];

      if (draggedHandle === 0) {
        range[0] = Math.max(0, Math.round(getValueFromPosition(position, sliderWidth) / step) * step);
        range[0] = Math.min(range[0], range[1] - step);
      } else {
        range[1] = Math.min(100, Math.round(getValueFromPosition(position, sliderWidth) / step) * step);
        range[1] = Math.max(range[1], range[0] + step);
      }

      setSliderRange(range);
    }
  };

  const renderHandle = () => {
    const handleStyles = {
      left: type === 'Continuous Single' || type === 'Discreet Single' ? `${sliderValue}%` : `${sliderRange[0]}%`,
      width: handleSize === 'size_24' ? '24px' : '32px',
      height: handleSize === 'size_24' ? '24px' : '32px',
    };

    if (type === 'Continuous Range' || type === 'Discreet Range') {
      const rangeHandleStyles = {
        ...handleStyles,
        left: `${sliderRange[1]}%`,
      };

      return (
        <>
          <div
            className={`slider-handle ${isDragging && draggedHandle === 0 ? 'active' : ''}`}
            style={handleStyles}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          />
          <div
            className={`slider-handle ${isDragging && draggedHandle === 1 ? 'active' : ''}`}
            style={rangeHandleStyles}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          />
        </>
      );
    }

    return (
      <div
        className={`slider-handle ${isDragging ? 'active' : ''}`}
        style={handleStyles}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      />
    );
  };

  return (
    <div
      className="slider-container"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      ref={containerRef}
    >
      <div className="slider-track" />
      {renderHandle()}
    </div>
  );
};

export default Slider;