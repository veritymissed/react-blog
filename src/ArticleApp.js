import React from "react";
import AddArticle from "./components/AddArticle";
import ArticleList from "./components/ArticleList";

export default function ArticleApp() {
  return (
    <div className="ArticleApp">
      <div className="Article-App-header float-left container">
        <ArticleList />
      </div>
      <div className="float-left container">
        <AddArticle />
      </div>
    </div>
  );
}
