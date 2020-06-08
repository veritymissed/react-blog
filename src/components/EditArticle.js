import React from "react";
import { connect } from "react-redux";

import { updateArticle, editArticleCancel } from "../actions";

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
    this.handleCancel = this.handleCancel.bind(this);
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
    const {updateArticle} = this.props
    updateArticle(this.article._id, title, author, body);
  }
  handleCancel =  function(e) {
    const {editArticleCancel} = this.props
    editArticleCancel(this.article._id)
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
      <button onClick={this.handleCancel}> Cancel </button>
    </h3>
    </li>
    );
  }
}
export default connect(null, {updateArticle, editArticleCancel})(EditArticle);
