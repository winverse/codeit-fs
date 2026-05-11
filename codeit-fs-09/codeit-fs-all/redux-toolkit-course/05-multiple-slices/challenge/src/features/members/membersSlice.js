import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit';

// 가상 API 시뮬레이션
const simulateApiCall = (data, delay = 300) => 
  new Promise((resolve) => setTimeout(() => resolve(data), delay));

export const fetchMembers = createAsyncThunk(
  'members/fetchMembers',
  async () => {
    const response = await simulateApiCall([
      { 
        id: '1', 
        name: '김개발', 
        email: 'kim@example.com', 
        role: 'developer', 
        status: 'active',
        joinedAt: Date.now() - 86400000 * 30,
        avatar: '👨‍💻'
      },
      { 
        id: '2', 
        name: '이디자인', 
        email: 'lee@example.com', 
        role: 'designer', 
        status: 'active',
        joinedAt: Date.now() - 86400000 * 15,
        avatar: '👩‍🎨'
      },
      { 
        id: '3', 
        name: '박매니저', 
        email: 'park@example.com', 
        role: 'manager', 
        status: 'busy',
        joinedAt: Date.now() - 86400000 * 60,
        avatar: '👨‍💼'
      },
    ]);
    return response;
  }
);

export const addMember = createAsyncThunk(
  'members/addMember',
  async (memberData) => {
    const newMember = {
      id: nanoid(),
      ...memberData,
      joinedAt: Date.now(),
      status: 'active',
    };
    await simulateApiCall(newMember);
    return newMember;
  }
);

const initialState = {
  items: {},
  ids: [],
  loading: false,
  error: null,
  selectedMemberId: null,
  roleFilter: 'all', // 'all', 'developer', 'designer', 'manager'
  statusFilter: 'all', // 'all', 'active', 'busy', 'offline'
};

const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    selectMember: (state, action) => {
      state.selectedMemberId = action.payload;
    },
    updateMember: (state, action) => {
      const { id, updates } = action.payload;
      if (state.items[id]) {
        Object.assign(state.items[id], updates);
      }
    },
    removeMember: (state, action) => {
      const id = action.payload;
      delete state.items[id];
      state.ids = state.ids.filter(memberId => memberId !== id);
      if (state.selectedMemberId === id) {
        state.selectedMemberId = null;
      }
    },
    setMemberStatus: (state, action) => {
      const { memberId, status } = action.payload;
      if (state.items[memberId]) {
        state.items[memberId].status = status;
      }
    },
    setRoleFilter: (state, action) => {
      state.roleFilter = action.payload;
    },
    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload;
    },
    clearFilters: (state) => {
      state.roleFilter = 'all';
      state.statusFilter = 'all';
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchMembers
      .addCase(fetchMembers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = {};
        state.ids = [];
        action.payload.forEach(member => {
          state.items[member.id] = member;
          state.ids.push(member.id);
        });
      })
      .addCase(fetchMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // addMember
      .addCase(addMember.pending, (state) => {
        state.loading = true;
      })
      .addCase(addMember.fulfilled, (state, action) => {
        state.loading = false;
        const member = action.payload;
        state.items[member.id] = member;
        state.ids.push(member.id);
      })
      .addCase(addMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  selectMember,
  updateMember,
  removeMember,
  setMemberStatus,
  setRoleFilter,
  setStatusFilter,
  clearFilters,
  clearError,
} = membersSlice.actions;

// 선택자들
export const selectAllMembers = (state) =>
  state.members.ids.map(id => state.members.items[id]);

export const selectMemberById = (state, memberId) =>
  state.members.items[memberId];

export const selectSelectedMember = (state) =>
  state.members.selectedMemberId ? state.members.items[state.members.selectedMemberId] : null;

export const selectMembersLoading = (state) => state.members.loading;
export const selectMembersError = (state) => state.members.error;

export const selectFilteredMembers = (state) => {
  const members = selectAllMembers(state);
  const { roleFilter, statusFilter } = state.members;
  
  return members.filter(member => {
    const roleMatch = roleFilter === 'all' || member.role === roleFilter;
    const statusMatch = statusFilter === 'all' || member.status === statusFilter;
    return roleMatch && statusMatch;
  });
};

export const selectMembersByRole = (state, role) =>
  selectAllMembers(state).filter(member => member.role === role);

export const selectMembersByStatus = (state, status) =>
  selectAllMembers(state).filter(member => member.status === status);

export const selectMembersCount = (state) => {
  const members = selectAllMembers(state);
  return {
    total: members.length,
    active: members.filter(m => m.status === 'active').length,
    busy: members.filter(m => m.status === 'busy').length,
    offline: members.filter(m => m.status === 'offline').length,
    developers: members.filter(m => m.role === 'developer').length,
    designers: members.filter(m => m.role === 'designer').length,
    managers: members.filter(m => m.role === 'manager').length,
  };
};

export default membersSlice.reducer;