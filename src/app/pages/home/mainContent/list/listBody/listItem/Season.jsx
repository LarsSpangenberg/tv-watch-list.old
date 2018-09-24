import React from 'react';
import PropTypes from 'prop-types';

import CellButton from 'components/CellButton';

function Season({
  styleClass,
  currentSeason,
  handleChange,
  handleIncDec,
}) {
  const inputWidth = { width: `${currentSeason.toString().length * 10}px` };
  return (
    <td className={styleClass}>
      <CellButton
        name="currentSeason"
        operation="minus"
        clickHandler={handleIncDec}
      />
      <input
        style={inputWidth}
        name="currentSeason"
        min="1"
        type="number"
        value={parseInt(currentSeason)}
        onChange={handleChange}
      />
      <CellButton
        name="currentSeason"
        operation="plus"
        clickHandler={handleIncDec}
      />
    </td>
  );
}

Season.propTypes = {
  styleClass: PropTypes.string.isRequired,
  currentSeason: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleIncDec: PropTypes.func.isRequired,
};

export default Season;
