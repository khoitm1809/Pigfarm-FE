import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    user: {},
    success: false,
    headerTitle: ""
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setTitle: (state, action) => {
            state.headerTitle = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload
        },
    }
})

export const { setTitle, setUser } = authSlice.actions;
export default authSlice.reducer;
