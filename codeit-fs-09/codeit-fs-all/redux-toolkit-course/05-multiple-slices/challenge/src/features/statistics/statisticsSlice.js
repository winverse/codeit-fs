import { createSlice, createSelector } from '@reduxjs/toolkit';
import { selectAllTasks } from '@/features/tasks/tasksSlice';
import { selectAllMembers } from '@/features/members/membersSlice';
import { selectAllProjects } from '@/features/projects/projectsSlice';

const initialState = {
  lastUpdated: null,
  period: 'week', // 'day', 'week', 'month'
  isCalculating: false,
};

const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    updateStatistics: (state) => {
      state.lastUpdated = Date.now();
      state.isCalculating = false;
    },
    setPeriod: (state, action) => {
      state.period = action.payload;
    },
    startCalculating: (state) => {
      state.isCalculating = true;
    },
  },
});

export const { updateStatistics, setPeriod, startCalculating } = statisticsSlice.actions;

// 복잡한 통계 선택자들
export const selectOverallStatistics = createSelector(
  [selectAllTasks, selectAllMembers, selectAllProjects],
  (tasks, members, projects) => {
    return {
      totalTasks: tasks.length,
      completedTasks: tasks.filter(t => t.status === 'completed').length,
      inProgressTasks: tasks.filter(t => t.status === 'in-progress').length,
      pendingTasks: tasks.filter(t => t.status === 'pending').length,
      totalMembers: members.length,
      activeMembers: members.filter(m => m.status === 'active').length,
      totalProjects: projects.length,
      activeProjects: projects.filter(p => p.status === 'active').length,
      completedProjects: projects.filter(p => p.status === 'completed').length,
    };
  }
);

export const selectProductivityStats = createSelector(
  [selectAllTasks, selectAllMembers, (state) => state.statistics.period],
  (tasks, members, period) => {
    const now = Date.now();
    const periodMap = {
      day: 86400000, // 1일
      week: 86400000 * 7, // 7일
      month: 86400000 * 30, // 30일
    };
    
    const periodStart = now - periodMap[period];
    const periodTasks = tasks.filter(task => 
      task.createdAt >= periodStart || 
      (task.completedAt && task.completedAt >= periodStart)
    );
    
    const completedInPeriod = periodTasks.filter(task => 
      task.completedAt && task.completedAt >= periodStart
    );
    
    const completionRate = periodTasks.length > 0 
      ? (completedInPeriod.length / periodTasks.length * 100).toFixed(1)
      : 0;
    
    return {
      period,
      tasksCreated: periodTasks.length,
      tasksCompleted: completedInPeriod.length,
      completionRate: parseFloat(completionRate),
      averageTasksPerMember: members.length > 0 
        ? (periodTasks.length / members.length).toFixed(1)
        : 0,
    };
  }
);

export const selectMemberWorkload = createSelector(
  [selectAllTasks, selectAllMembers],
  (tasks, members) => {
    return members.map(member => {
      const memberTasks = tasks.filter(task => task.assigneeId === member.id);
      const completedTasks = memberTasks.filter(task => task.status === 'completed');
      const inProgressTasks = memberTasks.filter(task => task.status === 'in-progress');
      const pendingTasks = memberTasks.filter(task => task.status === 'pending');
      
      return {
        member,
        totalTasks: memberTasks.length,
        completedTasks: completedTasks.length,
        inProgressTasks: inProgressTasks.length,
        pendingTasks: pendingTasks.length,
        completionRate: memberTasks.length > 0 
          ? (completedTasks.length / memberTasks.length * 100).toFixed(1)
          : 0,
        workload: inProgressTasks.length + pendingTasks.length,
      };
    });
  }
);

export const selectProjectProgress = createSelector(
  [selectAllProjects, selectAllTasks],
  (projects, tasks) => {
    return projects.map(project => {
      const projectTasks = tasks.filter(task => task.projectId === project.id);
      const completedTasks = projectTasks.filter(task => task.status === 'completed');
      const inProgressTasks = projectTasks.filter(task => task.status === 'in-progress');
      
      const progress = projectTasks.length > 0 
        ? (completedTasks.length / projectTasks.length * 100).toFixed(1)
        : 0;
      
      return {
        project,
        totalTasks: projectTasks.length,
        completedTasks: completedTasks.length,
        inProgressTasks: inProgressTasks.length,
        progress: parseFloat(progress),
      };
    });
  }
);

export const selectTaskDistribution = createSelector(
  [selectAllTasks],
  (tasks) => {
    const distribution = {
      byStatus: {
        pending: 0,
        'in-progress': 0,
        completed: 0,
      },
      byPriority: {
        low: 0,
        medium: 0,
        high: 0,
      },
    };
    
    tasks.forEach(task => {
      distribution.byStatus[task.status] = (distribution.byStatus[task.status] || 0) + 1;
      distribution.byPriority[task.priority] = (distribution.byPriority[task.priority] || 0) + 1;
    });
    
    return distribution;
  }
);

// 통계 새로고침을 위한 액션 크리에이터
export const refreshStatistics = () => (dispatch, getState) => {
  dispatch(startCalculating());
  
  // 가상의 계산 지연 시뮬레이션
  setTimeout(() => {
    dispatch(updateStatistics());
  }, 500);
};

export default statisticsSlice.reducer;