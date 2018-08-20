import React from 'react';
import PropTypes from 'prop-types';

import CellButton from 'components/CellButton';

function Episode({
  styleClass,
  currentEpisode,
  lastEpisode,
  handleChange,
  handleIncDec,
}) {
  return (
    <td className={styleClass}>
      <CellButton
        name="currentEpisode"
        operation="minus"
        handleIncDec={handleIncDec}
      />
      <input
        max={lastEpisode}
        name="currentEpisode"
        type="number"
        value={currentEpisode}
        onChange={handleChange}
      />
      <CellButton
        name="currentEpisode"
        operation="plus"
        handleIncDec={handleIncDec}
      /> / {lastEpisode}
    </td>
  );
}


Episode.propTypes = {
  styleClass: PropTypes.string.isRequired,
  currentEpisode: PropTypes.number.isRequired,
  lastEpisode: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleIncDec: PropTypes.func.isRequired,
};

export default Episode;
