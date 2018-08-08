import React from 'react';

import styles from './home.css';
import Header from './home/header';
import MainContent from './home/main-content';
import SidebarLeft from './home/sidebar-left';
import SidebarRight from './home/sidebar-right';

export default class Home extends React.Component{
  render() {
    return (
      <div className={styles['app-container']}>
          <Header />
          <SidebarLeft />
          <MainContent />
          <SidebarRight />
      </div>
    );
  }
};
