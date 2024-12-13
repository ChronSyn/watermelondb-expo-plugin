"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withAndroidSDK52 = void 0;
const config_plugins_1 = require("@expo/config-plugins");
const fs_1 = __importDefault(require("fs"));
const args = process.argv.slice(2);
console.log({ args });
function settingGradle(gradleConfig) {
    return (0, config_plugins_1.withSettingsGradle)(gradleConfig, (mod) => {
        if (!mod.modResults.contents.includes(':watermelondb-jsi')) {
            mod.modResults.contents += `
          include ':watermelondb-jsi'
          project(':watermelondb-jsi').projectDir = new File([
              "node", "--print", 
              "require.resolve('@nozbe/watermelondb/package.json')"
          ].execute(null, rootProject.projectDir).text.trim(), "../native/android-jsi")
        `;
        }
        return mod;
    });
}
function buildGradle(config) {
    return (0, config_plugins_1.withAppBuildGradle)(config, (mod) => {
        if (!mod.modResults.contents.includes("implementation project(':watermelondb-jsi')")) {
            const newContents = mod.modResults.contents.replace('dependencies {', `dependencies {
          implementation project(':watermelondb-jsi')
          `);
            mod.modResults.contents = newContents;
        }
        return mod;
    });
}
function mainApplication(config) {
    return (0, config_plugins_1.withMainApplication)(config, (mod) => {
        if (!mod.modResults.contents.includes("import com.nozbe.watermelondb.jsi.WatermelonDBJSIPackage")) {
            mod.modResults['contents'] = mod.modResults.contents.replace('import android.app.Application', [
                'import android.app.Application',
                'import com.nozbe.watermelondb.jsi.WatermelonDBJSIPackage;',
                // 'import com.facebook.react.bridge.JSIModulePackage;'
            ].join('\n'));
        }
        // Remove getJSIModulePackage method if it exists, for SDK 51+ compatibility
        mod.modResults.contents = mod.modResults.contents.replace(/override fun getJSIModulePackage\(\): JSIModulePackage\s*\{[^}]*\}/s, "");
        return mod;
    });
}
function proGuardRules(config) {
    return (0, config_plugins_1.withDangerousMod)(config, ['android', (config) => {
            const contents = fs_1.default.readFileSync(`${config.modRequest.platformProjectRoot}/app/proguard-rules.pro`, 'utf-8');
            if (!contents.includes("-keep class com.nozbe.watermelondb.** { *; }")) {
                const newContents = `
      ${contents}
      -keep class com.nozbe.watermelondb.** { *; }
      `;
                fs_1.default.writeFileSync(`${config.modRequest.platformProjectRoot}/app/proguard-rules.pro`, newContents);
            }
            return config;
        }]);
}
function withAndroidSDK52(options) {
    return (config) => {
        let currentConfig = config;
        if ((options === null || options === void 0 ? void 0 : options.disableJsi) !== true) {
            currentConfig = settingGradle(config);
            currentConfig = buildGradle(currentConfig);
            currentConfig = proGuardRules(currentConfig);
            currentConfig = mainApplication(currentConfig);
        }
        return currentConfig;
    };
}
exports.withAndroidSDK52 = withAndroidSDK52;
exports.default = (config, options) => {
    return withAndroidSDK52(options)(config);
};
