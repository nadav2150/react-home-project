const initialState = {
	userData         : [],
	userDataFiltered : [],
};
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'update': {
			debugger;
			return {
				...state,
				userData : action.value,
			};
		}
		case 'update-search-result': {
			debugger;
			return {
				...state,
				userDataFiltered : action.value,
			};
		}
		default: {
			return state;
		}
	}
};
export default reducer;
