import React from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import './index.css';
import App from './components/App';

ReactModal.setAppElement('#root');

ReactDOM.render(
  <Router>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </Router>,
  document.getElementById('root'),
);
