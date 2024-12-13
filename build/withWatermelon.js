"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const android_1 = require("./SDK/52/android");
exports.default = (config, options) => {
    switch (config.sdkVersion) {
        case '52.0.0':
            return (0, android_1.withAndroidSDK52)(config, options);
        default:
            return (0, android_1.withAndroidSDK52)(config, options);
    }
};
