import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Main from './main';

module.exports = ReactDOMServer.renderToString(<Main />);
