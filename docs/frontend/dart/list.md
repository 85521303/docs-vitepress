## 创建List

~~~Dart
// 创建空列表
List<int> numbers = [];
List<String> names = <String>[];

// 创建带初始值的列表
List<int> nums = [1, 2, 3, 4, 5];
List<String> fruits = ['apple', 'banana', 'orange'];

// 创建固定长度的列表
List<int> fixedList = List.filled(3, 0); // [0, 0, 0]

// 使用generate创建列表
List<int> generated = List.generate(5, (index) => index * 2); // [0, 2, 4, 6, 8]

print('初始列表: $nums');
print('水果列表: $fruits');
print('生成的列表: $generated');
~~~

## 添加元素

~~~dart
List<int> list1 = [1, 2, 3];
  
// add() - 添加单个元素到末尾
list1.add(4);
print('add(4)后: $list1'); // [1, 2, 3, 4]

// addAll() - 添加多个元素到末尾
list1.addAll([5, 6, 7]);
print('addAll([5,6,7])后: $list1'); // [1, 2, 3, 4, 5, 6, 7]

// insert() - 在指定位置插入元素
list1.insert(0, 0);
print('insert(0, 0)后: $list1'); // [0, 1, 2, 3, 4, 5, 6, 7]

// insertAll() - 在指定位置插入多个元素
list1.insertAll(2, [10, 11]);
print('insertAll(2, [10,11])后: $list1'); // [0, 1, 10, 11, 2, 3, 4, 5, 6, 7]
~~~



## 删除元素

~~~dart
List<int> list2 = [1, 2, 3, 4, 5, 3, 6];
  
// remove() - 删除第一个匹配的元素
list2.remove(3);
print('remove(3)后: $list2'); // [1, 2, 4, 5, 3, 6]

// removeAt() - 删除指定索引的元素
int removed = list2.removeAt(1);
print('removeAt(1)删除了: $removed, 列表: $list2'); // 删除了: 2, 列表: [1, 4, 5, 3, 6]

// removeLast() - 删除最后一个元素
int last = list2.removeLast();
print('removeLast()删除了: $last, 列表: $list2'); // 删除了: 6, 列表: [1, 4, 5, 3]

// removeRange() - 删除指定范围的元素
list2.removeRange(1, 3);
print('removeRange(1, 3)后: $list2'); // [1, 3]

// removeWhere() - 删除满足条件的元素
List<int> list3 = [1, 2, 3, 4, 5, 6];
list3.removeWhere((x) => x % 2 == 0);
print('removeWhere(偶数)后: $list3'); // [1, 3, 5]

// clear() - 清空列表
List<int> list4 = [1, 2, 3];
list4.clear();
print('clear()后: $list4'); // []
~~~



## 访问和查找

~~~dart
List<String> colors = ['red', 'green', 'blue', 'yellow'];
  
// 通过索引访问
print('第一个元素: ${colors[0]}'); // red
print('最后一个元素: ${colors[colors.length - 1]}'); // yellow

// first 和 last
print('first: ${colors.first}'); // red
print('last: ${colors.last}'); // yellow

// indexOf() - 查找元素第一次出现的索引
int index = colors.indexOf('blue');
print('blue的索引: $index'); // 2

// lastIndexOf() - 查找元素最后一次出现的索引
List<int> repeated = [1, 2, 3, 2, 4];
int lastIndex = repeated.lastIndexOf(2);
print('2最后出现的索引: $lastIndex'); // 3

// contains() - 检查是否包含某元素
bool hasRed = colors.contains('red');
print('包含red: $hasRed'); // true

// ========== 列表属性 ==========

print('列表长度: ${colors.length}'); // 4
print('是否为空: ${colors.isEmpty}'); // false
print('是否不为空: ${colors.isNotEmpty}'); // true
~~~



## 函数式方法

~~~dart
List<int> numbers2 = [1, 2, 3, 4, 5];
  
// map() - 转换每个元素
List<int> doubled = numbers2.map((x) => x * 2).toList();
print('map(x*2): $doubled'); // [2, 4, 6, 8, 10]

// where() - 过滤元素
List<int> evens = numbers2.where((x) => x % 2 == 0).toList();
print('where(偶数): $evens'); // [2, 4]

// forEach() - 遍历执行操作
print('forEach输出:');
numbers2.forEach((x) => print('  $x'));

// reduce() - 归约操作
int sum = numbers2.reduce((a, b) => a + b);
print('reduce求和: $sum'); // 15

// fold() - 带初始值的归约
int product = numbers2.fold(1, (prev, x) => prev * x);
print('fold求积: $product'); // 120

// any() - 是否有元素满足条件
bool hasEven = numbers2.any((x) => x % 2 == 0);
print('any(有偶数): $hasEven'); // true

// every() - 是否所有元素都满足条件
bool allPositive = numbers2.every((x) => x > 0);
print('every(都是正数): $allPositive'); // true

// firstWhere() - 查找第一个满足条件的元素
int firstEven = numbers2.firstWhere((x) => x % 2 == 0);
print('firstWhere(第一个偶数): $firstEven'); // 2

// lastWhere() - 查找最后一个满足条件的元素
int lastEven = numbers2.lastWhere((x) => x % 2 == 0);
print('lastWhere(最后一个偶数): $lastEven'); // 4
~~~



## 排序和反转

~~~dart
List<int> unsorted = [3, 1, 4, 1, 5, 9, 2, 6];
  
// sort() - 就地排序
List<int> sorted = List.from(unsorted);
sorted.sort();
print('sort()后: $sorted'); // [1, 1, 2, 3, 4, 5, 6, 9]

// 自定义排序
List<String> words = ['apple', 'pie', 'a', 'longer'];
words.sort((a, b) => a.length.compareTo(b.length));
print('按长度排序: $words'); // [a, pie, apple, longer]

// reversed - 获取反转的迭代器
List<int> reversed = numbers2.reversed.toList();
print('reversed: $reversed'); // [5, 4, 3, 2, 1]

// shuffle() - 随机打乱
List<int> shuffled = List.from(numbers2);
shuffled.shuffle();
print('shuffle()后: $shuffled'); // 随机顺序
~~~



## 子列表操作

~~~dart
List<int> bigList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  
// sublist() - 获取子列表
List<int> sub = bigList.sublist(2, 6);
print('sublist(2, 6): $sub'); // [2, 3, 4, 5]

// getRange() - 获取范围内的元素
Iterable<int> range = bigList.getRange(1, 4);
print('getRange(1, 4): ${range.toList()}'); // [1, 2, 3]

// setRange() - 设置范围内的元素
List<int> target = [0, 0, 0, 0, 0];
target.setRange(1, 4, [10, 20, 30]);
print('setRange后: $target'); // [0, 10, 20, 30, 0]

// replaceRange() - 替换范围内的元素
List<int> original = [1, 2, 3, 4, 5];
original.replaceRange(1, 4, [10, 20]);
print('replaceRange后: $original'); // [1, 10, 20, 5]
~~~

## 类型转换

~~~dart
// toList() - 转换为List
Iterable<int> iterable = [1, 2, 3].map((x) => x * 2);
List<int> list = iterable.toList();
print('toList(): $list'); // [2, 4, 6]

// toSet() - 转换为Set（去重）
List<int> withDuplicates = [1, 2, 2, 3, 3, 3];
Set<int> uniqueSet = withDuplicates.toSet();
print('toSet(): $uniqueSet'); // {1, 2, 3}

// join() - 连接为字符串
List<String> parts = ['Hello', 'World', 'Dart'];
String joined = parts.join(' ');
print('join(" "): $joined'); // Hello World Dart
~~~



## 其他方法

~~~dart
// expand() - 展开嵌套结构
List<List<int>> nested = [[1, 2], [3, 4], [5]];
List<int> flattened = nested.expand((x) => x).toList();
print('expand(): $flattened'); // [1, 2, 3, 4, 5]

// take() - 取前n个元素
List<int> first3 = bigList.take(3).toList();
print('take(3): $first3'); // [0, 1, 2]

// skip() - 跳过前n个元素
List<int> skip3 = bigList.skip(3).toList();
print('skip(3): $skip3'); // [3, 4, 5, 6, 7, 8, 9]

// takeWhile() - 取满足条件的元素直到不满足
List<int> takeWhileSmall = bigList.takeWhile((x) => x < 5).toList();
print('takeWhile(<5): $takeWhileSmall'); // [0, 1, 2, 3, 4]

// skipWhile() - 跳过满足条件的元素直到不满足
List<int> skipWhileSmall = bigList.skipWhile((x) => x < 5).toList();
print('skipWhile(<5): $skipWhileSmall'); // [5, 6, 7, 8, 9]

// followedBy() - 连接两个可迭代对象
List<int> combined = [1, 2].followedBy([3, 4]).toList();
print('followedBy: $combined'); // [1, 2, 3, 4]
~~~























