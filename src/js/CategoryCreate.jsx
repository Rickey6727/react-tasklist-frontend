import React from "react";
import request from 'superagent';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

export default class CategoryCreate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: ''
    };

    this.categoryTitleChange = this.categoryTitleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  categoryTitleChange(event) {
    this.setState({title: event.target.value});
  }

  handleSubmit(event) {
    request
      .post('https://react-tasklist-backend.herokuapp.com/category/insert')
      .type('form')
      .send({
        title: this.state.title
      })
      .end((err, res) => {
        window.location.href = "/category";
      });
  }

  render() {
    return (
      <div class="category-creator-wrapper">
        <Link to="/category">
          <div class="back-area">
            くく
          </div>
        </Link>
        <h1>CREATE TASK</h1>
        <form onSubmit={this.handleSubmit}>
          <label class="create-category-form">
            <input type="text" id="title" name="title" placeholder="カテゴリー名称" value={this.state.title} onChange={this.categoryTitleChange} />
          </label>
          <input type="submit" value="追加！" />
        </form>
      </div>
    );
    document.getElementById('calendar-button')
  }
};
