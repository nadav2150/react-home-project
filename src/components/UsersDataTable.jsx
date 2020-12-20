import React, { useEffect, useState } from 'react';
import API from '../utils/API';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Filter from './Filter';

const filterParams = {
	comparator        : function (filterLocalDateAtMidnight, cellValue){
		var dateAsString = cellValue;
		if (dateAsString == null) return -1;
		var dateParts = dateAsString.split('/');
		var cellDate = new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));
		if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
			return 0;
		}
		if (cellDate < filterLocalDateAtMidnight) {
			return -1;
		}
		if (cellDate > filterLocalDateAtMidnight) {
			return 1;
		}
	},
	browserDatePicker : true,
};

function UsersDataTable (props){
	const userDataFiltered = useSelector((state) => state.userDataFiltered);
	const history = useHistory();
	const dispatch = useDispatch();
	const [ usersData, setUsersData ] = useState(userDataFiltered);
	const [ gridApi, setGridApi ] = useState(null);
	const [ gridColumnApi, setGridColumnApi ] = useState(null);

	const onSelectionChanged = () => {
		let selectedRows = gridApi.getSelectedRows()[0];
		const { id } = selectedRows;
		history.push(`/edit/${id}`);
	};
	function onGridReady (params){
		setGridApi(params.api);
		setGridColumnApi(params.columnApi);
	}

	useEffect(
		() => {
			setUsersData(userDataFiltered);
		},
		[ userDataFiltered ]
	);

	useEffect(() => {
		(async function fetchUsersData (){
			let { data } = await API.get('/users');
			data.forEach((item) => (item.date = new Date(item.date).toDateString()));
			dispatch({ type: 'update', value: data });
			setUsersData(data);
		})();
		return () => {};
	}, []);
	return (
		<div className='ag-theme-alpine' style={{ height: 400, width: 1000 }}>
			<Filter />
			<AgGridReact
				onGridReady={onGridReady}
				rowSelection={'single'}
				onSelectionChanged={onSelectionChanged}
				rowData={usersData}>
				<AgGridColumn field='id' sortable={true} filter='agNumberColumnFilter' />
				<AgGridColumn field='firstName' sortable={true} filter />
				<AgGridColumn field='lastName' sortable={true} filter />
				<AgGridColumn field='date' sortable={true} filter='agDateColumnFilter' filterParams={filterParams} />
				<AgGridColumn field='phone' sortable={true} filter />
			</AgGridReact>
		</div>
	);
}
export default UsersDataTable;
