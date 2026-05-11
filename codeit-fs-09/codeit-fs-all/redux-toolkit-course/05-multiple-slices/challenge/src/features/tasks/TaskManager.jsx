import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addTask,
  updateTask,
  deleteTask,
  assignTaskToMember,
  setTaskStatus,
  setFilter,
  clearFilters,
  selectFilteredTasks,
  selectTaskFilter,
  selectTasksCount,
  selectEnrichedTasks,
} from './tasksSlice';
import {
  selectAllProjects,
} from '@/features/projects/projectsSlice';
import {
  selectAllMembers,
} from '@/features/members/membersSlice';
import styles from './TaskManager.module.css';

function TaskManager() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    projectId: '',
    assigneeId: '',
  });

  const filteredTasks = useSelector(selectFilteredTasks);
  const enrichedTasks = useSelector(selectEnrichedTasks);
  const taskFilter = useSelector(selectTaskFilter);
  const tasksCount = useSelector(selectTasksCount);
  const projects = useSelector(selectAllProjects);
  const members = useSelector(selectAllMembers);

  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    if (formData.title.trim()) {
      const taskData = {
        ...formData,
        title: formData.title.trim(),
        projectId: formData.projectId || null,
        assigneeId: formData.assigneeId || null,
      };
      dispatch(addTask(taskData));
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        projectId: '',
        assigneeId: '',
      });
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleFilterChange(filterType, value) {
    dispatch(setFilter({ filterType, value }));
  }

  function handleStatusChange(taskId, newStatus) {
    dispatch(setTaskStatus({ taskId, status: newStatus }));
  }

  function handleAssigneeChange(taskId, memberId) {
    if (memberId) {
      dispatch(assignTaskToMember({ taskId, memberId }));
    }
  }

  function getStatusBadgeClass(status) {
    const statusMap = {
      pending: 'warning',
      'in-progress': 'info',
      completed: 'success',
    };
    return statusMap[status] || 'info';
  }

  function getPriorityBadgeClass(priority) {
    const priorityMap = {
      low: 'info',
      medium: 'warning',
      high: 'danger',
    };
    return priorityMap[priority] || 'info';
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>할 일 관리</h2>
      </div>

      {/* 통계 */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{tasksCount.total}</div>
          <div className="stat-label">전체 할 일</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{tasksCount.pending}</div>
          <div className="stat-label">대기중</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{tasksCount.inProgress}</div>
          <div className="stat-label">진행중</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{tasksCount.completed}</div>
          <div className="stat-label">완료</div>
        </div>
      </div>

      {/* 새 할 일 추가 폼 */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <h3>새 할 일 생성</h3>
        <div className={styles.formRow}>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="할 일 제목"
            className="input"
            required
          />
          <select
            name="priority"
            value={formData.priority}
            onChange={handleInputChange}
            className="select"
          >
            <option value="low">낮은 우선순위</option>
            <option value="medium">보통 우선순위</option>
            <option value="high">높은 우선순위</option>
          </select>
        </div>
        
        <div className={styles.formRow}>
          <select
            name="projectId"
            value={formData.projectId}
            onChange={handleInputChange}
            className="select"
          >
            <option value="">프로젝트 선택 (선택사항)</option>
            {projects.map(project => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
          <select
            name="assigneeId"
            value={formData.assigneeId}
            onChange={handleInputChange}
            className="select"
          >
            <option value="">담당자 선택 (선택사항)</option>
            {members.map(member => (
              <option key={member.id} value={member.id}>
                {member.name} ({member.role})
              </option>
            ))}
          </select>
        </div>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="할 일 설명"
          className={styles.textarea}
          rows="3"
        />
        
        <button type="submit" className="button">
          할 일 생성
        </button>
      </form>

      {/* 필터 */}
      <div className={styles.filters}>
        <h3>필터</h3>
        <div className={styles.filterRow}>
          <div className={styles.filterGroup}>
            <label>상태:</label>
            <select
              value={taskFilter.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="select"
            >
              <option value="all">전체</option>
              <option value="pending">대기중</option>
              <option value="in-progress">진행중</option>
              <option value="completed">완료</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label>우선순위:</label>
            <select
              value={taskFilter.priority}
              onChange={(e) => handleFilterChange('priority', e.target.value)}
              className="select"
            >
              <option value="all">전체</option>
              <option value="low">낮음</option>
              <option value="medium">보통</option>
              <option value="high">높음</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label>프로젝트:</label>
            <select
              value={taskFilter.projectId}
              onChange={(e) => handleFilterChange('projectId', e.target.value)}
              className="select"
            >
              <option value="all">전체</option>
              {projects.map(project => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label>담당자:</label>
            <select
              value={taskFilter.assignee}
              onChange={(e) => handleFilterChange('assignee', e.target.value)}
              className="select"
            >
              <option value="all">전체</option>
              <option value="unassigned">미할당</option>
              {members.map(member => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => dispatch(clearFilters())}
            className="button"
          >
            필터 초기화
          </button>
        </div>
      </div>

      {/* 할 일 목록 */}
      <div className={styles.taskList}>
        <h3>할 일 목록 ({filteredTasks.length}개)</h3>
        {filteredTasks.length === 0 ? (
          <div className={styles.emptyState}>
            조건에 맞는 할 일이 없습니다.
          </div>
        ) : (
          filteredTasks.map(task => {
            const enrichedTask = enrichedTasks.find(t => t.id === task.id);
            return (
              <div key={task.id} className={`card ${styles.taskCard}`}>
                <div className={styles.taskHeader}>
                  <h4 className={styles.taskTitle}>
                    {task.title}
                    <span className={`badge ${getStatusBadgeClass(task.status)}`}>
                      {task.status}
                    </span>
                    <span className={`badge ${getPriorityBadgeClass(task.priority)}`}>
                      {task.priority}
                    </span>
                  </h4>
                  
                  <div className={styles.taskActions}>
                    <select
                      value={task.status}
                      onChange={(e) => handleStatusChange(task.id, e.target.value)}
                      className="select"
                    >
                      <option value="pending">대기중</option>
                      <option value="in-progress">진행중</option>
                      <option value="completed">완료</option>
                    </select>
                    
                    <button
                      onClick={() => dispatch(deleteTask(task.id))}
                      className="button"
                      style={{ backgroundColor: '#f56565', color: 'white' }}
                    >
                      삭제
                    </button>
                  </div>
                </div>

                {task.description && (
                  <p className={styles.taskDescription}>{task.description}</p>
                )}

                <div className={styles.taskMeta}>
                  <div className={styles.taskInfo}>
                    {enrichedTask?.project && (
                      <span className="badge info">
                        📁 {enrichedTask.project.name}
                      </span>
                    )}
                    {enrichedTask?.assignee && (
                      <span className="badge success">
                        👤 {enrichedTask.assignee.name}
                      </span>
                    )}
                    {!task.assigneeId && (
                      <span className="badge warning">미할당</span>
                    )}
                  </div>
                  
                  <div className={styles.taskDates}>
                    <small>
                      생성: {new Date(task.createdAt).toLocaleDateString('ko-KR')}
                    </small>
                    {task.completedAt && (
                      <small>
                        완료: {new Date(task.completedAt).toLocaleDateString('ko-KR')}
                      </small>
                    )}
                  </div>
                </div>

                {/* 담당자 변경 */}
                <div className={styles.assigneeSection}>
                  <label>담당자 변경:</label>
                  <select
                    value={task.assigneeId || ''}
                    onChange={(e) => handleAssigneeChange(task.id, e.target.value)}
                    className="select"
                  >
                    <option value="">미할당</option>
                    {members.map(member => (
                      <option key={member.id} value={member.id}>
                        {member.name} ({member.role})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default TaskManager;