import { z } from "zod"; // 스키마 검증 라이브러리

// 상태 검증 미들웨어
export const validation =
  (schema, options = {}) =>
  (config) =>
  (set, get, api) => {
    const {
      enabled = process.env.NODE_ENV === "development",
      onValidationError = (error) =>
        console.error("State validation failed:", error),
      validateOnSet = true,
      validateOnGet = false,
    } = options;

    if (!enabled) {
      return config(set, get, api);
    }

    const validatedSet = (...args) => {
      const result = set(...args);

      if (validateOnSet) {
        const newState = get();
        const validation = schema.safeParse(newState);

        if (!validation.success) {
          onValidationError(validation.error);

          // 개발 환경에서는 에러 발생
          if (process.env.NODE_ENV === "development") {
            throw new Error(
              `State validation failed: ${validation.error.message}`
            );
          }
        }
      }

      return result;
    };

    const validatedGet = () => {
      const state = get();

      if (validateOnGet) {
        const validation = schema.safeParse(state);

        if (!validation.success) {
          onValidationError(validation.error);
        }
      }

      return state;
    };

    return config(validatedSet, validatedGet, api);
  };

// 사용 예시용 스키마
export const createUserStoreSchema = () =>
  z.object({
    user: z
      .object({
        id: z.number().positive(),
        name: z.string().min(1),
        email: z.string().email(),
      })
      .nullable(),

    preferences: z.object({
      theme: z.enum(["light", "dark"]),
      language: z.string().min(2),
      notifications: z.boolean(),
    }),

    loading: z.boolean(),
    error: z.string().nullable(),
  });