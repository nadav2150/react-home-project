import React from 'react';
import UsersDataTable from './UsersDataTable';
import PropTypes from 'prop-types';

function Home (props){
	return (
		<div>
			<UsersDataTable />
		</div>
	);
}

Home.propTypes = {};

export default Home;
