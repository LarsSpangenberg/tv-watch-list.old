import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { continueSession } from 'modules/user';

// import userObj from 'assets/user.json';

import styles from './Home.scss';
import Header from './home/Header';
import MainContent from './home/MainContent';
import SidebarLeft from './home/SidebarLeft';
import SidebarRight from './home/SidebarRight';

const mapStateToProps = state => ({
  signedIn: state.user.signedIn,
});

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      signedIn: false,
      leftActive: false,
      listStatus: 'All',
      activeTags: [],
    };
    this.hideLeft = this.hideLeft.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(continueSession());
  }

  hideLeft(e) {
    e.preventDefault();
    this.setState(prevState => ({ leftActive: !prevState.leftActive }));
  }

  render() {
    const { leftActive } = this.state;
    const { signedIn } = this.props;
    return (
      <div className={styles.appContainer}>
        <Header
          leftActive={leftActive}
        />
        <SidebarLeft
          isActive={leftActive}
          handleActive={this.hideLeft}
        />
        <MainContent signedIn={signedIn} />
        <SidebarRight />
      </div>
    );
  }
}

Home.propTypes = {
  signedIn: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Home);
