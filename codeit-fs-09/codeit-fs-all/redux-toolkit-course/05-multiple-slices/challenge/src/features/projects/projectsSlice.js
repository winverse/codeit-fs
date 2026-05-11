import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit';

// 가상 API 시뮬레이션
const simulateApiCall = (data, delay = 500) => 
  new Promise((resolve) => setTimeout(() => resolve(data), delay));

// 비동기 thunk 액션들
export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async () => {
    const response = await simulateApiCall([
      { id: '1', name: '웹사이트 리뉴얼', status: 'active', priority: 'high', createdAt: Date.now() - 86400000 * 7 },
      { id: '2', name: '모바일 앱 개발', status: 'planning', priority: 'medium', createdAt: Date.now() - 86400000 * 3 },
    ]);
    return response;
  }
);

export const createProject = createAsyncThunk(
  'projects/createProject',
  async (projectData) => {
    const newProject = {
      id: nanoid(),
      ...projectData,
      createdAt: Date.now(),
      status: 'planning'
    };
    await simulateApiCall(newProject);
    return newProject;
  }
);

export const updateProjectStatus = createAsyncThunk(
  'projects/updateStatus',
  async ({ id, status }) => {
    await simulateApiCall({ id, status });
    return { id, status };
  }
);

const initialState = {
  items: {},
  ids: [],
  loading: false,
  error: null,
  selectedProjectId: null,
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    selectProject: (state, action) => {
      state.selectedProjectId = action.payload;
    },
    updateProject: (state, action) => {
      const { id, updates } = action.payload;
      if (state.items[id]) {
        Object.assign(state.items[id], updates);
      }
    },
    deleteProject: (state, action) => {
      const id = action.payload;
      delete state.items[id];
      state.ids = state.ids.filter(itemId => itemId !== id);
      if (state.selectedProjectId === id) {
        state.selectedProjectId = null;
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchProjects
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.items = {};
        state.ids = [];
        action.payload.forEach(project => {
          state.items[project.id] = project;
          state.ids.push(project.id);
        });
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // createProject
      .addCase(createProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        const project = action.payload;
        state.items[project.id] = project;
        state.ids.push(project.id);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // updateProjectStatus
      .addCase(updateProjectStatus.fulfilled, (state, action) => {
        const { id, status } = action.payload;
        if (state.items[id]) {
          state.items[id].status = status;
        }
      });
  },
});

export const { selectProject, updateProject, deleteProject, clearError } = projectsSlice.actions;

// 선택자들
export const selectAllProjects = (state) => 
  state.projects.ids.map(id => state.projects.items[id]);

export const selectProjectById = (state, projectId) => 
  state.projects.items[projectId];

export const selectSelectedProject = (state) => 
  state.projects.selectedProjectId ? state.projects.items[state.projects.selectedProjectId] : null;

export const selectProjectsLoading = (state) => state.projects.loading;
export const selectProjectsError = (state) => state.projects.error;

export const selectProjectsByStatus = (state, status) =>
  selectAllProjects(state).filter(project => project.status === status);

export const selectProjectsCount = (state) => {
  const projects = selectAllProjects(state);
  return {
    total: projects.length,
    active: projects.filter(p => p.status === 'active').length,
    planning: projects.filter(p => p.status === 'planning').length,
    completed: projects.filter(p => p.status === 'completed').length,
  };
};

export default projectsSlice.reducer;