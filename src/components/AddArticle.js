import React from "react";
import { connect } from "react-redux";
import { addArticle } from "../actions";

class AddArticle extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      author: '',
      body: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event){
    var obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  }
  handleSubmit(event){
    event.preventDefault();
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
    let newArticle = {
      title: this.state.title,
      author: this.state.author,
      body: this.state.body
    }
    const {addArticle} = this.props
    addArticle(newArticle)
  }

  render(){
    return (
      <form action="" method="" onSubmit={this.handleSubmit}>
        <div>
          <h3>Title</h3>
          <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
        </div>
        <div>
          <h3>Author</h3>
          <input type="text" name="author" value={this.state.author} onChange={this.handleChange}/>
        </div>
        <div>
          <h3>Context</h3>
          <textarea name="body" value={this.state.body} onChange={this.handleChange}
           style={{width:300 + 'px', height:300 + 'px'}}></textarea>
        </div>
        <button type="submit" name="button">Create</button>
      </form>
    );
  }
};

export default connect(null, {addArticle})(AddArticle);
