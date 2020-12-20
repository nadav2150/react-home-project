import React, { useState, useEffect } from 'react';
import API from '../utils/API';
import { useParams, useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

function Edit (){
	const [ userData, setUserData ] = useState({});
	const history = useHistory();
	const onSave = async () => {
		let { id } = userData;
		await API.post(`/users/${id}`, userData);
		history.push('/Home');
	};
	let { id } = useParams();
	useEffect(() => {
		(async function fetchUsersData (){
			let { data } = await API.get(`/users/${id}`);
			setUserData(data);
		})();
		return () => {};
	}, []);

	const setNewVal = (key, event) => {
		const newVal = Object.assign({}, userData);
		newVal[key] = event.target.value;
		setUserData(newVal);
	};
	return (
		<div>
			<Box display='flex' alignItems='center' flexDirection='column'>
				<Box display='flex' width='100%' flexDirection='column' alignItems='center' justifyContent>
					{Object.keys(userData).map((key, index) => {
						if (key !== 'id') {
							return (
								<TextField
									key={index}
									variant='outlined'
									margin='normal'
									onChange={(event) => {
										setNewVal(key, event);
									}}
									id={key}
									label={key}
									name={key}
									autoFocus
								/>
							);
						} else {
							return null;
						}
					})}
				</Box>
				<Button variant='contained' color='primary' onClick={onSave}>
					save
				</Button>
			</Box>
		</div>
	);
}

export default Edit;
