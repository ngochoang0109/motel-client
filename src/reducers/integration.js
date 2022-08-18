import { integrationConstant } from "../constant/integrationConstant";

const initialState = [{}];

const integration = (state = initialState, action) => {
	switch (action.type) {
		case integrationConstant.GET_TYPE_OF_ACC:
			return action.data;
		default:
			return state
	}

}

export default integration;