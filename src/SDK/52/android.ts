import {
  withDangerousMod,
  withSettingsGradle,
  withAppBuildGradle,
  withMainApplication,
  ExportedConfigWithProps,
  withGradleProperties,
} from "@expo/config-plugins";
import { ExpoConfig } from "@expo/config-types";
import fs from "fs";

function settingGradle(gradleConfig: ExpoConfig): ExpoConfig {
  return withSettingsGradle(gradleConfig, (mod) => {
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
  }) as ExpoConfig;
}

function buildGradle(config: ExpoConfig): ExpoConfig {
  return withAppBuildGradle(config, (mod) => {
    if (!mod.modResults.contents.includes("implementation project(':watermelondb-jsi')")) {
      const newContents = mod.modResults.contents.replace(
          'dependencies {',
          `dependencies {
          implementation project(':watermelondb-jsi')
          `
      )
      mod.modResults.contents = newContents;
    }

    return mod;
  }) as ExpoConfig;
}

function mainApplication(config: ExpoConfig): ExpoConfig {
  return withMainApplication(config, (mod) => {
    if (!mod.modResults.contents.includes("import com.nozbe.watermelondb.jsi.WatermelonDBJSIPackage")) {
      mod.modResults['contents'] = mod.modResults.contents.replace(
        'import android.app.Application',
        [
          'import android.app.Application',
          'import com.nozbe.watermelondb.jsi.WatermelonDBJSIPackage;',
          // 'import com.facebook.react.bridge.JSIModulePackage;'
        ].join('\n')
      );
    }

    // Remove getJSIModulePackage method if it exists, for SDK 51+ compatibility
    mod.modResults.contents = mod.modResults.contents.replace(/override fun getJSIModulePackage\(\): JSIModulePackage\s*\{[^}]*\}/s, "");

    return mod;
  }) as ExpoConfig;
}

function proGuardRules(config: ExpoConfig): ExpoConfig {
  return withDangerousMod(config, ['android', (config) => {
    const contents = fs.readFileSync(`${config.modRequest.platformProjectRoot}/app/proguard-rules.pro`, 'utf-8');
    if (!contents.includes("-keep class com.nozbe.watermelondb.** { *; }")) {
      const newContents = `
      ${contents}
      -keep class com.nozbe.watermelondb.** { *; }
      `

      fs.writeFileSync(`${config.modRequest.platformProjectRoot}/app/proguard-rules.pro`, newContents);
    }

    return config;
  }]) as ExpoConfig;
}

// @ts-ignore
export function withAndroidSDK52(options: Options) {
  return (config: ExpoConfig): ExpoConfig => {
    let currentConfig: ExpoConfig = config;
    if (options?.disableJsi !== true) {
      currentConfig = settingGradle(config);
      currentConfig = buildGradle(currentConfig);
      currentConfig = proGuardRules(currentConfig);
      currentConfig = mainApplication(currentConfig);
    }

    return currentConfig as ExpoConfig;
  }
}

// @ts-ignore
export default (config, options) => {
  return withAndroidSDK52(options)(config);
};
