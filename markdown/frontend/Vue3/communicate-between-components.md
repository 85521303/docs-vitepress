> 本篇文章记录Vue3的组件间通信的几种方式

# 方式一、props

`Parent.vue`

```vue
<script setup lang="ts">

import { ref } from 'vue';
import Child from './Child.vue';

const car = '奔驰';

const toy = ref('');
function getToy(toyname: string) {
	toy.value = toyname;
}
</script>

<template>
	<div class="border p-2">
		<h2>父组件</h2>
		<span>从子组件那里获得了：{{ toy }}</span>
		<div class="ms-4">
			<Child :car="car" :sendToy="getToy" />
		</div>
	</div>
</template>
```

`Child.vue`

```vue
<script setup lang="ts">
defineProps(['car', 'sendToy']);

const toyname = '布娃娃';
</script>

<template>
	<h2>子组件</h2>
	<span>从父组件那里获得了：{{ car }}</span>
	<button class="btn btn-primary d-block mt-1" @click="sendToy(toyname)">给父组件传递玩具</button>
</template>
```

上面定义了两个组件，分别是父组件和子组件。
**父组件向子组件传递参数：**
父组件可以通过子组件的标签传递 `props`，子组件通过 `defineProps()`接收。
**子组件向父组件传递参数：**
首先由父组件通过 `props`传递一个带参函数给子组件，子组件通过调用该函数并携带参数传递给父组件。

# 方式二、自定义事件

自定义事件一般用于子组件向父组件传递数据。

`Parent.vue`

```vue
<script setup lang="ts">
import { ref } from 'vue';
import Child from './Child.vue';

const toy = ref('');
function getToy(toyname: string) {
	toy.value = toyname;
}
</script>

<template>
	<div class="border p-2">
		<h2>父组件</h2>
		<span>从子组件那里获得了：{{ toy }}</span>
		<div class="ms-4">
			<Child @send-toy="getToy" />
		</div>
	</div>
</template>
```

`Child.vue`

```vue
<script setup lang="ts">
const emit = defineEmits(['send-toy'])
const toyname = '布娃娃';
</script>

<template>
	<h2>子组件</h2>
	<button class="btn btn-primary d-block mt-1" @click="emit('send-toy', toyname)">给父组件传递玩具</button>
</template>
```

父组件通过 `@send-toy="getToy"`给子组件绑定一个自定义事件，并设置 `getToy`为回调函数。
子组件通过 `const emit = defineEmits(['send-toy'])`获得自定义事件触发对象
子组件通过 `emit('事件名')`触发自定义事件了。
`emit()`函数还可以携带参数传递给回调函数。
**注意：**这里的事件名的两个单词之间使用-进行连接，这是官方推荐的事件名写法。
**官方：**像组件与 prop 一样，事件的名字也提供了自动的格式转换。注意这里我们触发了一个以 camelCase 形式命名的事件，但在父组件中可以使用 kebab-case 形式来监听。与 prop 大小写格式一样，在模板中我们也推荐使用 kebab-case 形式来编写监听器。

# 方式三、全局事件总线 `mitt`

## 安装 `mitt`

```CMD
npm i mitt
```

## 使用 `mitt`

在 `utils`文件夹下创建 `mitt.ts`文件

```typescript
import mitt from 'mitt'

const emitter = mitt()

export default emitter
```

在组件中使用

```vue
<script>
import emitter from '@/utils/mitt'

emitter.on('e1', () => {
	console.log('事件e1被触发了')
})
emitter.on('e2', () => {
	console.log('事件e2被触发了')
})

setInterval(() => {
	// 触发事件e1
	emitter.emit('e1')

	// 触发事件e2
	emitter.emit('e2')
}, 1000)

setTimeout(() => {
	// 逐个解绑事件
	emitter.off('e1')
	emitter.off('e2')

	// 解绑所有事件
	emitter.all.clear()
}, 30000)
</script>
```

# 方式四、`v-model`

## 基本用法与底层原理

`Parent.vue`

```vue
<script setup lang="ts">
import Child from './Child.vue';
import { ref } from 'vue'

const username = ref('zhangsan')

</script>

<template>
	<div class="border p-2">
		<h2>父组件</h2>
        <!-- 写法1 -->
		<Child :modelValue="username" @update:modelValue="username = $event" />
        <!-- 写法2 -->
		<Child v-model="username" />
        <!-- 两种写法效果相同，第二种为简写形式 -->
	</div>
</template>
```

`Child.vue`

```vue
<script setup lang="ts">
defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
</script>

<template>
	<h2>子组件</h2>
	<input type="text" :value="modelValue" @input="emit('update:modelValue', (<HTMLInputElement>$event.target).value)">
</template>
```

## 多个 `v-model`绑定

`App.vue`

```vue
<script setup>
import { ref } from 'vue'
import UserName from './UserName.vue'
const firstName = ref("John")
const lastName = ref("Dan")
</script>

<template>
  <div>{{firstName}} -- {{lastName}}</div>
  <UserName v-model:first-name="firstName"  v-model:last-name="lastName" />
</template>
```

`UserName.vue`

```vue
<script setup>
const firstName = defineModel('firstName')
const lastName = defineModel('lastName')
</script>

<template>
  <input type="text" v-model="firstName" />
  <input type="text" v-model="lastName" />
</template>
```

# 方式五、`$attrs`

`$attrs`中保存着父组件传递的但是未被本组件使用的 `props`

`Parent.vue`

```vue
<script setup lang="ts">
import Child from './Child.vue';
import { ref } from 'vue'

// 父组件定义两个响应式数据和一个方法
const a = ref(1)
const b = ref(1)

function updataA(value: number) {
	a.value += value
}

</script>

<template>
	<div class="border p-2">
		<h2>父组件</h2>
		<h4>a:{{ a }}</h4>
		<!-- 父组件将a,b,updataA通过props传递给子组件 -->
		<Child v-bind="{ a, b, updataA }" />
	</div>
</template>
```

父组件传递给子组件两个响应式数据:a,b，还有一个函数updataA

`Child.vue`

```vue
<script setup lang="ts">
import GrandChild from './GrandChild.vue';
</script>

<template>
	<h2>子组件</h2>
	<GrandChild v-bind="$attrs" />
</template>
```

子组件未使用父组件传递的任何 `props`，并将 `$attrs`作为 `props`传递给孙组件

`GrandChild.vue`

```vue
<script setup lang="ts">
defineProps(['a', 'b', 'updataA'])
</script>

<template>
	<h2>孙组件</h2>
	<h4>a:{{ a }}</h4>
	<h4>b:{{ b }}</h4>
	<button @click="updataA(1)">点我a+1</button>
</template>
```

孙组件通过 `defineProps`拿到来自父组件的 `props`。

# 方式六、`$ref`和 `$parent`

`$ref`:父组件操作子组件数据。
`$parent`:子组件操作父组件数据。

## 使用 `ref`通信

`Child.vue`

```vue
<script setup lang="ts">
import { ref } from 'vue'
const toy = ref('奥特曼')
const booksCount = ref(6)

// 将数据暴露出去，使得可以通过组件实例拿到数据
defineExpose({ toy, booksCount })

</script>

<template>
	<h2>子组件</h2>
	<h3>玩具：{{ toy }}</h3>
	<h3>书本：{{ booksCount }}本</h3>
</template>
```

子组件定义了两个响应式数据，并通过 `defineExpose`暴漏出去

`Parent.vue`

```vue
<script setup lang="ts">
import Child from './Child.vue';
import { ref } from 'vue'

const childRef = ref()

function changeToy() {
	childRef.value.toy = "小猪佩奇"
}

function buyBook() {
	childRef.value.booksCount += 1
}

</script>

<template>
	<div class="border p-2">
		<h2>父组件</h2>
		<Child ref="childRef" />

		<button @click="changeToy">给孩子换个玩具</button>
		<button @click="buyBook">给孩子买本书</button>
	</div>
</template>
```

父组件通过 `ref="childRef"`属性在子组件上添加了引用
然后通过 `childRef.value`去拿到子组件的数据

> 注意：要提前声明 `const childRef = ref()`

## `$refs`

`$refs`可以拿到所有的添加引用的子组件的引用

```vue
<script setup lang="ts">
import Child from './Child.vue';

// 循环所有的子组件引用，并依此修改数据
function buyBook(refs:any) {
    for(let key in refs){
        refs[key].bookCount ++
    }
}

</script>

<template>
	<div class="border p-2">
		<h2>父组件</h2>
		<Child ref="childRef1" />
                <Child ref="childRef2" />
		<button @click="buyBook($refs)">给所有孩子买本书</button>
	</div>
</template>
```

## `$parent`

用法与 `$refs`基本相同。

# 方式七、`provide`和 `inject`

`provide`可以向后代提供数据
`inject` 可以注入祖先提供的数据

`祖先组件`

```vue
<script setup lang="ts">
import Child from "./Child.vue";
import { reactive, ref, provide } from "vue";

// 定义父组件的数据
const money = ref(300);
const car = reactive({
	brand: "Bench",
	price: 100,
});
function moreMoney(value: number) {
	console.log("后代又来要钱了::", value)
}

// 将自己的数据提供给后代
provide("money", money);
provide("car", car);
// 将自己的方法提供给后代
provide("moreMoney", moreMoney)
</script>

<template>
	<div class="border ps-2">
		<h2>父组件</h2>
		<div>银子:{{ money }}</div>
		<div>车子:{{ car.brand }}, 价值:{{ car.price }}</div>
		<Child />
	</div>
</template>
```

`后代组件`

```vue
<script setup lang="ts">
import { inject } from 'vue';

// 注入祖先提供的数据
const money = inject('money', 0)
const car = inject('car', { brand: '未知', price: 0 })

// 注入祖先提供的方法
const moreMoney = inject('moreMoney', (param: number) => { })

</script>

<template>
	<div class="border ps-4">
		<h2>孙组件</h2>
		<div>银子:{{ money }}</div>
		<div>车子:{{ car.brand }}, 价值:{{ car.price }}</div>
		<button @click="money--">花点钱</button>
		<button @click="moreMoney(1000)">要点钱</button>
	</div>
</template>
```
