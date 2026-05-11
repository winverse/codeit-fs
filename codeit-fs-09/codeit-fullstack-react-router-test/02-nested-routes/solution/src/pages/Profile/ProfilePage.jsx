import { NavLink, Outlet } from 'react-router';

export function ProfilePage() {
  return (
    <div>
      <h2>프로필</h2>
      <nav style={{ display: 'flex', gap: '1rem', padding: '1rem 0' }}>
        <NavLink
          to="/profile"
          end={true}
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          내 정보
        </NavLink>
        <NavLink
          to="/profile/edit"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          정보 수정
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
}
