export interface FeatureFlags {
  readonly analyticsPremium: boolean;
  readonly manualGameDataProvider: boolean;
}

export const defaultFeatureFlags: FeatureFlags = {
  analyticsPremium: false,
  manualGameDataProvider: true,
};
