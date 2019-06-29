import React from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import List from './List';
import Header from './Header';
import Edit from './Edit';
import Create from './Create';
import Category from './Category';
import CategoryEdit from './CategoryEdit';
import CategoryCreate from './CategoryCreate';
import CategoryList from './CategoryList';
import '../css/style.css';

export default class App extends React.Component {

  render() {
    return (
        <div>
          <Header />
          <Router>
            <Route path='/' exact component={List}/>
            <Route path='/edit/:id' exact component={Edit}/>
            <Route path='/create' exact component={Create}/>
            <Route path='/category' exact component={Category}/>
            <Route path='/category/edit/:id' exact component={CategoryEdit}/>
            <Route path='/category/create' exact component={CategoryCreate}/>
            <Route path='/list/category/:id' exact component={CategoryList}/>
          </Router>
        </div>
    );
  }
}
