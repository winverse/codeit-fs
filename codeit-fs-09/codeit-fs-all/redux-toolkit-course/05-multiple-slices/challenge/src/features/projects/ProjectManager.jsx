import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchProjects,
  createProject,
  updateProjectStatus,
  selectProject,
  deleteProject,
  selectAllProjects,
  selectSelectedProject,
  selectProjectsLoading,
  selectProjectsError,
  selectProjectsCount,
} from './projectsSlice';
import styles from './ProjectManager.module.css';

function ProjectManager() {
  const [formData, setFormData] = useState({
    name: '',
    priority: 'medium',
    description: '',
  });
  
  const projects = useSelector(selectAllProjects);
  const selectedProject = useSelector(selectSelectedProject);
  const loading = useSelector(selectProjectsLoading);
  const error = useSelector(selectProjectsError);
  const projectsCount = useSelector(selectProjectsCount);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  function handleSubmit(e) {
    e.preventDefault();
    if (formData.name.trim()) {
      dispatch(createProject(formData));
      setFormData({ name: '', priority: 'medium', description: '' });
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleStatusChange(projectId, newStatus) {
    dispatch(updateProjectStatus({ id: projectId, status: newStatus }));
  }

  function getStatusBadgeClass(status) {
    const statusMap = {
      planning: 'info',
      active: 'success',
      completed: 'warning',
      cancelled: 'danger'
    };
    return statusMap[status] || 'info';
  }

  function getPriorityBadgeClass(priority) {
    const priorityMap = {
      low: 'info',
      medium: 'warning',
      high: 'danger'
    };
    return priorityMap[priority] || 'info';
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <h2>프로젝트 관리</h2>
        <div className={styles.loading}>로딩 중...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>프로젝트 관리</h2>
        {error && (
          <div className={styles.error}>
            오류: {error}
          </div>
        )}
      </div>

      {/* 프로젝트 통계 */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{projectsCount.total}</div>
          <div className="stat-label">전체 프로젝트</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{projectsCount.active}</div>
          <div className="stat-label">진행중</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{projectsCount.planning}</div>
          <div className="stat-label">계획중</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{projectsCount.completed}</div>
          <div className="stat-label">완료</div>
        </div>
      </div>

      {/* 새 프로젝트 추가 폼 */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <h3>새 프로젝트 생성</h3>
        <div className={styles.formRow}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="프로젝트 이름"
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
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="프로젝트 설명"
          className={styles.textarea}
          rows="3"
        />
        <button type="submit" className="button" disabled={loading}>
          {loading ? '생성 중...' : '프로젝트 생성'}
        </button>
      </form>

      {/* 프로젝트 목록 */}
      <div className={styles.projectList}>
        <h3>프로젝트 목록</h3>
        {projects.length === 0 ? (
          <div className={styles.emptyState}>
            프로젝트가 없습니다. 새로운 프로젝트를 생성해보세요!
          </div>
        ) : (
          projects.map(project => (
            <div 
              key={project.id} 
              className={`card ${styles.projectCard} ${
                selectedProject?.id === project.id ? styles.selected : ''
              }`}
              onClick={() => dispatch(selectProject(project.id))}
            >
              <div className={styles.projectHeader}>
                <h4 className={styles.projectName}>
                  {project.name}
                  <span className={`badge ${getStatusBadgeClass(project.status)}`}>
                    {project.status}
                  </span>
                  <span className={`badge ${getPriorityBadgeClass(project.priority)}`}>
                    {project.priority}
                  </span>
                </h4>
                <div className={styles.projectActions}>
                  <select
                    value={project.status}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleStatusChange(project.id, e.target.value);
                    }}
                    className="select"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <option value="planning">계획중</option>
                    <option value="active">진행중</option>
                    <option value="completed">완료</option>
                    <option value="cancelled">취소</option>
                  </select>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(deleteProject(project.id));
                    }}
                    className="button"
                    style={{ backgroundColor: '#f56565', color: 'white' }}
                  >
                    삭제
                  </button>
                </div>
              </div>
              
              {project.description && (
                <p className={styles.projectDescription}>{project.description}</p>
              )}
              
              <div className={styles.projectMeta}>
                <small>생성일: {new Date(project.createdAt).toLocaleDateString('ko-KR')}</small>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 선택된 프로젝트 상세 정보 */}
      {selectedProject && (
        <div className={styles.selectedProject}>
          <h3>선택된 프로젝트</h3>
          <div className="card">
            <h4>{selectedProject.name}</h4>
            <div className={styles.projectDetails}>
              <p><strong>상태:</strong> {selectedProject.status}</p>
              <p><strong>우선순위:</strong> {selectedProject.priority}</p>
              <p><strong>생성일:</strong> {new Date(selectedProject.createdAt).toLocaleDateString('ko-KR')}</p>
              {selectedProject.description && (
                <p><strong>설명:</strong> {selectedProject.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectManager;