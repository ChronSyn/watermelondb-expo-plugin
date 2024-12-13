import { ExpoConfig } from "@expo/config-types";
type Options = {
    disableJsi?: boolean;
    databases?: string[];
    excludeSimArch?: boolean;
};
export declare const withAndroidSDK52: (config: ExpoConfig, options: Options) => ExpoConfig;
export {};
