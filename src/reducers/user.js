import { GET_USER, SET_USER, REMOVE_USER, CLEAR_USER } from "../hooks/actions";
import localStorage from "../services/localStorage";
import sessionService from "../services/session";

export const userInitialState = JSON.parse(localStorage.getItem("user")) || [];

// update localStorage with state for cart
export const updateLocalStorage = (state) => {
	localStorage.setItem("user", JSON.stringify(state));
};

export const userReducer = (state, action) => {
	switch (action.type) {
		case SET_USER:
			async (state, action) => {
				const response = await sessionService.create(
					values.email,
					values.password
				);
				const payload = { token: response.token, user: response.user };
				localStorage.set(payload);

				const { id } = action.payload;
				const productInCartIndex = state.findIndex((item) => item.id === id);

				if (productInCartIndex >= 0) {
					const newState = [
						...state.slice(0, productInCartIndex),
						{
							...state[productInCartIndex],
							quantity: state[productInCartIndex].quantity + 1,
						},
						...state.slice(productInCartIndex + 1),
					];

					updateLocalStorage(newState);
					return newState;
				}

				const newState = [
					...state,
					{
						...action.payload, // product
						quantity: 1,
					},
				];

				updateLocalStorage(newState);
				return newState;
			};
		case GET_USER:
			(state, action) => {
				const { id } = action.payload;
				const newState = state.filter((item) => item.id !== id);
				updateLocalStorage(newState);
				return newState;
			};
		case CLEAR_USER:
			() => {
				updateLocalStorage([]);
				return [];
			};
		default:
			() => state;
	}
};
