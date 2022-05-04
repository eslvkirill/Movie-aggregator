import { useLocation } from 'react-router-dom';
import { useLayoutEffect } from 'react';

const ScrollWrapper = ({ children }: any) => {
	const location = useLocation();

	useLayoutEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);

	return children;
};

export default ScrollWrapper;
