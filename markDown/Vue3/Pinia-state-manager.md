> Pinia —— 符合直觉的 Vue.js 状态管理库

# 引入Pinia库

在 `main.ts`中引入 `pinia`库并使用

```js
import { createPinia } from 'pinia'

app.use(createPinia())
```

# 创建 `Store`

在 `@/store/`目录下创建 `backpack.ts`文件

```javascript
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useBackPackStore = defineStore('BackPack', {
  state() {
    return {
      items: reactive([
        // 背包中的物品
        { id: '001', name: '绷带', number: 16 },
        { id: '002', name: '饮料', number: 5 },
        { id: '003', name: '药丸', number: 2 },
        { id: '004', name: '面包', number: 6 },
        { id: '005', name: '子弹', number: 50 },
      ]),
      capacity: 100, // 背包容量
      weight: 50, // 背包重量
    }
  },
})

```

# 使用 `Store`

在组件中使用 `store`

```javascript
<template>
  <h3 v-if="items.length == 0">您的背包空空如也...</h3>
  <ul v-else>
    <li>
      <span class="name title">物品</span>
      <span class="number title">数量</span>
    </li>
    <li v-for="goods in items" :key="goods.id">
      <span class="name">{{ goods.name }}</span>
      <span class="number">{{ goods.number }}</span>
    </li>
    <span>背包容量:{{ capacity }}</span><span>背包当前重量:{{ weight }}</span>
  </ul>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useBackPackStore } from '@/stores/backpack';
const BackPackStore = useBackPackStore();

// 解构
const { items, capacity, weight } = storeToRefs(BackPackStore);
</script>
```

**注意，我们使用了一个 `pinia`提供的API:`storeToRefs`来解构 `store`,通过这种方式解构的数据是响应式的。**

![](http://139.129.32.36:88/content/uploadfile/202505/c2401748576048.png)

# 修改 `Store`中的数据

## 方式一：直接修改

```javascript
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useBackPackStore } from '@/stores/backpack';
const BackPackStore = useBackPackStore();

// 解构
const { items, capacity, weight } = storeToRefs(BackPackStore);

// 修改store中的数据

// 直接修改
capacity = 200;
weight = 3;

</script>
```

## 方式二、$patch批量修改

```javascript
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useBackPackStore } from '@/stores/backpack';
const BackPackStore = useBackPackStore();

// 解构
const { items, capacity, weight } = storeToRefs(BackPackStore);

// 修改store中的数据

// 使用$patch批量修改
BackPackStore.$patch({
  capacity: 200,
  weight: 3
})

</script>
```

## 方式三、使用actions修改数据

想要使用 `actions`修改数据，需要先在 `store`中定义 `actions`

```javascript
export const useBackPackStore = defineStore('BackPack', {
  state() {
    return {
      items: reactive([
        // 背包中的物品
        { id: '001', name: '绷带', number: 16 },
        { id: '002', name: '饮料', number: 5 },
        { id: '003', name: '药丸', number: 2 },
        { id: '004', name: '面包', number: 6 },
        { id: '005', name: '子弹', number: 50 },
      ]),
      capacity: 100, // 背包容量
      weight: 50, // 背包重量
    }
  },
  actions: {
    increment(value: { capacity: number; weight: number }) {
      this.capacity = value.capacity
      this.weight = value.weight
    },
  },
})
```

```javascript
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useBackPackStore } from '@/stores/backpack';
const BackPackStore = useBackPackStore();

// 解构
const { items, capacity, weight } = storeToRefs(BackPackStore);

// 修改store中的数据

// 方式三、通过action修改
BackPackStore.increment({
  capacity: 200,
  weight: 3
})
</script>
```

# 函数式的 `Store`

`pinia`的 `defineStore`的第二个参数可以写成组合式的，不过要记得将需要用到的东西返回出去

```javascript
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useBackPackStore = defineStore('BackPack', () => {
  const items = reactive([
    // 背包中的物品
    { id: '001', name: '绷带', number: 16 },
    { id: '002', name: '饮料', number: 5 },
    { id: '003', name: '药丸', number: 2 },
    { id: '004', name: '面包', number: 6 },
    { id: '005', name: '子弹', number: 50 },
  ])
  let capacity = 100 // 背包容量
  let weight = 50 // 背包重量

  function increment(value: { capacity: number; weight: number }) {
    capacity = value.capacity
    weight = value.weight
  }

  return {
    items,
    capacity,
    weight,
    increment,
  }
})
```

# `$subscribe`监听state数据变化

可以通过 `store` 的 `$subscribe()` 方法侦听 `state` 及其变化。比起普通的 `watch()`，使用 `$subscribe()` 的好处是 `subscriptions` 在 `patch` 后只触发一次

```javascript
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useBackPackStore } from '@/stores/backpack';
const BackPackStore = useBackPackStore();

// 解构
const { items, capacity, weight } = storeToRefs(BackPackStore);

// 修改store中的数据

// 方式三、通过action修改
BackPackStore.increment({
  capacity: 200,
  weight: 3
})

BackPackStore.$subscribe((v1, v2) => {
  console.log(v1, '@@', v2)
})

</script>
```

`$subscribe()`接收的第一个参数：

![](http://139.129.32.36:88/content/uploadfile/202505/2b1a1748576048.png)
`$subscribe()`接收的第二个参数：

![](http://139.129.32.36:88/content/uploadfile/202505/b5ab1748576048.png)

# 向State中添加新数据

```javascript
// 向store中添加新的响应式数据
const obj = reactive({
	totalPrice: 28391,
	totalNumbers: 201
});
// 将obj对象中的属性合并到store中
Object.assign(store, obj);
```

**注意：不推荐使用这样方式向state中直接添加新属性，虽然具有响应性，但是控制台工具会检测不到。**
