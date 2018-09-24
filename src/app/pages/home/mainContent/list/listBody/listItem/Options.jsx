import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import SimpleDropdownComponent from 'components/SimpleDropdownComponent';

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

const placeholder = <i className="fas fa-ellipsis-v" />;
export default SimpleDropdownComponent(Options, 'td', placeholder);
