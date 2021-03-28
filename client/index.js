import React from 'react';
import { render } from 'react-dom';
import App from './App';
import styles from './stylesheets/styles.scss';

render(<App theme={'nord'}/>, document.getElementById('root'));
