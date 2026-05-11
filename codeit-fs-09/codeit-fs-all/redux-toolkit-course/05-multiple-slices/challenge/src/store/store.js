import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from '@/features/projects/projectsSlice';
import tasksReducer from '@/features/tasks/tasksSlice';
import membersReducer from '@/features/members/membersSlice';
import statisticsReducer from '@/features/statistics/statisticsSlice';

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    tasks: tasksReducer,
    members: membersReducer,
    statistics: statisticsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export default store;