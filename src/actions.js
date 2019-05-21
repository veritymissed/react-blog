/*
 * action types
 */

export const ADD_ARTICLE = 'ADD_ARTICLE'
export const EDIT_ARTICLE = 'EDIT_ARTICLE'
export const SAVE_ARTICLE = 'SAVE_ARTICLE'
export const REMOVE_ARTICLE = 'REMOVE_ARTICLE'

/*
 * action creators
 */

export function addArticle(_id, date, title, author, body) {
  return { type: ADD_ARTICLE, _id, date, title, author, body }
}

export function editArticle(index) {
  return { type: EDIT_ARTICLE, index }
}

export function saveArticle(index, title, author, body) {
  return { type: SAVE_ARTICLE, index, title, author, body }
}

export function removeArticle(index) {
  return { type: REMOVE_ARTICLE, index }
}
