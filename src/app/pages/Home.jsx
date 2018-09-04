import React from 'react';
import { connect } from 'react-redux';
import { continueSession } from 'services/api-service';

// import userObj from 'assets/user.json';

import styles from './Home.scss';
import Header from './home/Header';
import MainContent from './home/MainContent';
import SidebarLeft from './home/SidebarLeft';
import SidebarRight from './home/SidebarRight';

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
    this.handleUser = this.handleUser.bind(this);
    this.startApp = this.startApp.bind(this);
    this.hideLeft = this.hideLeft.bind(this);
  }

  componentDidMount() {
    this.startApp();
  }

  startApp() {
    fetch('/api/auth/continue')
      .then((res) => {
        if (res.status === 200) {
          res.json().then((data) => {
            this.setState({
              user: data,
              signedIn: true,
            });
          });
        }
      }).catch((err) => {
        console.log(err);
      });
  }

  handleUser(userObj, loggedIn) {
    this.setState({
      user: userObj,
      signedIn: loggedIn,
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
    const shows = signedIn ? user.shows : [];
    return (
      <div className={styles.appContainer}>
        <Header
          user={signedIn ? user : {}}
          leftActive={leftActive}
          signedIn={signedIn}
          handleUser={this.handleUser}
        />
        <SidebarLeft
          isActive={leftActive}
          handleActive={this.hideLeft}
        />
        <MainContent
          shows={shows}
        />
        <SidebarRight />
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   user: {
//     username,
//   }
// });

export default connect()(Home);
