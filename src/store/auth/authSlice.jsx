import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    user: null,
    success: false,
    role: "admin",
    headerTitle: ""
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setTitle: (state, action) => {
            state.headerTitle = action.payload;
        },
    }
})

export const { setTitle } = authSlice.actions;
export default authSlice.reducer;
