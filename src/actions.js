import superagent from 'superagent'
/*
 * action types
 */

export const EDIT_ARTICLE = 'EDIT_ARTICLE'
export const EDIT_ARTICLE_CANCEL = 'EDIT_ARTICLE_CANCEL'

/*
 * action creators
 */
export const REQUEST_ARTICLES = 'REQUEST_ARTICLES'
function requestArticles(params){
  return { type: REQUEST_ARTICLES, params }
}
export const REQUEST_ARTICLES_SUCCESS = 'REQUEST_ARTICLES_SUCCESS'
function receiveArticles(params, json){
  return { type: REQUEST_ARTICLES_SUCCESS, params, articles: json }
}

export const REQUEST_ARTICLES_FAILED = 'REQUEST_ARTICLES_FAILED'
function receiveArticlesFailed(params, error){
  return { type: REQUEST_ARTICLES_FAILED, params, error }
}

export function fetchArticles(params){
  return function(dispatch) {
    dispatch(requestArticles(params))

    return new Promise(function(resolve, reject) {
      superagent.get('http://localhost:5000/api/articles')
      .end((err, res) => {
        if(err){
          return reject(err)
        }
        else{
          var articleArray = res.body;
          return resolve(articleArray)
        }
      });
    })
    .then((articles) => dispatch(receiveArticles(params, articles)))
    .catch((err) => dispatch(receiveArticlesFailed(params, err)))
  }
}

export const REQUEST_ADD_ARTICLES = 'REQUEST_ADD_ARTICLES'
function requestAddArticles(article){
  return { type: REQUEST_ADD_ARTICLES, article }
}

export const REQUEST_ADD_ARTICLES_SUCCESS = 'REQUEST_ADD_ARTICLES_SUCCESS'
function requestAddArticlesSuccess(article){
  return { type: REQUEST_ADD_ARTICLES_SUCCESS, article }
}

export const REQUEST_ADD_ARTICLES_FALED = 'REQUEST_ADD_ARTICLES_FALED'
function requestAddArticlesFailed(error){
  return { type: REQUEST_ADD_ARTICLES_FALED, error }
}

export function addArticle(newArticle) {
  return function(dispatch) {
    dispatch(requestAddArticles(newArticle))
    return new Promise(function(resolve, reject) {
      superagent
      .post('http://localhost:5000/api/article')
      .send({
        title: newArticle.title,
        author: newArticle.author,
        body: newArticle.body
      })
      .set('Accept', 'json')
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
        else{
          return resolve(res.body)
        }
      })
    })
    .then((article) => {
      dispatch(requestAddArticlesSuccess(article))
    })
    .catch((err) => {
      dispatch(requestAddArticlesFailed(err))
    })
  }
}

export const REQUEST_REMOVE_ARTICLE = 'REQUEST_REMOVE_ARTICLE'
function requestRemoveArticle(articleId){
  return { type: REQUEST_REMOVE_ARTICLE, articleId }
}

export const REQUEST_REMOVE_ARTICLE_SUCCESS = 'REQUEST_REMOVE_ARTICLE_SUCCESS'
function requestRemoveArticleSuccess(articleId){
  return { type: REQUEST_REMOVE_ARTICLE_SUCCESS, articleId }
}

export const REQUEST_REMOVE_ARTICLE_FAILED = 'REQUEST_REMOVE_ARTICLE_FAILED'
function requestRemoveArticleFailed(error){
  return { type: REQUEST_REMOVE_ARTICLE_FAILED, error }
}

export function removeArticle(article) {
  return function(dispatch) {
    dispatch(requestRemoveArticle(article._id))
    new Promise(function(resolve, reject) {
      superagent
      .delete(`http://localhost:5000/api/article/${article._id}`)
      .end((err, res) => {
        if(err){
          return reject(err);
        }
        else{
          return resolve(res.body)
        }
      })
    })
    .then((res)=>{
      dispatch(requestRemoveArticleSuccess(article._id))
    })
    .catch((err) => {
      dispatch(requestRemoveArticleFailed(err))
    })
  }
}

export function editArticle(index) {
  return { type: EDIT_ARTICLE, index }
}

export function editArticleCancel(articleId) {
  return { type: EDIT_ARTICLE_CANCEL, articleId }
}

export const REQUEST_UPDATE_ARTICLE = 'REQUEST_UPDATE_ARTICLE'
function requestUpdateArticle(articleId){
  return { type: REQUEST_UPDATE_ARTICLE, articleId }
}

export const REQUEST_UPDATE_ARTICLE_SUCCESS = 'REQUEST_UPDATE_ARTICLE_SUCCESS'
function requestUpdateArticleSuccess(articleId, title, author, body){
  return { type: REQUEST_UPDATE_ARTICLE_SUCCESS, articleId, title, author, body }
}

export const REQUEST_UPDATE_ARTICLE_FAILED = 'REQUEST_UPDATE_ARTICLE_FAILED'
function requestUpdateArticleFailed(error){
  return { type: REQUEST_UPDATE_ARTICLE_FAILED, error }
}

export function updateArticle(articleId, title, author, body){
  return function(dispatch) {
    dispatch(requestUpdateArticle(articleId))
    return new Promise(function(resolve, reject) {
      superagent
      .put(`http://localhost:5000/api/article/${articleId}`)
      .send({
        title: title,
        author: author,
        body: body
      })
      .set('Accept', 'json')
      .end((err, res) => {
        if(err){
          return reject(err)
        }
        else{
          return resolve(res.body)
        }
      })
    })
    .then((res) => {
      dispatch(requestUpdateArticleSuccess(articleId, title, author, body))
    })
    .catch((err) => {
      dispatch(requestUpdateArticleFailed(err))
    })
  }
}
