import React from 'react';

import styles from './Home.scss';
import Header from './home/Header';
import MainContent from './home/MainContent';
import SidebarLeft from './home/SidebarLeft';
import SidebarRight from './home/SidebarRight';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leftActive: false,
    };
    this.hideLeft = this.hideLeft.bind(this);
  }

  hideLeft(e) {
    e.preventDefault();
    this.setState(prevState => ({ leftActive: !prevState.leftActive }));
  }

  render() {
    const { leftActive } = this.state;
    return (
      <div className={styles.appContainer}>
        <Header
          leftActive={leftActive}
        />
        <SidebarLeft
          isActive={leftActive}
          handleActive={this.hideLeft}
        />
        <MainContent />
        <SidebarRight />
      </div>
    );
  }
}
