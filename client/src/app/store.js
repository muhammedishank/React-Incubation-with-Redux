import { configureStore } from '@reduxjs/toolkit';
// import authReducer from '../features/auth/authSlice'
// import incubationReducer from '../features/incubatiton/incubationSlice'
import companyReducer from '../features/companySlice'

export const store = configureStore({
  reducer: {
   
    companies:companyReducer
   
  },
});