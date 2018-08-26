import React from 'react';

import userObj from 'assets/user.json';

import styles from './Home.scss';
import Header from './home/Header';
import MainContent from './home/MainContent';
import SidebarLeft from './home/SidebarLeft';
import SidebarRight from './home/SidebarRight';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      signedIn: false,
      leftActive: false,
    };
    this.fetchUser = this.fetchUser.bind(this);
    this.hideLeft = this.hideLeft.bind(this);
  }

  componentWillMount() {
    this.fetchUser();
  }

  fetchUser() {
    // const { shows } = this.state;
    this.setState({
      user: userObj,
    });
  }

  hideLeft(e) {
    e.preventDefault();
    this.setState(prevState => ({ leftActive: !prevState.leftActive }));
  }

  render() {
    const {
      user,
      signedIn,
      leftActive,
    } = this.state;
    return (
      <div className={styles.appContainer}>
        <Header
          user={user}
          leftActive={leftActive}
          signedIn={signedIn}
        />
        <SidebarLeft
          isActive={leftActive}
          handleActive={this.hideLeft}
        />
        <MainContent
          shows={user.shows}
        />
        <SidebarRight />
      </div>
    );
  }
}
