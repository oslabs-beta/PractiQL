import React from 'react';
import { render } from 'react-dom';
import App from './App';
import styles from './stylesheets/styles.scss';

render(
  <App URL={'https://api.spacex.land/graphql/'} theme={'nord'} />,
  document.getElementById('root')
);
