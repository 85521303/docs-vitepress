> 本篇文章用于记录在Vue3的学习和开发过程中遇到的各种各样的配置类问题。

# eslint配置失效

```javascript
// eslint.config.ts

import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
        {
	    name: 'app/files-to-lint',
	    files: ['**/*.{ts,mts,tsx,vue}'],
	    rules: {
	    	'vue/valid-template-root': 'off',
    		'@typescript-eslint/no-unused-vars': 'off',
		    'vue/multi-word-component-names': 'off',
	    },
	},
	globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

	pluginVue.configs['flat/essential'],
	vueTsConfigs.recommended,
	skipFormatting,

)
```

在上面的 `eslint`配置中，我设置了三项 `eslint`检查为 `off`。但是发现并未生效。
**原因：自定义的 `eslint`规则被下面的 `pluginVue.configs['flat/essential']`覆盖了。**
**解决方法：将自定义配置规则放在最下面即可。**

```javascript
import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
	globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

	pluginVue.configs['flat/essential'],
	vueTsConfigs.recommended,
	skipFormatting,
	{
	    name: 'app/files-to-lint',
	    files: ['**/*.{ts,mts,tsx,vue}'],
	    rules: {
		'vue/valid-template-root': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		'vue/multi-word-component-names': 'off',
	    },
	},
)

```
