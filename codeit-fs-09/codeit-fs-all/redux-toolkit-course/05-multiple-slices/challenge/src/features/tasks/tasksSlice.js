import { createSlice, createSelector, nanoid } from '@reduxjs/toolkit';

const initialState = {
  items: {},
  ids: [],
  assignmentsByProject: {}, // projectId -> [taskId, ...]
  filter: {
    status: 'all', // 'all', 'pending', 'in-progress', 'completed'
    priority: 'all', // 'all', 'low', 'medium', 'high'
    assignee: 'all', // 'all', 'unassigned', memberId
    projectId: 'all', // 'all', projectId
  },
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        const task = action.payload;
        state.items[task.id] = task;
        state.ids.push(task.id);
        
        // 프로젝트별 할당 업데이트
        if (task.projectId) {
          if (!state.assignmentsByProject[task.projectId]) {
            state.assignmentsByProject[task.projectId] = [];
          }
          state.assignmentsByProject[task.projectId].push(task.id);
        }
      },
      prepare(taskData) {
        return {
          payload: {
            id: nanoid(),
            ...taskData,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            status: 'pending',
          },
        };
      },
    },
    updateTask: (state, action) => {
      const { id, updates } = action.payload;
      if (state.items[id]) {
        Object.assign(state.items[id], {
          ...updates,
          updatedAt: Date.now(),
        });
      }
    },
    deleteTask: (state, action) => {
      const id = action.payload;
      const task = state.items[id];
      
      if (task) {
        // 프로젝트별 할당에서 제거
        if (task.projectId && state.assignmentsByProject[task.projectId]) {
          state.assignmentsByProject[task.projectId] = 
            state.assignmentsByProject[task.projectId].filter(taskId => taskId !== id);
        }
        
        delete state.items[id];
        state.ids = state.ids.filter(taskId => taskId !== id);
      }
    },
    assignTaskToMember: (state, action) => {
      const { taskId, memberId } = action.payload;
      if (state.items[taskId]) {
        state.items[taskId].assigneeId = memberId;
        state.items[taskId].updatedAt = Date.now();
      }
    },
    unassignTask: (state, action) => {
      const taskId = action.payload;
      if (state.items[taskId]) {
        state.items[taskId].assigneeId = null;
        state.items[taskId].updatedAt = Date.now();
      }
    },
    setTaskStatus: (state, action) => {
      const { taskId, status } = action.payload;
      if (state.items[taskId]) {
        state.items[taskId].status = status;
        state.items[taskId].updatedAt = Date.now();
        
        if (status === 'completed') {
          state.items[taskId].completedAt = Date.now();
        }
      }
    },
    setFilter: (state, action) => {
      const { filterType, value } = action.payload;
      state.filter[filterType] = value;
    },
    clearFilters: (state) => {
      state.filter = {
        status: 'all',
        priority: 'all',
        assignee: 'all',
        projectId: 'all',
      };
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  assignTaskToMember,
  unassignTask,
  setTaskStatus,
  setFilter,
  clearFilters,
} = tasksSlice.actions;

// 기본 선택자들
export const selectAllTasks = (state) =>
  state.tasks.ids.map(id => state.tasks.items[id]);

export const selectTaskById = (state, taskId) =>
  state.tasks.items[taskId];

export const selectTaskFilter = (state) => state.tasks.filter;

// 복잡한 선택자들 - createSelector 사용으로 메모이제이션
export const selectFilteredTasks = createSelector(
  [selectAllTasks, selectTaskFilter, (state) => state.members, (state) => state.projects],
  (tasks, filter, membersState, projectsState) => {
    return tasks.filter(task => {
      // 상태 필터
      if (filter.status !== 'all' && task.status !== filter.status) {
        return false;
      }
      
      // 우선순위 필터
      if (filter.priority !== 'all' && task.priority !== filter.priority) {
        return false;
      }
      
      // 담당자 필터
      if (filter.assignee !== 'all') {
        if (filter.assignee === 'unassigned' && task.assigneeId) {
          return false;
        }
        if (filter.assignee !== 'unassigned' && task.assigneeId !== filter.assignee) {
          return false;
        }
      }
      
      // 프로젝트 필터
      if (filter.projectId !== 'all' && task.projectId !== filter.projectId) {
        return false;
      }
      
      return true;
    });
  }
);

export const selectTasksByProject = createSelector(
  [(state) => state.tasks.assignmentsByProject, (state) => state.tasks.items, (_, projectId) => projectId],
  (assignmentsByProject, tasksItems, projectId) => {
    const taskIds = assignmentsByProject[projectId] || [];
    return taskIds.map(id => tasksItems[id]).filter(Boolean);
  }
);

export const selectTasksCount = createSelector(
  [selectAllTasks],
  (tasks) => ({
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    unassigned: tasks.filter(t => !t.assigneeId).length,
  })
);

export const selectTasksByMember = createSelector(
  [selectAllTasks, (_, memberId) => memberId],
  (tasks, memberId) => tasks.filter(task => task.assigneeId === memberId)
);

export const selectTasksByStatus = createSelector(
  [selectAllTasks, (_, status) => status],
  (tasks, status) => tasks.filter(task => task.status === status)
);

// 크로스 슬라이스 선택자 - tasks와 members를 결합
export const selectTasksWithAssignees = createSelector(
  [selectAllTasks, (state) => state.members.items],
  (tasks, membersItems) => {
    return tasks.map(task => ({
      ...task,
      assignee: task.assigneeId ? membersItems[task.assigneeId] : null,
    }));
  }
);

// 크로스 슬라이스 선택자 - tasks, members, projects를 모두 결합
export const selectEnrichedTasks = createSelector(
  [selectAllTasks, (state) => state.members.items, (state) => state.projects.items],
  (tasks, membersItems, projectsItems) => {
    return tasks.map(task => ({
      ...task,
      assignee: task.assigneeId ? membersItems[task.assigneeId] : null,
      project: task.projectId ? projectsItems[task.projectId] : null,
    }));
  }
);

export default tasksSlice.reducer;