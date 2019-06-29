import React from "react";
import request from 'superagent';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const list = {
    textDecoration: 'none',
    color:'#000000',
    borderStyle: 'none'
};

export default class Create extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: '',
      category: 0,
      limit: new Date(),
      categorys: []
    };

    this.taskTitleChange = this.taskTitleChange.bind(this);
    this.taskContentChange = this.taskContentChange.bind(this);
    this.taskLimitChange = this.taskLimitChange.bind(this);
    this.taskCategoryChange = this.taskCategoryChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    request
        .get('https://react-tasklist-backend.herokuapp.com/categorys')
        .end((err, res) => {
            var categorys = res.body;
            this.setState({ categorys });
        });
  }

  taskTitleChange(event) {
    this.setState({title: event.target.value});
  }

  taskContentChange(event) {
    this.setState({content: event.target.value});
  }

  taskCategoryChange(event) {
    this.setState({category: event});
  }

  taskLimitChange(date) {
    this.setState({limit: date});
  }

  handleSubmit() {
    var date = this.state.limit
    var y = date.getFullYear();
    var m = ("00" + (date.getMonth()+1)).slice(-2);
    var d = ("00" + date.getDate()).slice(-2);
    var limitDate = y + "-" + m + "-" + d;
    request
      .post('https://react-tasklist-backend.herokuapp.com/insert')
      .type('form')
      .send({
        type: this.props.status,
        title: this.state.title,
        content: this.state.content,
        category: this.state.category,
        limit: limitDate
      })
      .end(() => {
        alert("タスクを追加しました");
        window.location.reload();
      });
  }

  render() {
    return (
      <div class="task-creator-wrapper">
        <Link to="/" style={list}>
            <div class="back-area">
            くく
            </div>
        </Link>
        <h1>CREATE TASK</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            TaskTitle:
            <input type="text" id="title" name="title" value={this.state.title} onChange={this.taskTitleChange} />
          </label>
          <label>
            TaskDesc:
            <input type="text" id="content" name="content" value={this.state.content} onChange={this.taskContentChange} />
          </label>
          <label>
            TaskCategory:
            <select
            value={this.state.category}
            onChange={ e => this.setState({category: e.target.value}) }>
              <option value="0">指定なし</option>
              {this.state.categorys.map(category => (
                  <option value={category.id}>{category.title}</option>
              ))}
            </select>
          </label>
          <label>
            LimitDate:
            <DatePicker
              selected={this.state.limit}
              onChange={this.taskLimitChange}
              dateFormat="yyyy-MM-dd"
            />
          </label>
          <input type="submit" value="追加！" />
        </form>
      </div>
    );
    document.getElementById('calendar-button')
  }
};
