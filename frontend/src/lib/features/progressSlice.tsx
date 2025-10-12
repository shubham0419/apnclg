import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState: ProgressState = {};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    setProgress(state, action: PayloadAction<{ topicId: string; completedSubtopics: string[]; progress: number }>) {
      const { topicId, completedSubtopics, progress } = action.payload;
      state[topicId] = { completedSubtopics, progress };
    },
    updateProgress(state, action: PayloadAction<{ topicId: string; subtopicId: string }>) {
      const { topicId, subtopicId } = action.payload;
      if (!state[topicId]) {
        state[topicId] = { completedSubtopics: [], progress: 0 };
      }
      if (!state[topicId].completedSubtopics.includes(subtopicId)) {
        state[topicId].completedSubtopics.push(subtopicId);
        // Example: progress as percentage
        state[topicId].progress = state[topicId].completedSubtopics.length;
      }
    },
    resetProgress(state, action: PayloadAction<string>) {
      const topicId = action.payload;
      state[topicId] = { completedSubtopics: [], progress: 0 };
    },
  },
});

export const { setProgress, updateProgress, resetProgress } = progressSlice.actions;
export default progressSlice.reducer;