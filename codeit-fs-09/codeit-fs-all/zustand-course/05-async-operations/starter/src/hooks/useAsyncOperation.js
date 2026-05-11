import { useState, useCallback, useRef, useEffect } from "react";

export function useAsyncOperation() {
  // TODO: Implement useAsyncOperation hook as per README.md
  return { loading: false, error: null, data: null, execute: () => {}, reset: () => {} };
}

export function useAsyncOperationWithRetry(maxRetries = 3, retryDelay = 1000) {
  // TODO: Implement useAsyncOperationWithRetry hook as per README.md
  const baseHook = useAsyncOperation();
  return { ...baseHook, execute: baseHook.execute, retryCount: 0, maxRetries };
}