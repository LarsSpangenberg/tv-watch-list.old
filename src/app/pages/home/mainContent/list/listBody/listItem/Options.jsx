import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import CreateOptionsCell from 'components/CreateOptionsCell';

const Options = ({ addShow, removeShow }) => (
  <Fragment>
    <li>
      <button type="button">
        Add Row for this Title
      </button>
    </li>
    <li>
      <button type="button" onClick={addShow}>
        Add another Show
      </button>
    </li>
    <li>
      <button type="button" onClick={removeShow}>
        Remove this Show
      </button>
    </li>
  </Fragment>
);

Options.propTypes = {
  addShow: PropTypes.func.isRequired,
  removeShow: PropTypes.func.isRequired,
};

export default CreateOptionsCell(Options, 'td', 'fas fa-ellipsis-v');
