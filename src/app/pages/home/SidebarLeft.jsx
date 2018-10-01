import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as selectors from 'app/store';
import { changeStatus } from 'modules/status';
import * as handleTags from 'modules/tags/createList';
import { formatSpacedOutWords } from 'utils/capitalizeWord';

import styles from './SidebarLeft.scss';
import Status from './sidebarLeft/Status';
import Tags from './sidebarLeft/Tags';


const mapStateToProps = state => ({
  signedIn: selectors.getSignedIn(state),
  status: selectors.getActiveStatus(state),
  tagsCount: selectors.getNumberOfTags(state),
  getTags: (property, order, byActive) => (
    selectors.getSortedTags(state, property, order, byActive)
  ),
});

class SidebarLeft extends Component {
  constructor(props) {
    super(props);
    this.changeStatus = this.changeStatus.bind(this);
    this.editTag = this.editTag.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { signedIn, dispatch } = this.props;
    if (signedIn !== prevProps.signedIn && signedIn === true) {
      dispatch(handleTags.fetchTags());
    }
  }

  changeStatus(e) {
    const { dispatch } = this.props;
    dispatch(changeStatus(e.target.value));
  }

  editTag(e) {
    const { dispatch } = this.props;
    const { name, value } = e.target;
    if (name === 'remove') {
      dispatch(handleTags.removeTag(value));
    } else if (name === 'add') {
      dispatch(handleTags.addTag(value));
    } else if (name === 'tags') {
      dispatch(handleTags.toggleActive(value));
    }
  }

  render() {
    const {
      status,
      tagsCount,
      getTags,
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
              count={tagsCount}
              getTags={getTags}
              handleTag={this.editTag}
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
  signedIn: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  tagsCount: PropTypes.number.isRequired,
  getTags: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  handleActive: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(SidebarLeft);
