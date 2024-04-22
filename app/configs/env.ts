/**
 * Environment
 */
const getEnv = () => {
  console.log("process.env.NEXT_PUBLIC_ENV", process.env.NEXT_PUBLIC_ENV);
  switch (process.env.NEXT_PUBLIC_ENV) {
    case "development":
      return "development";
    case "staging":
      return "staging";
    case "production":
      return "production";
    default:
      return "development";
  }
};
export type Env = "development" | "staging" | "production";
export const env: Env = getEnv();
