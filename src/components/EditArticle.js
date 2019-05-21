import React from "react";
import { connect } from "react-redux";

import { saveArticle } from "../actions";

import superagent from 'superagent';

class EditArticle extends React.Component {
  constructor(props) {
    super(props);
    this.article = props.article;
    this.index = props.index;
    this.state = {
      title: this.article.title,
      author: this.article.author,
      body: this.article.body
    };
    this.saveArticle = props.saveArticle;
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSave = function(e) {
    var title = this.state.title || "";
    var author = this.state.author || "";
    var body = this.state.body || "";
    if(!title.length){
      alert("input title");
    }
    if(!author.length){
      alert("input author");
    }
    if(!body.length){
      alert("input body");
    }
    superagent
    .put('http://localhost:5000/api/article/' + this.article._id)
    .send({
      title: title,
      author: author,
      body: body
    })
    .set('Accept', 'json')
    .end((err, res) => {
      if(err){
        console.log(err);
        alert(err.message);
      }
      else{
        this.props.saveArticle(this.index, title, author, body);
      }
    });
  }
  handleChange = function(e) {
    var obj = {};
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  }
  render(){
    return (
    <li>
    <h2>Title</h2>
    <input
    style={{width:400 + 'px', height:25 + 'px'}}
    type="text" name="title" value={this.state.title} onChange={this.handleChange}/>
    <p>Author</p>
    <input
    style={{width:400 + 'px', height:25 + 'px'}}
    type="text" name="author" value={this.state.author} onChange={this.handleChange}/>
    <h3>Context</h3>
    <textarea type="text" name="body"
    style={{width:400 + 'px', height:150 + 'px'}}
     value={this.state.body} onChange={this.handleChange}/>
    <h3>
      <button onClick={this.handleSave}> Save </button>
    </h3>
    </li>
    );
  }
}
export default connect(null, {saveArticle})(EditArticle);
