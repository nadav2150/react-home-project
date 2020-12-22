import React from 'react';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';

function Filter (){
	const allUserData = useSelector((state) => state.userData);
	const dispatch = useDispatch();
	const searchInput = (searchText) => {
		const searchResult = allUserData.filter((item, key) => {
			if (JSON.stringify(item).toLowerCase().includes(searchText.toLowerCase())) {
				return item;
			}
		});
		dispatch({ type: 'update-search-result', value: searchResult });
	};
	return (
		<div>
			<TextField
				id='filled-search'
				onChange={(e) => searchInput(e.target.value)}
				label='Search field'
				type='search'
				variant='filled'
			/>
		</div>
	);
}

export default Filter;
