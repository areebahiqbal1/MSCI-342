import { createSlice } from '@reduxjs/toolkit'

export const viewerSlice = createSlice({
    name: 'viewer',
    initialState: {
        value: 0
    },
    reducers: {
        setView: (state, action) => {
            state.value = action.payload
        },
    },
})

export const { setView } = viewerSlice.actions

export default viewerSlice.reducer