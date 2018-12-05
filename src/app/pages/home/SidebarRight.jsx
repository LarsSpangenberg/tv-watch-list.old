import React from 'react';
import styles from './SidebarRight.scss';


export default class SidebarRight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: true,
    };
    this.handleActive = this.handleActive.bind(this);
  }

  handleActive(e) {
    const { isActive } = this.state;
    e.preventDefault();
    this.setState({ isActive: !isActive });
  }

  render() {
    const { isActive } = this.state;
    return (
      <aside className={`${styles.sidebar} ${isActive ? styles.active : ''}`}>

        <div className={styles.pulloutInner}>
          <div className={styles.icons}>
            <button type="button">
              <i className={`fas fa-cog ${styles.icon}`} />
            </button>
            <button type="button" className={styles.sortShows}>
              <i className={`fas fa-sort-alpha-down ${styles.icon}`} />
            </button>
          </div>
        </div>
      </aside>
    );
  }
}


// <div className={styles.hoverArea}>
//   <div className={styles.headerColor} />
//   <button
//     className={styles.pullout}
//     onClick={this.handleActive}
//     type="button"
//   >
//     <i className="fas fa-chevron-left" />
//   </button>
// </div>
