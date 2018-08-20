import React from 'react';
import PropTypes from 'prop-types';

import CellButton from 'components/CellButton';

function Season({
  styleClass,
  currentSeason,
  handleChange,
  handleIncDec,
}) {
  return (
    <td className={styleClass}>
      <CellButton
        name="currentSeason"
        operation="minus"
        handleIncDec={handleIncDec}
      />
      <input
        name="currentSeason"
        type="number"
        value={currentSeason}
        onChange={handleChange}
      />
      <CellButton
        name="currentSeason"
        operation="plus"
        handleIncDec={handleIncDec}
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
