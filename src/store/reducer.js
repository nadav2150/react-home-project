const initialState = {
	userData         : [],
	userDataFiltered : [],
};
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'update': {
			return {
				...state,
				userData : action.value,
			};
		}
		case 'update-search-result': {
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
