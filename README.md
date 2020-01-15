# acjl

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

由于在安卓端跳转页面时，都是新开一个webview，因此请不要使用Vuex，eventbus方法实现组间通信，公用参数请使用路由的方式进行传递。