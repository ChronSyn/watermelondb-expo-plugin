import { ExpoConfig } from "@expo/config-types";
import { withAndroidSDK52, Options as SDK52Options } from "./SDK/52/android";

type Options =
  | SDK52Options

export default (config: ExpoConfig, options: Options) => {
  switch (config.sdkVersion) {
    case '52.0.0':
      return withAndroidSDK52(config, options);
    default:
      return withAndroidSDK52(config, options);
  }
};