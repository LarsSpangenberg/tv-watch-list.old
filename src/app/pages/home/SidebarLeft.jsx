import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as selectors from 'app/store';
import { changeStatus } from 'modules/status';
import { formatSpacedOutWords } from 'utils/capitalizeWord';

import styles from './SidebarLeft.scss';
import Status from './sidebarLeft/Status';
import Tags from './sidebarLeft/Tags';


const mapStateToProps = state => ({
  status: selectors.getActiveStatus(state),
});

class SidebarLeft extends Component {
  constructor(props) {
    super(props);
    this.changeStatus = this.changeStatus.bind(this);
  }

  changeStatus(e) {
    const { dispatch } = this.props;
    dispatch(changeStatus(e.target.value));
  }

  render() {
    const {
      status,
      handleActive,
      isActive,
    } = this.props;

    return (
      <aside className={`${styles.sidebar} ${isActive ? styles.active : ''}`}>


        <div className={styles.pulloutInner}>
          <div className={styles.brandBackdrop} />
          <div className={styles.content}>

            <div className={styles.status}>
              <div className={styles.label}>
                <h2>Status:</h2>
              </div>
              <Status
                styleClass={styles.list}
                status={status}
                placeholder={formatSpacedOutWords(status)}
                clickHandler={this.changeStatus}
              />
            </div>

            <Tags
              styleClass={{
                tags: styles.tags,
                label: styles.label,
                list: styles.list,
              }}
            />
          </div>
        </div>

        <div className={styles.pulloutArea}>
          <div className={styles.headerColor} />
          <button
            className={styles.pullout}
            onClick={handleActive}
            type="button"
          >
            <i className={isActive ? 'fas fa-chevron-left' : 'fas fa-list'} />
          </button>
        </div>
      </aside>
    );
  }
}

SidebarLeft.propTypes = {
  status: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  handleActive: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(SidebarLeft);
