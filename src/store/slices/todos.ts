import { PayloadAction, createSlice, current } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'todos',
  initialState: [{ id: 1, title: 'Example todo' }],
  reducers: {
    addTodo: (state, action: PayloadAction<{id: number, title: string}>) => {
      console.log('before', current(state));
      state.push(action.payload);
      console.log('after', current(state));
    },
  },
});

export const { addTodo } = slice.actions;
export default slice.reducer;
