import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TopicsState {
  topics: Topic[];
  loading: boolean;
  error: string | null;
}

const initialState: TopicsState = {
  topics: [],
  loading: false,
  error: null,
};

const topicsSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {
    fetchTopicsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchTopicsSuccess(state, action: PayloadAction<Topic[]>) {
      state.topics = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchTopicsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    
  },
});

export const {
  fetchTopicsStart,
  fetchTopicsSuccess,
  fetchTopicsFailure,
} = topicsSlice.actions;

export default topicsSlice.reducer;