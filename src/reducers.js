import { combineReducers } from 'redux'
import {
  ADD_ARTICLE,
  EDIT_ARTICLE,
  SAVE_ARTICLE,
  REMOVE_ARTICLE,
} from './actions'


const initialArticles = [];

function articles(state = initialArticles, action) {
  switch (action.type) {
    case ADD_ARTICLE:
      return [
        ...state,
        {
          _id: action._id,
          title: action.title,
          author: action.author,
          date: action.date,
          body: action.body
        }
      ]
    case EDIT_ARTICLE:
      return state.map((article, index) => {
        if (index === action.index) {
          return Object.assign({}, article, {
            editing: true
          })
        }
        return article
      })
    case SAVE_ARTICLE:
      return state.map((article, index) => {
        if (index === action.index) {
          return Object.assign({}, article, {
            title: action.title,
            author: action.author,
            body: action.body,
            editing: false
          })
        }
        return article
      })
    case REMOVE_ARTICLE:
      var arr = JSON.parse(JSON.stringify(state));
      arr.splice(action.index, 1);
      return arr
    default:
      return state
  }
}

export const getArticleList = (store) => {
  return store.articles
};

const articleApp = combineReducers({
  articles
})

export default articleApp
