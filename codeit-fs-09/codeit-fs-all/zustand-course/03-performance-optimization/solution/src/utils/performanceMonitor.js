const renderCounts = new Map();

export function trackRender(componentName) {
  const count = renderCounts.get(componentName) || 0;
  renderCounts.set(componentName, count + 1);

  console.log(`🔄 ${componentName} 렌더링 #${count + 1}`);
}

export function getRenderStats() {
  return Object.fromEntries(renderCounts);
}

export function resetRenderStats() {
  renderCounts.clear();
}

export function withPerformanceTracking(Component, componentName) {
  return function PerformanceTrackedComponent(props) {
    trackRender(componentName);
    return <Component {...props} />;
  };
}