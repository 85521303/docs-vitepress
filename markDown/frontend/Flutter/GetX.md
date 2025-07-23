# Flutter GetX框架完整笔记

## 1. 简介与安装

GetX是Flutter的一个轻量级解决方案，提供了状态管理、路由管理、依赖注入等功能。

### 安装
```yaml
dependencies:
  get: ^4.6.6
```

### 导入
```dart
import 'package:get/get.dart';
```

## 2. 状态管理

### 2.1 响应式状态管理 (Reactive State Management)

#### 基本响应式变量
```dart
// 控制器
class CountController extends GetxController {
  var count = 0.obs; // 响应式变量
  
  void increment() => count++;
  void decrement() => count--;
}

// 在页面中使用
class CounterPage extends StatelessWidget {
  final CountController controller = Get.put(CountController());
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          children: [
            Obx(() => Text('计数: ${controller.count}')),
            ElevatedButton(
              onPressed: controller.increment,
              child: Text('增加'),
            ),
          ],
        ),
      ),
    );
  }
}
```

#### 复杂数据类型响应式
```dart
class UserController extends GetxController {
  var user = User(name: '', age: 0).obs;
  var userList = <User>[].obs;
  var isLoading = false.obs;
  
  void updateUser(String name, int age) {
    user.update((val) {
      val?.name = name;
      val?.age = age;
    });
  }
  
  void addUser(User newUser) {
    userList.add(newUser);
  }
}
```

### 2.2 简单状态管理 (Simple State Management)

#### 使用GetBuilder
```dart
class SimpleController extends GetxController {
  int count = 0;
  
  void increment() {
    count++;
    update(); // 手动更新UI
  }
  
  void incrementWithId() {
    count++;
    update(['counter']); // 只更新指定ID的组件
  }
}

// 在页面中使用
GetBuilder<SimpleController>(
  init: SimpleController(),
  builder: (controller) => Text('计数: ${controller.count}'),
)

// 使用ID更新指定组件
GetBuilder<SimpleController>(
  id: 'counter',
  builder: (controller) => Text('计数: ${controller.count}'),
)
```

### 2.3 状态混合使用
```dart
class MixController extends GetxController {
  // 响应式变量
  var rxCount = 0.obs;
  // 普通变量
  int normalCount = 0;
  
  void incrementRx() => rxCount++;
  
  void incrementNormal() {
    normalCount++;
    update();
  }
}
```

## 3. 依赖注入

### 3.1 基本依赖注入
```dart
// 注入依赖
Get.put(ApiService()); // 永久注入
Get.lazyPut(() => UserController()); // 懒加载注入
Get.create(() => TempController()); // 每次调用创建新实例

// 获取依赖
final apiService = Get.find<ApiService>();
final userController = Get.find<UserController>();
```

### 3.2 带标签的依赖注入
```dart
// 注入时添加标签
Get.put(UserController(), tag: 'user1');
Get.put(UserController(), tag: 'user2');

// 获取时使用标签
final user1Controller = Get.find<UserController>(tag: 'user1');
final user2Controller = Get.find<UserController>(tag: 'user2');
```

### 3.3 依赖删除
```dart
Get.delete<UserController>(); // 删除依赖
Get.deleteAll(); // 删除所有依赖
```

## 4. 路由管理

### 4.1 基本路由导航
```dart
// 跳转到新页面
Get.to(NextPage());
Get.to(() => NextPage());

// 跳转并替换当前页面
Get.off(NextPage());

// 跳转并清除所有历史页面
Get.offAll(NextPage());

// 返回上一页
Get.back();

// 返回到指定页面
Get.until((route) => route.settings.name == '/home');
```

### 4.2 命名路由
```dart
// 在main.dart中配置路由
GetMaterialApp(
  initialRoute: '/home',
  getPages: [
    GetPage(name: '/home', page: () => HomePage()),
    GetPage(name: '/profile', page: () => ProfilePage()),
    GetPage(name: '/settings', page: () => SettingsPage()),
  ],
)

// 使用命名路由导航
Get.toNamed('/profile');
Get.offNamed('/settings');
Get.offAllNamed('/home');
```

### 4.3 路由参数传递
```dart
// 传递参数
Get.toNamed('/profile', arguments: {'userId': 123, 'name': 'John'});

// 在目标页面接收参数
class ProfilePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final args = Get.arguments;
    final userId = args['userId'];
    final name = args['name'];
    
    return Scaffold(
      body: Text('用户ID: $userId, 姓名: $name'),
    );
  }
}

// 使用路径参数
GetPage(name: '/user/:id', page: () => UserPage()),

// 跳转时传递路径参数
Get.toNamed('/user/123');

// 在页面中获取路径参数
final userId = Get.parameters['id'];
```

### 4.4 中间件
```dart
class AuthMiddleware extends GetMiddleware {
  @override
  RouteSettings? redirect(String? route) {
    if (!AuthService.isLoggedIn) {
      return RouteSettings(name: '/login');
    }
    return null;
  }
}

// 在路由配置中使用中间件
GetPage(
  name: '/profile',
  page: () => ProfilePage(),
  middlewares: [AuthMiddleware()],
)
```

## 5. 对话框与底部弹窗

### 5.1 SnackBar
```dart
Get.snackbar(
  '标题',
  '消息内容',
  snackPosition: SnackPosition.TOP,
  backgroundColor: Colors.blue,
  colorText: Colors.white,
  duration: Duration(seconds: 3),
);
```

### 5.2 Dialog
```dart
Get.dialog(
  AlertDialog(
    title: Text('提示'),
    content: Text('确认删除吗？'),
    actions: [
      TextButton(
        onPressed: () => Get.back(),
        child: Text('取消'),
      ),
      TextButton(
        onPressed: () {
          // 执行删除操作
          Get.back();
        },
        child: Text('确认'),
      ),
    ],
  ),
);
```

### 5.3 BottomSheet
```dart
Get.bottomSheet(
  Container(
    height: 200,
    color: Colors.white,
    child: Column(
      children: [
        ListTile(
          title: Text('选项1'),
          onTap: () => Get.back(),
        ),
        ListTile(
          title: Text('选项2'),
          onTap: () => Get.back(),
        ),
      ],
    ),
  ),
);
```

## 6. 国际化

### 6.1 基本国际化配置
```dart
class Messages extends Translations {
  @override
  Map<String, Map<String, String>> get keys => {
    'zh_CN': {
      'hello': '你好',
      'welcome': '欢迎使用',
    },
    'en_US': {
      'hello': 'Hello',
      'welcome': 'Welcome',
    },
  };
}

// 在main.dart中配置
GetMaterialApp(
  translations: Messages(),
  locale: Locale('zh', 'CN'),
  fallbackLocale: Locale('en', 'US'),
)
```

### 6.2 使用翻译
```dart
// 在页面中使用
Text('hello'.tr), // 显示对应语言的翻译
Text('welcome'.tr),

// 带参数的翻译
'hello_user'.trParams({'name': 'John'}), // 需要在Messages中定义 'hello_user': 'Hello @name'

// 复数翻译
'item_count'.trPlural('items', 5), // 根据数量显示不同文本
```

### 6.3 语言切换
```dart
// 切换语言
Get.updateLocale(Locale('en', 'US'));
Get.updateLocale(Locale('zh', 'CN'));
```

## 7. 主题管理

### 7.1 基本主题切换
```dart
class ThemeController extends GetxController {
  var isDarkMode = false.obs;
  
  void toggleTheme() {
    isDarkMode.value = !isDarkMode.value;
    Get.changeTheme(isDarkMode.value ? ThemeData.dark() : ThemeData.light());
  }
}

// 在main.dart中配置
GetMaterialApp(
  theme: ThemeData.light(),
  darkTheme: ThemeData.dark(),
  themeMode: ThemeMode.system, // 跟随系统主题
)
```

## 8. 服务与工具类

### 8.1 GetxService (单例服务)
```dart
class ApiService extends GetxService {
  Future<void> onInit() async {
    super.onInit();
    // 初始化代码
    print('ApiService 初始化');
  }
  
  Future<Map<String, dynamic>> fetchData() async {
    // API调用逻辑
    return {};
  }
}

// 注册服务
Get.putAsync(() => ApiService());
```

### 8.2 GetConnect (HTTP客户端)
```dart
class UserProvider extends GetConnect {
  @override
  void onInit() {
    httpClient.baseUrl = 'https://api.example.com';
    httpClient.addRequestModifier<void>((request) {
      request.headers['Authorization'] = 'Bearer token';
      return request;
    });
  }
  
  Future<User?> getUser(int id) async {
    final response = await get('/users/$id');
    if (response.status.hasError) {
      return null;
    }
    return User.fromJson(response.body);
  }
  
  Future<User?> postUser(User user) async {
    final response = await post('/users', user.toJson());
    if (response.status.hasError) {
      return null;
    }
    return User.fromJson(response.body);
  }
}
```

## 9. 生命周期

### 9.1 控制器生命周期
```dart
class LifecycleController extends GetxController {
  @override
  void onInit() {
    super.onInit();
    print('控制器初始化');
  }
  
  @override
  void onReady() {
    super.onReady();
    print('控制器准备就绪');
  }
  
  @override
  void onClose() {
    super.onClose();
    print('控制器销毁');
  }
}
```

### 9.2 页面生命周期
```dart
class MyPage extends StatelessWidget with GetxView<MyController> {
  @override
  Widget build(BuildContext context) {
    return GetBuilder<MyController>(
      init: MyController(),
      initState: (_) => print('页面初始化'),
      dispose: (_) => print('页面销毁'),
      builder: (controller) => Scaffold(
        body: Text('页面内容'),
      ),
    );
  }
}
```

## 10. 实用工具

### 10.1 GetUtils工具类
```dart
// 验证工具
GetUtils.isEmail('test@example.com'); // true
GetUtils.isPhoneNumber('+8613800138000'); // true
GetUtils.isURL('https://www.example.com'); // true

// 其他工具
GetUtils.capitalizeFirst('hello'); // 'Hello'
GetUtils.removeAllWhitespace('hello world'); // 'helloworld'
```

### 10.2 GetPlatform平台判断
```dart
if (GetPlatform.isAndroid) {
  // Android特定代码
}

if (GetPlatform.isIOS) {
  // iOS特定代码
}

if (GetPlatform.isWeb) {
  // Web特定代码
}
```

## 11. 完整示例

### 11.1 计数器应用完整示例
```dart
// main.dart
void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      title: 'GetX Demo',
      home: CounterPage(),
    );
  }
}

// controller.dart
class CounterController extends GetxController {
  var count = 0.obs;
  
  void increment() => count++;
  void decrement() => count--;
  void reset() => count.value = 0;
}

// page.dart
class CounterPage extends StatelessWidget {
  final CounterController controller = Get.put(CounterController());
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('GetX计数器')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Obx(() => Text(
              '${controller.count}',
              style: Theme.of(context).textTheme.headline4,
            )),
            SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                ElevatedButton(
                  onPressed: controller.decrement,
                  child: Text('-'),
                ),
                ElevatedButton(
                  onPressed: controller.reset,
                  child: Text('重置'),
                ),
                ElevatedButton(
                  onPressed: controller.increment,
                  child: Text('+'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
```

## 12. 最佳实践

### 12.1 代码组织
- 将控制器放在单独的文件中
- 使用GetxService处理全局服务
- 合理使用响应式和简单状态管理

### 12.2 性能优化
- 使用Obx()而不是GetX()进行局部更新
- 避免在build方法中创建控制器
- 及时释放不需要的控制器

### 12.3 错误处理
```dart
class ErrorController extends GetxController {
  var hasError = false.obs;
  var errorMessage = ''.obs;
  
  void handleError(String message) {
    hasError.value = true;
    errorMessage.value = message;
    
    Get.snackbar(
      '错误',
      message,
      snackPosition: SnackPosition.BOTTOM,
      backgroundColor: Colors.red,
      colorText: Colors.white,
    );
  }
  
  void clearError() {
    hasError.value = false;
    errorMessage.value = '';
  }
}
```

这份笔记涵盖了GetX框架的主要功能和用法，可以作为日常开发的参考手册。