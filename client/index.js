import React from 'react';
import { render } from 'react-dom';
import App from './App';
import styles from './stylesheets/styles.scss';

render(
  <App endpoint={'https://api.spacex.land/graphql/'} theme={'nord'} />,
  document.getElementById('root')
);
