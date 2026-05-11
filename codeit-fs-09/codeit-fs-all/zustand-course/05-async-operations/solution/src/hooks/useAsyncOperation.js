import { useState, useCallback, useRef, useEffect } from "react";

export function useAsyncOperation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const abortControllerRef = useRef(null);

  const execute = useCallback(async (asyncFunction, ...args) => {
    // 이전 요청이 있다면 취소
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // 새로운 AbortController 생성
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setLoading(true);
    setError(null);

    try {
      const result = await asyncFunction(
        {
          signal: abortController.signal,
          ...args[0],
        },
        ...args.slice(1)
      );

      // 요청이 취소되지 않았다면 결과 저장
      if (!abortController.signal.aborted) {
        setData(result);
        setLoading(false);
        return result;
      }
    } catch (err) {
      if (!abortController.signal.aborted) {
        setError(err.message);
        setLoading(false);
        throw err;
      }
    }
  }, []);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setData(null);
  }, []);

  // 컴포넌트 언마운트 시 요청 취소
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    loading,
    error,
    data,
    execute,
    reset,
  };
}

export function useAsyncOperationWithRetry(maxRetries = 3, retryDelay = 1000) {
  const baseHook = useAsyncOperation();
  const [retryCount, setRetryCount] = useState(0);

  const executeWithRetry = useCallback(
    async (asyncFunction, ...args) => {
      let lastError = null;

      for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
          const result = await baseHook.execute(asyncFunction, ...args);
          setRetryCount(0); // 성공 시 재시도 카운트 초기화
          return result;
        } catch (error) {
          lastError = error;
          setRetryCount(attempt + 1);

          // 마지막 시도가 아니라면 대기 후 재시도
          if (attempt < maxRetries) {
            await new Promise((resolve) =>
              setTimeout(resolve, retryDelay * Math.pow(2, attempt))
            ); // 지수 백오프
          }
        }
      }

      throw lastError;
    },
    [baseHook.execute, maxRetries, retryDelay]
  );

  return {
    ...baseHook,
    execute: executeWithRetry,
    retryCount,
    maxRetries,
  };
}