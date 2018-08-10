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

    };
  }

  render() {
    return (
      <div className={styles.appContainer}>
        <Header />
        <SidebarLeft />
        <MainContent />
        <SidebarRight />
      </div>
    );
  }
}
