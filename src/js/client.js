import React from 'react';
import ReactDOM from 'react-dom';

class Main extends React.Component{
  render() {
    return (
      <div>
        <h1>Watch List</h1>
        <h2>Never lose track of which episode you're on for your favorite TV shows</h2>
      </div>
    );
  }
};

ReactDOM.render(<Main />, document.getElementById('app'));
