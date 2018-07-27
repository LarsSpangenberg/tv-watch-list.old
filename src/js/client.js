import React from 'react';
import ReactDOM from 'react-dom';



class Main extends React.Component{
  render() {
    return (
      <div>
        <h1>Watch List!!</h1>
        <h2>Never lose track of your TV episodes again!</h2>
      </div>
    );
  }
};

ReactDOM.render(<Main />, document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}