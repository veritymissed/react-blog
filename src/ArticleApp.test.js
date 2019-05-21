import React from 'react';
import ReactDOM from 'react-dom';
import ArticleApp from './ArticleApp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ArticleApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
