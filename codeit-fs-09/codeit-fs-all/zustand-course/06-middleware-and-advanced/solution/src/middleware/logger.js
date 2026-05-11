export const logger =
  (config, options = {}) =>
  (set, get, api) => {
    const {
      enabled = process.env.NODE_ENV === "development",
      actionFilter = () => true,
      stateFilter = () => true,
      collapsed = true,
      colors = {
        title: "#1976d2",
        prevState: "#9e9e9e",
        action: "#03a9f4",
        nextState: "#4caf50",
        error: "#f20404",
      },
    } = options;

    if (!enabled) {
      return config(set, get, api);
    }

    const loggedSet = (...args) => {
      const prevState = get();
      const start = Date.now();

      try {
        const result = set(...args);
        const nextState = get();
        const duration = Date.now() - start;

        // 상태가 실제로 변경되었을 때만 로그
        if (prevState !== nextState && stateFilter(nextState, prevState)) {
          logStateChange(
            prevState,
            nextState,
            args,
            duration,
            colors,
            collapsed
          );
        }

        return result;
      } catch (error) {
        logError(error, args, colors);
        throw error;
      }
    };

    return config(loggedSet, get, api);
  };

function logStateChange(
  prevState,
  nextState,
  args,
  duration,
  colors,
  collapsed
) {
  const actionName = getActionName(args);
  const groupTitle = `🔄 ${actionName} (${duration}ms)`;

  if (collapsed) {
    console.groupCollapsed(
      `%c${groupTitle}`,
      `color: ${colors.title}; font-weight: bold;`
    );
  } else {
    console.group(
      `%c${groupTitle}`,
      `color: ${colors.title}; font-weight: bold;`
    );
  }

  console.log(
    "%cPrev State:",
    `color: ${colors.prevState}; font-weight: bold;`,
    prevState
  );
  console.log("%cAction:", `color: ${colors.action}; font-weight: bold;`, args);
  console.log(
    "%cNext State:",
    `color: ${colors.nextState}; font-weight: bold;`,
    nextState
  );

  // 상태 차이 하이라이트
  const diff = getStateDiff(prevState, nextState);
  if (Object.keys(diff).length > 0) {
    console.log(
      "%cChanged:",
      `color: ${colors.action}; font-weight: bold;`,
      diff
    );
  }

  console.groupEnd();
}

function logError(error, args, colors) {
  console.group(
    `%c❌ Action Error`,
    `color: ${colors.error}; font-weight: bold;`
  );
  console.log("%cAction:", `color: ${colors.action}; font-weight: bold;`, args);
  console.log("%cError:", `color: ${colors.error}; font-weight: bold;`, error);
  console.groupEnd();
}

function getActionName(args) {
  if (typeof args[0] === "function") {
    return "Function Update";
  }

  if (typeof args[0] === "object") {
    const keys = Object.keys(args[0]);
    return keys.length === 1
      ? `Update ${keys[0]}`
      : `Update Multiple (${keys.join(", ")})`;
  }

  return "Unknown Action";
}

function getStateDiff(prev, next) {
  const diff = {};

  Object.keys(next).forEach((key) => {
    if (prev[key] !== next[key]) {
      diff[key] = { from: prev[key], to: next[key] };
    }
  });

  return diff;
}