import { Link, useRouter } from '@tanstack/react-router'

export function Breadcrumb() {
  const router = useRouter()
  const matches = router.state.matches

  // 브레드크럼에 표시할 경로들을 생성
  const breadcrumbItems = matches
    .filter(match => match.routeId !== '__root__')
    .map(match => {
      // 라우트 ID를 기반으로 표시명 생성
      const segments = match.routeId.split('/')
      const lastSegment = segments[segments.length - 1]
      
      let title = lastSegment
      if (lastSegment === 'index' || lastSegment === '') {
        title = 'Home'
      } else if (lastSegment.startsWith('$')) {
        // 동적 라우트의 경우 실제 파라미터 값 사용
        const paramName = lastSegment.slice(1)
        title = match.params[paramName] || lastSegment
      } else {
        title = lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1)
      }

      return {
        title,
        pathname: match.pathname,
        isLast: false
      }
    })

  if (breadcrumbItems.length > 0) {
    breadcrumbItems[breadcrumbItems.length - 1].isLast = true
  }

  if (breadcrumbItems.length <= 1) {
    return null
  }

  return (
    <nav className="breadcrumb" aria-label="breadcrumb">
      {breadcrumbItems.map((item, index) => (
        <div key={index} className="breadcrumb-item">
          {item.isLast ? (
            <span className="breadcrumb-current">{item.title}</span>
          ) : (
            <Link to={item.pathname} className="breadcrumb-link">
              {item.title}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}