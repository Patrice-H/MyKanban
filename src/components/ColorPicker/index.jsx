import reactCSS from 'reactcss';
import { SketchPicker } from 'react-color';
import { useState } from 'react';
import { convertColor } from '../../utils/functions';

const ColorPicker = (props) => {
  const [pickerState, setPickerState] = useState({
    displayColorPicker: false,
    color: convertColor(
      props.dashboardForm.columns.backgrounds[props.columnId - 1]
    ),
  });
  const setDashboardForm = props.setDashboardForm;

  const handleClick = () => {
    setPickerState({
      ...pickerState,
      displayColorPicker: !pickerState.displayColorPicker,
    });
  };

  const handleClose = () => {
    setPickerState({
      ...pickerState,
      displayColorPicker: false,
    });
  };

  const handleChange = (color) => {
    let backgrounds = [...props.dashboardForm.columns.backgrounds];
    backgrounds[
      props.columnId - 1
    ] = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
    setPickerState({
      ...pickerState,
      color: color.rgb,
    });

    setDashboardForm({
      dashboard: props.dashboardForm.dashboard,
      columns: {
        ...props.dashboardForm.columns,
        backgrounds,
      },
    });
  };

  const styles = reactCSS({
    default: {
      color: {
        width: '40px',
        height: '40px',
        borderRadius: '3px',
        background: `rgba(${pickerState.color.r}, ${pickerState.color.g}, ${pickerState.color.b}, ${pickerState.color.a})`,
      },
      swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '3px',
        boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.23)',
        display: 'inline-block',
        cursor: 'pointer',
      },
      popover: {
        position: 'absolute',
        zIndex: '2',
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
    },
  });

  return (
    <div>
      <div style={styles.swatch} onClick={handleClick}>
        <div
          id={`color-picker-column-${props.columnId}`}
          style={styles.color}
          title="Definissez la couleur de fond"
        />
      </div>
      {pickerState.displayColorPicker ? (
        <div style={styles.popover}>
          <div style={styles.cover} onClick={handleClose} />
          <SketchPicker color={pickerState.color} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  );
};

export default ColorPicker;
