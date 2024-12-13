import minimist from "minimist";
import { withAndroidSDK52 } from "./SDK/52/android";

const args = minimist(process.argv.slice(2));

//@ts-ignore
export default (config, options) => {
  
  const PLATFORM = args.platform;
  switch (config.sdkVersion) {
    case '52.0.0':
      if (PLATFORM === 'android') {
        return withAndroidSDK52(config, options);
      }

    case '51.0.0':
      if (PLATFORM === 'android') {
        return withAndroidSDK52(config, options);
      }

    case '50.0.0':
      if (PLATFORM === 'android') {
        return withAndroidSDK52(config, options);
      }

    default:
      if (PLATFORM === 'android') {
        return withAndroidSDK52(config, options);
      }
  }
};