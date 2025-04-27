import { Account } from "@/api-calls/account/get";
import { AccountRoles, AccountType } from "@/lib/enums";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Account = {
  id: 0,
  email: "",
  role: AccountRoles.PROVIDER,
  type: AccountType.INDIVIDUAL,
}

const accountSlice = createSlice({
  name: 'Account',
  initialState,
  reducers: {
    setAccountDetails: (state, action: PayloadAction<Account>) => {
      return action.payload
    },
    clearAccountDetails: (state) => {
      return initialState
    },
  }
})

export const { setAccountDetails, clearAccountDetails } = accountSlice.actions;
export default accountSlice.reducer;