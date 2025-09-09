import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
}

function loadAuth(): AuthState {
  try {
    const raw = localStorage.getItem("sf_auth");
    if (raw) return JSON.parse(raw) as AuthState;
  } catch {}
  return { user: null, token: null };
}

const initialState: AuthState = loadAuth();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ user: User; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("sf_auth", JSON.stringify(state));
    },
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("sf_auth");
    },
    updateProfile(state, action: PayloadAction<Partial<User>>) {
      if (state.user) state.user = { ...state.user, ...action.payload };
      localStorage.setItem("sf_auth", JSON.stringify(state));
    },
  },
});

export const { loginSuccess, logout, updateProfile } = authSlice.actions;
export default authSlice.reducer;
