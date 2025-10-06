import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  currentUser: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    add: {
      prepare(name, image, id) {
        return {
          payload: {
            name,
            image,
            id,
          },
        };
      },

      reducer(state, action) {
        state.users.push(action.payload);
      },
    },
    edit: {
      prepare(name, image, id) {
        return {
          payload: {
            name,
            image,
            id,
          },
        };
      },

      reducer(state, action) {
        state.users.map((user) => {
          if (user.id === action.payload.id) {
            user.name = action.payload.name;
            user.image = action.payload.image;
          }
          return user;
        });
      },
    },
    remove(state, action) {
      state.users.filter((user) => user.id !== action.payload);
      state.currentUser = {};
    },
    select(state, action) {
      state.currentUser = state.users.filter(
        (user) => user.id === action.payload
      );
    },
  },
});

export const { add, edit, remove, select } = userSlice.actions;

export default userSlice.reducer;
