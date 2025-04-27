import { requestIdHeaderKey } from "@/api-calls/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Headers = {
  'authorization'?: string;
  [requestIdHeaderKey]: string;
}

const initialState: Headers = {
  [requestIdHeaderKey]: ''
}

const headerSlice = createSlice({
  name: 'Headers',
  initialState,
  reducers: {
    setAuthorization: (state, action: PayloadAction<string>) => {
      state.authorization = `Bearer ${action.payload}`;
    },
    clearAuthorization: (state) => {
      state.authorization = undefined;
    },
  }
})

export default headerSlice.reducer;