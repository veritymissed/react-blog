import React from 'react'
import { connect } from "react-redux";
import superagent from 'superagent'

import EditArticle from "./EditArticle";
import {getArticleList} from "../reducers"
import {addArticle, editArticle, removeArticle } from "../actions";

class ArticleList extends React.Component {
  componentDidMount(){
    superagent.get('http://localhost:5000/api/articles')
    .end((err, res) => {
      if(err){
        console.log(err);
        alert(err.message);
      }
      else{
        var articleArray = res.body;
        articleArray.forEach((val, idx, arr) => {
          this.props.addArticle(val._id, val.date, val.title, val.author, val.body);
        });
      }
    });
  }
  render(){
    if(this.props.articles && this.props.articles.length){
      var articleList = this.props.articles.map((val, idx) => {
        var article_id = val._id.toString();
        if(val.editing){
          return (<EditArticle article={val} key={article_id} index={idx}/>);
        }
        else{
          return (<Article article={val} key={article_id} index={idx}/>);
        }
      })
      return (
        <ul>
        {articleList}
        </ul>
      );
    }
    else{
      return (
        <ul>
        <p>No articles!</p>
        </ul>
      );
    }
  }
};


const Article = connect(null, {editArticle, removeArticle})(({article, index , editArticle, removeArticle}) => {
  function handleDelete(e) {
    superagent
    .delete('http://localhost:5000/api/article/' + article._id)
    .end((err, res) => {
      if(err){
        console.log("err", err);
        alert(err);
      }
      else{
        removeArticle(index);
      }
    });
  }

  function handleEdit(e) {
    editArticle(index);
  }
  return (
    <li>
    <h2>{article.title}</h2>
    <p>Author: {article.author}</p>
    <p>Date: {article.date}</p>
    <h3>Context</h3>
    <p>{article.body}</p>
    <button type="button" onClick={handleEdit}> Edit </button>
    <button type="button" name="delBtn" onClick={handleDelete} index={index}> X </button>
    </li>
  );
})

const mapStateToProps = (state) =>{
  const articles = getArticleList(state);
  return {articles};
}
export default connect(mapStateToProps, {addArticle})(ArticleList)
