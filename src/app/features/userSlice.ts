import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from '../../store'

// Define a type for the slice state
interface UserState {
  firstName: string;
  lastName: string;
  email: string;
  contact: number;
  emp_id: number;
  designation: string;
  joinedAt: string;
  isAdmin: boolean;
}

// Define the initial state using that type
const initialState: UserState = {
  firstName: "",
  lastName: "",
  email: "",
  contact: 0,
  emp_id: 0,
  designation: "",
  joinedAt: "",
  isAdmin: false,
};

export const userSlice = createSlice({
  name: "user-details ",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserState>) => {
      console.log("useSlice: ", action.payload);
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.contact = action.payload.contact;
      state.emp_id = action.payload.emp_id;
      state.designation = action.payload.designation;
      state.joinedAt = action.payload.joinedAt;
      state.isAdmin = action.payload.isAdmin;
    },

    // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  },
});

export const { addUser } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default userSlice.reducer;
