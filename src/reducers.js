import { combineReducers } from 'redux'
import {
  REQUEST_ARTICLES,
  REQUEST_ARTICLES_SUCCESS,
  REQUEST_ARTICLES_FAILED,
  REQUEST_ADD_ARTICLES,
  REQUEST_ADD_ARTICLES_SUCCESS,
  REQUEST_ADD_ARTICLES_FALED,
  REQUEST_REMOVE_ARTICLE,
  REQUEST_REMOVE_ARTICLE_SUCCESS,
  REQUEST_REMOVE_ARTICLE_FAILED,
  EDIT_ARTICLE,
  EDIT_ARTICLE_CANCEL,
  REQUEST_UPDATE_ARTICLE,
  REQUEST_UPDATE_ARTICLE_SUCCESS,
  REQUEST_UPDATE_ARTICLE_FAILED
} from './actions'

function articlesReducer(state = {
  isFetching: false,
  isAdding: false,
  isRemoving: false,
  articles: []
}, action) {
  switch (action.type) {
    case REQUEST_ARTICLES:
      return Object.assign({}, state, {
        isFetching: true,
        error: null
      })
    case REQUEST_ARTICLES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        articles: action.articles,
        error: null
      })
    case REQUEST_ARTICLES_FAILED:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      })
    case REQUEST_ADD_ARTICLES:
      return Object.assign({}, state, {
        isAdding: true
      })
    case REQUEST_ADD_ARTICLES_SUCCESS:
      return Object.assign({}, state, {
        articles: state.articles.concat([action.article]),
        isAdding: false
      })
    case REQUEST_ADD_ARTICLES_FALED:
      return Object.assign({}, state, {
        isAdding: false
      })
    case REQUEST_REMOVE_ARTICLE:
      return Object.assign({}, state, {
        isRemoving: true
      })
    case REQUEST_REMOVE_ARTICLE_SUCCESS:
      let articlesAfterRemoved = state.articles.filter((article) => {
        return article._id !== action.articleId
      })
      return Object.assign({}, state, {
        articles: articlesAfterRemoved,
        isRemoving: false
      })
    case REQUEST_REMOVE_ARTICLE_FAILED:
      return Object.assign({}, state, {
        isRemoving: false
      })
    case EDIT_ARTICLE:
      let currentArticles = state.articles.map((article, index) => {
        if (index === action.index) {
          return Object.assign({}, article, {
            editing: true
          })
        }
        return article
      })
      return Object.assign({}, state, {
        articles: currentArticles
      })
    case EDIT_ARTICLE_CANCEL:
      let cancelEditingArticles = state.articles.map((article, index) => {
        if (article._id === action.articleId) {
          return Object.assign({}, article, {
            editing: false
          })
        }
        return article
      })
      return Object.assign({}, state, {
        articles: cancelEditingArticles
      })
    case REQUEST_UPDATE_ARTICLE:
    case REQUEST_UPDATE_ARTICLE_SUCCESS:
      let newArticles = state.articles.map((article) => {
        if (article._id === action.articleId) {
          return Object.assign({}, article, {
            editing: false,
            title: action.title,
            author: action.author,
            body: action.body
          })
        }
        return article
      })
      return Object.assign({}, state, {
        articles: newArticles
      })
    case REQUEST_UPDATE_ARTICLE_FAILED:
    default:
      return state
  }
}


export const getArticleList = (store) => {
  return store.articlesReducer.articles
};

const articleApp = combineReducers({
  articlesReducer
})

export default articleApp
