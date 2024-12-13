import withAndroidSDK52 from "./SDK/52/android";

//@ts-ignore
export default (config, options) => {
  console.log(config)
  switch (config.sdkVersion) {
    case '52.0.0':
      if (config.platform === 'android') {
        return withAndroidSDK52(config, options);
      }

    case '51.0.0':
      if (config.platform === 'android') {
        return withAndroidSDK52(config, options);
      }

    case '50.0.0':
      if (config.platform === 'android') {
        return withAndroidSDK52(config, options);
      }

    default:
      if (config.platform === 'android') {
        return withAndroidSDK52(config, options);
      }
  }
};