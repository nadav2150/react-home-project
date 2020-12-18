import React, { useState, useEffect } from 'react';
import API from '../utils/API';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';

function Edit (props){
	const [ userData, setUserData ] = useState({});
	let { id } = useParams();
	useEffect(() => {
		(async function fetchUsersData (){
			let { data } = await API.get(`/users/${id}`);
			setUserData(data);
		})();
		return () => {};
	}, []);
	return (
		<div>
			{Object.keys(userData).map((key) => (
				<div>
					<TextField variant='outlined' margin='normal' required fullWidth id={key} label={key} name={key} autoFocus />
				</div>
			))}
		</div>
	);
}

Edit.propTypes = {};

export default Edit;
