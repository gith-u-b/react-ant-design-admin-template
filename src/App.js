import React from 'react';
import { BrowserRouter} from 'react-router-dom';
import ViewRouter from './router/ViewRouter';

class App extends React.Component{
	
	render(){
		return (
			<BrowserRouter>
				<ViewRouter></ViewRouter>
			</BrowserRouter>
		)
	};
}

export default App;
