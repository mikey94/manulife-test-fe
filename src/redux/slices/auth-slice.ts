import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface AuthState {
    token: string;
}

const INITIAL_STATE: AuthState = {
    token: "",
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: INITIAL_STATE,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        }
    }
})

export const {setToken} = authSlice.actions;
export default authSlice.reducer;