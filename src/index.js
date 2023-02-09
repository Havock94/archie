import React, { forwardRef } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import * as serviceWorker from './serviceWorker';

import { Provider as ReduxProvider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import layoutReducer from './reducers/layout';
import { Link as RouterLink, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/root';
import ErrorPage from './routes/errorPage';
import Home from './routes/home';
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material';
import LayoutLeft from './components/layout/layoutLeft';
import LayoutRight from './components/layout/layoutRight';
import LayoutToolbar from './components/layout/layoutToolbar/layoutToolbar';
import { Toaster } from 'react-hot-toast';
import Scrollbars from 'react-custom-scrollbars';
/**
 * React Router
 */
//Forwars URL params to Root element
const loader = ({ params }) => params;
const router = createBrowserRouter([
	{
		path: '/',
		loader,
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '',
				element: <Home />,
			},
		],
	},
	{
		path: 'layout',
		loader,
		element: <Root leftComponent={LayoutLeft} rightComponent={LayoutRight} toolbar={LayoutToolbar} />,
		errorElement: <ErrorPage />,
	},
	{
		path: 'layout/:restoreLayout',
		loader,
		element: <Root leftComponent={LayoutLeft} rightComponent={LayoutRight} toolbar={LayoutToolbar} />,
		errorElement: <ErrorPage />,
	},
]);

/**
 * MUI Theme
 */
const LinkBehaviour = forwardRef(function LinkBehaviour(props, ref) {
	const { href, ...other } = props;
	return <RouterLink ref={ref} to={href} {...other} />;
});

const theme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#3b82f6',
		},
		secondary: {
			main: '#ec4899',
		},
		background: {
			default: '#f4f4f5',
		},
	},
	components: {
		MuiLink: {
			defaultProps: {
				component: LinkBehaviour,
			},
		},
		MuiButtonBase: {
			defaultProps: {
				LinkComponent: LinkBehaviour,
			},
		},
	},
});

const reduxStore = configureStore({
	reducer: {
		layout: layoutReducer,
	},
});

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
	<ReduxProvider store={reduxStore}>
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={theme}>
				<Toaster position='bottom-center'/>
				<Scrollbars className='!w-screen !h-screen' autoHide>
					<RouterProvider router={router} />
				</Scrollbars>
			</ThemeProvider>
		</StyledEngineProvider>
	</ReduxProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
