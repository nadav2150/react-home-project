import React, { useEffect, useState } from 'react';
import API from '../utils/API';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Filter from './Filter';

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
	async function onGridReady (params){
		setGridApi(params.api);
		setGridColumnApi(params.columnApi);
		let { data } = await API.get('/users');
		data.forEach((item) => (item.date = getFormattedDate(new Date(item.date))));
		dispatch({ type: 'update', value: data });
		setUsersData(data);
	}
	function getFormattedDate (date){
		var year = date.getFullYear();

		var month = (1 + date.getMonth()).toString();
		month = month.length > 1 ? month : '0' + month;

		var day = date.getDate().toString();
		day = day.length > 1 ? day : '0' + day;

		return month + '/' + day + '/' + year;
	}

	useEffect(
		() => {
			setUsersData(userDataFiltered);
		},
		[ userDataFiltered ]
	);
	return (
		<div className='ag-theme-alpine' style={{ height: 400, width: 1000 }}>
			<Filter />
			<AgGridReact
				defaultColDef={{
					flex     : 1,
					minWidth : 150,
					filter   : true,
				}}
				modules={[ ClientSideRowModelModule ]}
				onGridReady={onGridReady}
				rowSelection={'single'}
				onSelectionChanged={onSelectionChanged}
				rowData={usersData}>
				<AgGridColumn field='id' sortable={true} filter='agNumberColumnFilter' />
				<AgGridColumn field='firstName' sortable={true} />
				<AgGridColumn field='lastName' sortable={true} />
				<AgGridColumn field='date' sortable={true} filter='agDateColumnFilter' filterParams={filterParams} />
				<AgGridColumn field='phone' sortable={true} />
			</AgGridReact>
		</div>
	);
}
var filterParams = {
	comparator        : function (filterLocalDateAtMidnight, cellValue){
		debugger;
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
	minValidYear      : 2000,
};
export default UsersDataTable;
