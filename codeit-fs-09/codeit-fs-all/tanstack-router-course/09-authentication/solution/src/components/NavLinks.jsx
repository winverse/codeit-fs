import { Link } from '@tanstack/react-router'

export function NavLink({ to, children, activeOptions, ...props }) {
  return (
    <Link
      to={to}
      activeProps={{
        className: 'nav-link active'
      }}
      inactiveProps={{
        className: 'nav-link'
      }}
      pendingProps={{
        className: 'nav-link pending'
      }}
      activeOptions={activeOptions}
      {...props}
    >
      {children}
    </Link>
  )
}

export function SidebarLink({ to, children, activeOptions, ...props }) {
  return (
    <Link
      to={to}
      activeProps={{
        className: 'sidebar-link active'
      }}
      inactiveProps={{
        className: 'sidebar-link'
      }}
      activeOptions={activeOptions}
      {...props}
    >
      {children}
    </Link>
  )
}

export function TabLink({ to, children, activeOptions, ...props }) {
  return (
    <Link
      to={to}
      activeProps={{
        className: 'tab-link active'
      }}
      inactiveProps={{
        className: 'tab-link'
      }}
      activeOptions={activeOptions}
      {...props}
    >
      {children}
    </Link>
  )
}