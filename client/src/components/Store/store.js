import {configureStore} from '@reduxjs/toolkit';
import viewerReducer from './viewerSlice'

export default configureStore({
    reducer: {
        viewer: viewerReducer,
    },
})