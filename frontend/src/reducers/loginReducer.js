import { actions } from "../actions";
export default function loginReducer(state, action) {
  switch (action.type) {
    case actions.LOGIN:
      return {
        ...state,
        isLoading: true,
        success: false,
        error: false,
        errorMessage: "",
      };
    case actions.SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: false,
        errorMessage: "",
      };

    case actions.ERROR:
      return {
        ...state,
        isLoading: false,
        success: false,
        error: true,
        errorMessage: action.payload

      };
    default:
      return state;
  }
}
