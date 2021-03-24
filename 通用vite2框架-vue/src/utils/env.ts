import type { GlobEnvConfig } from '/#/config';

import { getConfigFileName } from '../../build/getConfigFileName';

export function getAppEnvConfig() {
  const ENV_NAME = getConfigFileName(import.meta.env);

  const ENV = ((isDevMode()
    ? // Get the global configuration (the configuration will be extracted independently when packaging)
      ((import.meta.env as unknown) as GlobEnvConfig)
    : window[ENV_NAME as any]) as unknown) as GlobEnvConfig;
  return ENV;
}


/**
 * @description: Development model
 */
export const devMode = 'development';

/**
 * @description: Production mode
 */
export const prodMode = 'production';

/**
 * @description: Get environment variables
 * @returns:
 * @example:
 */
export function getEnv(): string {
  return import.meta.env.MODE;
}

/**
 * @description: Is it a development mode
 * @returns:
 * @example:
 */
export function isDevMode(): boolean {
  return import.meta.env.DEV;
}

/**
 * @description: Is it a production mode
 * @returns:
 * @example:
 */
export function isProdMode(): boolean {
  return import.meta.env.PROD;
}