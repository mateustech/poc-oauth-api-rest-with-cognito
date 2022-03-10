export function checkConfig(configObject: Record<string, string | undefined>) {
  Object.keys(configObject).forEach((k) => {
    const v = (configObject as any)[k];
    if (v === undefined) {
      throw new Error(`Config is missing ENV Variable ${k} `);
    }
  });
}
