import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import API from '../utils/API';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { useHistory } from 'react-router-dom';

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

const columns = [
	{ field: 'id', headerName: 'ID', width: 200 },
	{ field: 'firstName', headerName: 'NAME', width: 200 },
	{ field: 'lastName', headerName: 'LAST NAME', width: 200 },
	{ field: 'date', headerName: 'DATE', width: 200 },
	{ field: 'phone', headerName: 'PHONE', width: 200 },
];

function UsersDataTable (props){
	const [ usersData, setUsersData ] = useState([]);
	const [ gridApi, setGridApi ] = useState(null);
	const [ gridColumnApi, setGridColumnApi ] = useState(null);
	const history = useHistory();

	const onSelectionChanged = () => {
		let selectedRows = gridApi.getSelectedRows()[0];
		const { id } = selectedRows;
		history.push(`/edit/${id}`);
		debugger;
	};

	const [ rowData, setRowData ] = useState([
		{ make: 'Toyota', model: 'Celica', price: 35000 },
		{ make: 'Ford', model: 'Mondeo', price: 32000 },
		{ make: 'Porsche', model: 'Boxter', price: 72000 },
	]);
	function onGridReady (params){
		setGridApi(params.api);
		setGridColumnApi(params.columnApi);
	}

	useEffect(() => {
		(async function fetchUsersData (){
			let { data } = await API.get('/users');
			data.forEach((item) => (item.date = new Date(item.date).toDateString()));
			setUsersData(data);
		})();
		return () => {};
	}, []);
	return (
		<div className='ag-theme-alpine' style={{ height: 400, width: 1000 }}>
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

UsersDataTable.propTypes = {};

export default UsersDataTable;
