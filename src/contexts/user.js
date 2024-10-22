import { useReducer, createContext } from "react";
import {
	CLEAR_USER,
	GET_USER,
	REMOVE_USER,
	SET_USER,
} from "../hooks/actions.js";
import { userReducer, userInitialState } from "../reducers/user";

export const UserContext = createContext();

function useUserReducer() {
	const [state, dispatch] = useReducer(userReducer, userInitialState);

	const setUser = (user) =>
		dispatch({
			type: SET_USER,
			payload: user,
		});

	const getUser = (user) =>
		dispatch({
			type: GET_USER,
			payload: user,
		});

	const removeUser = () => dispatch({ type: REMOVE_USER });

	const clearUser = () => dispatch({ type: CLEAR_USER });

	return { state, setUser, getUser, removeUser, clearUser };
}

// la dependencia de usar React Context es MÍNIMA
export function UserProvider({ children }) {
	const { state, setUser, getUser, removeUser, clearUser } = useUserReducer();

	return (
		<UserContext.Provider
			value={{
				user: state,
				setUser,
				getUser,
				removeUser,
				clearUser,
			}}
		>
			{children}
		</UserContext.Provider>
	);
}
