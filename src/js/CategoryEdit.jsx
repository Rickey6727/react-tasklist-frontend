import React from "react";
import request from 'superagent';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

export default class CategoryEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category: '',
      id: 0
    };

    this.categoryTitleChange = this.categoryTitleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    request
        .post('https://react-tasklist-backend.herokuapp.com/categorys/category')
        .type('form')
        .send({
          id: this.props.match.params.id
        })
        .end((err, res) => {
          this.setState({id: res.body[0].id});
          this.setState({category: res.body[0].title});
        });
  }

  categoryTitleChange(event) {
    this.setState({category: event.target.value});
  }

  handleSubmit(event) {
    request
      .post('https://react-tasklist-backend.herokuapp.com/category/update')
      .type('form')
      .send({
        id: this.state.id,
        category: this.state.category
      })
      .end((err, res) => {
        alert("カテゴリーを変更しました");
      });
  }

  render() {
    return (
      <div class="category-editer-edit">
        <Link to="/category">
          <div class="back-area">
            くく
          </div>
        </Link>
        <h1>EDIT CATEGORY</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            CategoryTitle:
            <input type="text" id="category" name="category" value={this.state.category} onChange={this.categoryTitleChange} />
          </label>
          <input type="submit" value="変更" />
        </form>
      </div>
    );
    document.getElementById('calendar-button')
  }
};
