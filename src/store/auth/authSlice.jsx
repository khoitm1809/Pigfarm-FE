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
        setRole: (state, action) => {
            state.role = action.payload;
        },
        setTitle: (state, action) => {
            state.headerTitle = action.payload;
        },
    }
})

export const { setRole, setTitle } = authSlice.actions;
export default authSlice.reducer;
