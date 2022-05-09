import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface State {
  id: string;
  name: string;
  title: string;
  motto: string;
  avatarUrl: string;
}

const initialState = {
  id: 'fake-id',
  name: 'Alexandore Max',
  title: 'Pussy Slayer Apprentice',
  motto: 'I will get them eventually',
  avatarUrl: 'https://i.pravatar.cc/300',
} as State;

const slice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setName(state, payload: PayloadAction<string>) {
      state.name = payload.payload;
    },
    setTitle(state, payload: PayloadAction<string>) {
      state.title = payload.payload;
    },
    setMotto(state, payload: PayloadAction<string>) {
      state.motto = payload.payload;
    },
  },
});

export const { setName, setTitle, setMotto } = slice.actions;
export default slice.reducer;
