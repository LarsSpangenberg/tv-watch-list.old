import React from 'react';
import PropTypes from 'prop-types';

import CellButton from 'components/CellButton';

const Episode = ({
  styleClass,
  currentEpisode,
  handleChange,
  handleIncDec,
}) => {
  const inputWidth = { width: `${currentEpisode.toString().length * 10}px` };
  return (
    <td className={styleClass}>
      <CellButton
        name="currentEpisode"
        operation="minus"
        clickHandler={handleIncDec}
      />
      <input
        style={inputWidth}
        min="1"
        name="currentEpisode"
        type="number"
        value={currentEpisode}
        onChange={handleChange}
      />
      <CellButton
        name="currentEpisode"
        operation="plus"
        clickHandler={handleIncDec}
      />
    </td>
  );
};


Episode.propTypes = {
  styleClass: PropTypes.string.isRequired,
  currentEpisode: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleIncDec: PropTypes.func.isRequired,
};


export default Episode;
