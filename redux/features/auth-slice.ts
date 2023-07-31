//PayloadAction is the TYPE - req for TypeScript
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialStateProps = {
  value: AuthStateType;
};

type AuthStateType = {
  isAuth: boolean;
  username: string;
  uid: string;
  isModerator: boolean;
};

//The initial state of the auth slice - DEFAULT VALUES
const initialState = {
  value: {
    isAuth: false,
    username: "",
    uid: "",
    isModerator: false,
  } as AuthStateType,
} as InitialStateProps;

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //Whenever a user clicks the 'logOut' button, the 'logOut' action is dispatched and we RESET the values to the initialState
    logOut: () => {
      return initialState;
    },
    logIn: (state, action: PayloadAction<string>) => {
      return {
        value: {
          isAuth: true,
          username: action.payload,
          uid: "someuid",
          isModerator: false,
        },
      };
    },
    // Sets the username to moderator by setting it to the opposite of what it is, by default we create user as non-moderator
    toggleModerator: (state) => {
      state.value.isModerator = !state.value.isModerator;
    },
  },
});

//Actions === reducers are the functions of the reducers - exported so that they can be used in other files
export const { logIn, logOut, toggleModerator } = auth.actions;
export default auth.reducer;
