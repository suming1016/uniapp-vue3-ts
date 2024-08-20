export {};

declare module "vue" {
  interface ComponentCustomProperties {
    $t: (key: string, opt?: Record<string, unknown>) => string;
    $tm: (key: string, opt?: Record<string, unknown>) => [] | { [p: string]: unknown };
  }
}
