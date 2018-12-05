import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as selectors from 'app/store';
import * as handleColumns from 'modules/ui';

import columns from 'utils/hideableColumns';
import { formatHeader } from 'utils/capitalizeWord';

import styles from './ListHead.scss';
import ColumnSettings from './listHead/ColumnSettings';

const mapStateToProps = state => ({
  hidden: selectors.getNumberOfHiddenColumns(state),
  isHidden: name => selectors.isColumnHidden(state, name),
});

class ListHead extends Component {
  constructor(props) {
    super(props);
    this.toggleColumn = this.toggleColumn.bind(this);
    this.showAll = this.showAll.bind(this);
  }

  toggleColumn(e) {
    e.preventDefault();
    const { value } = e.target;
    const {
      hidden,
      dispatch,
    } = this.props;
    if (hidden < 5) {
      dispatch(handleColumns.toggleListColumn(value));
    }
  }

  showAll() {
    const { dispatch } = this.props;
    dispatch(handleColumns.showAll());
  }


  render() {
    const { isHidden, hidden } = this.props;
    const styleClass = name => [
      styles[name],
      styles.hideable,
      isHidden(name) ? styles.hidden : '',
    ].join(' ');

    // create hideable header cells ---------------------------------------
    const headers = columns.map(header => (
      <th
        key={`list_header_${header}`}
        className={styleClass(header)}
      >
        <button
          value={header}
          type="button"
          onClick={this.toggleColumn}
        >
          {formatHeader(header)}
          <i className="fas fa-eye-slash" />
        </button>
      </th>
    ));

    return (
      <thead className={styles.listHead}>
        <tr>
          {headers}
          <ColumnSettings
            styleClass={styles.settings}
            showAll={this.showAll}
            hidden={hidden}
          />
        </tr>
      </thead>
    );
  }
}

ListHead.propTypes = {
  hidden: PropTypes.number.isRequired,
  isHidden: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(ListHead);
