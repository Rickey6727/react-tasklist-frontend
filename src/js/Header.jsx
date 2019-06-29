import React from "react";

const list = {
    textDecoration: 'none',
    color:'#000000',
    borderStyle: 'none'
};

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
    };

  }

  render() {
    return (
      <div class="header">
      <h1>tasklist</h1>
      </div>
    );
  }
}
