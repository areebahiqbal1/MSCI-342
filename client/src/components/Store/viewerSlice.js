import { createSlice } from '@reduxjs/toolkit'

export const viewerSlice = createSlice({
    name: 'viewer',
    initialState: {
        value: 0,
        value2: 0,
    },
    reducers: {
        setView: (state, action) => {
            state.value = action.payload
        },
        setView2: (state, action) => {
            state.value2 = action.payload
        },
    },
})

export const { setView, setView2 } = viewerSlice.actions

export default viewerSlice.reducer