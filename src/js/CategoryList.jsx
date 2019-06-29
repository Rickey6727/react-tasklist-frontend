import React from "react";
import request from 'superagent';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const list = {
    textDecoration: 'none',
    borderStyle: 'none'
};

const newTask = {
    textDecoration: 'none',
    color:'#000000',
    borderStyle: 'none',
    color:'#00c2ec',
    border:'800'
};

export default class CategoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        posts: [],
        categorys: [],
        nowCategory: 0
    };

    this.categoryDefault = this.categoryDefault.bind(this);
    this.handleChangeStatus = this.handleChangeStatus.bind(this);
    this.categoryChange = this.categoryChange.bind(this);

    request
      .post('https://react-tasklist-backend.herokuapp.com/posts/category')
      .type('form')
      .send({
        category: this.props.match.params.id
      })
      .end((err, res) => {
        var posts = res.body;
        this.setState({ posts });
      });

    request
        .get('https://react-tasklist-backend.herokuapp.com/categorys')
        .end((err, res) => {
            var categorys = res.body;
            this.setState({ categorys });
        });

  }

  handleDelete(event) {
    request
      .post('https://react-tasklist-backend.herokuapp.com/delete')
      .type('form')
      .send({
        id: event.target.value
      })
      .end(() => {
        window.location.reload();
      });
  }

  categoryDefault(event){
    request
      .get('https://react-tasklist-backend.herokuapp.com/posts')
      .end((err, res) => {
        var posts = res.body;
        this.setState({posts: posts});
      });
  }

  categoryChange(event){
    request
      .post('https://react-tasklist-backend.herokuapp.com/posts/category')
      .type('form')
      .send({
        category: event.target.value
      })
      .end((err, res) => {
        var posts = res.body;
        this.setState({posts: posts});
      });
  }

  reload(){
      window.location.reload();
  }

  handleChangeStatus(event){
    var result = event.target.value.split('_');
    var status = result[0];
    var id = result[1];
    var changeStatus = 0;
    if (status == 0) {
        changeStatus = 1;
    } else if (status == 1) {
        changeStatus = 0;
    }
    request
      .post('https://react-tasklist-backend.herokuapp.com/update/status')
      .type('form')
      .send({
        status: changeStatus,
        id: id
      })
      .end((err, res) => {
        window.location.reload();
      });
  }

  render() {
    return (
        <div>
            <div class="category-wrapper">
                <ul>
                    <Link to="/" style={list}>
                        <li class="active-category">
                            全カテゴリを表示
                            {/* <button type="submit" onClick={this.categoryDefault}>全てのタスクを表示する</button> */}
                        </li>
                    </Link>
                    {this.state.categorys.map(category => (
                        <Link to={'/list/category/' + category.id} style={list} onClick={this.reload}>
                            <li>
                                {category.title}
                                {/* <button type="submit" value={category.id} onClick={this.categoryChange}>{category.title}</button> */}
                            </li>
                        </Link>
                    ))}
                    <Link to="/category" style={list}>
                        <li>
                            + EDIT CATEGORY
                        </li>
                    </Link>
                </ul>
            </div>
            <div class="tasklist-wrapper">
                <ul>
                    <li class="task-wrapper new">
                        <div class="task-content">
                            <Link to="/create" style={newTask}>+ NEW TASK</Link>
                        </div>
                    </li>
                    {this.state.posts.map(post => (
                        <li　key={post.id} class="task-wrapper">
                        { post.status === 0 && 
                            <div class="task-content yet">
                                <h3>{post.title}</h3>
                                <p class="content">{post.content}</p>
                                <p class="limit_date yet">limit : {post.limit_date}</p>
                            </div> }
                        { post.status === 1 && 
                            <div class="task-content done">
                                <h3>{post.title}</h3>
                                <p class="content">{post.content}</p>
                                <p class="limit_date done">limit : {post.limit_date}</p>
                            </div> }
                            <div class="task-buttons">
                                <ul>
                                    <li>
                                    <Link to={'/edit/' + post.id} style={list}><button class="button">EDIT</button></Link>
                                    </li>
                                    <li>
                                        <button class="button" type="submit" value={post.status + '_' + post.id} onClick={this.handleChangeStatus}>STATUS</button>
                                    </li>
                                    <li>
                                        <button class="button" type="submit" value={post.id} onClick={this.handleDelete}>DELETE</button>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
  }
}
