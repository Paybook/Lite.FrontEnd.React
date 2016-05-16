import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './layout/AppContainer.js'; 
import { Provider } from 'react-redux';
import store from './redux/store'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


//Provider needed for redux store passing
//AppContainer is the app wrapper

ReactDOM.render(<Provider store={store}><AppContainer /></Provider>, document.getElementById('app'));
