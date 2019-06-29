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

export default class Category extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categorys: []
    };

    request
        .get('https://react-tasklist-backend.herokuapp.com/categorys')
        .end((err, res) => {
            var categorys = res.body;
            this.setState({ categorys });
        });
  }

  handleDelete(event) {
    request
      .post('https://react-tasklist-backend.herokuapp.com/category/delete')
      .type('form')
      .send({
        id: event.target.value
      })
      .end(() => {
        window.location.reload();
      });
  }

  render() {
    return (
      <div class="category-editer-wrapper">
        <Link to="/" style={list}>
            <div class="back-area">
            くく
            </div>
        </Link>
        <h1>CATEGORY LIST </h1>
        <Link to="/category/create" style={list}>NEW</Link>
        <ul>
            {this.state.categorys.map(category => (
                <li　key={category.id}>
                    <h3 class="category-title">{category.title}</h3>
                    <button><Link to={'category/edit/' + category.id} style={list}>EDIT</Link></button>
                    <button type="submit" value={category.id} onClick={this.handleDelete}>STASH</button>
                </li>
            ))}
        </ul>
      </div>
    );
  }
};
