// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 2017
    },
    env: {
        browser: true,
        commonjs: true,
        node: true,
        es6: true
    },
    extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
        'plugin:vue/essential'
    ],
    // required to lint *.vue files
    plugins: ['vue'],
    // add your custom rules here
    rules: {
    // allow async-await
        'generator-star-spacing': 'off',
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        // 4个空格缩进
        indent: ['error', 4],
        // 注释必须跟随一个空白
        'spaced-comment': ['error', 'always'],
        // 尽量用 '' 有变量时可用 ``
        quotes: ['error', 'single'],
        // 总是 ; 结尾语句
        semi: ['error', 'always'],
        // 对不包含 await 表达式的 async 函数发出警告
        'require-await': 'warn',
        // 禁止在 function 定义中出现重复的参数
        'no-dupe-args': 'error',
        // 禁止在对象字面量中出现重复的键
        'no-dupe-keys': 'error',
        // 禁止空块语句
        'no-empty': 'error',
        // 禁用不必要的分号
        'no-extra-semi': 'error',
        // 禁止对 function 声明重新赋值
        'no-func-assign': 'error',
        // 禁止将全局对象当作函数进行调用
        'no-obj-calls': 'error',
        // 禁止在常规字符串中出现模板字面量占位符语法
        'no-template-curly-in-string': 'error',
        // 禁止在 return、throw、continue 和 break 语句后出现不可达代码
        'no-unreachable': 'error',
        // 强制数组方法的回调函数中有 return 语句
        'array-callback-return': 'error',
        // 要求 Switch 语句中有 Default 分支
        'default-case': 'error',
        // 禁止出现空函数
        'no-empty-function': 'error',
        // 禁用 eval()
        'no-eval': 'error',
        // 禁止对原生对象或只读的全局对象进行赋值
        'no-global-assign': 'error',
        // 禁止出现多个空格
        'no-multi-spaces': 'error',
        // 禁止多行字符串
        'no-multi-str': 'error',
        // 禁止原始包装实例
        'no-new-wrappers': 'error',
        // 禁止重新声明变量
        'no-redeclare': 'error',
        // 禁止自身赋值
        'no-self-assign': 'error',
        // 要求使用 Error 对象作为 Promise 拒绝的原因
        'prefer-promise-reject-errors': 'error',
        // 禁止变量声明覆盖外层作用域的变量
        'no-shadow': 'error',
        // 禁用未声明的变量
        'no-undef': 'error',
        // 不允许初始化变量值为 undefined
        'no-undef-init': 'error',
        // 强制在模块顶部调用 require()
        'global-require': 'error',
        // 禁止或强制在代码块中开括号前和闭括号后有空格
        'block-spacing': ['error', 'always'],
        // 大括号风格要求
        'brace-style': 'error',
        // 要求使用骆驼拼写法
        camelcase: ['error', { properties: 'always' }],
        // 逗号风格
        'comma-style': ['error', 'last'],
        // 要求或禁止在函数标识符和其调用之间有空格
        'func-call-spacing': ['error', 'never'],
        // 强制隐式返回的箭头函数体的位置
        'implicit-arrow-linebreak': ['error', 'beside'],
        // 强制在对象字面量的键和值之间使用一致的空格
        'key-spacing': [
            'error',
            { beforeColon: false, afterColon: true, mode: 'strict' }
        ],
        // 强制关键字周围空格的一致性
        'keyword-spacing': ['error', { before: true, after: true }],
        // 禁止使用 空格 和 tab 混合缩进
        'no-mixed-spaces-and-tabs': 'error',
        // 不允许多个空行,最大为2行,强制文件末尾的最大连续空行数为1,强制文件开始的最大连续空行数为1
        'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1, maxBOF: 0 }],
        // 禁止属性前有空白
        'no-whitespace-before-property': 'error',
        // 要求对象字面量属性名称的使用
        'quote-props': ['error', 'as-needed'],
        // 强制分号前后不能有空格
        'semi-spacing': ['error', { before: false, after: true }],
        // 要求或禁止函数圆括号之前有一个空格
        'space-before-function-paren': ['error', 'never'],
        // 禁止或强制圆括号内的空格
        'space-in-parens': ['error', 'never'],
        // 要求中缀操作符周围有空格
        'space-infix-ops': 'error',
        // 要求或禁止在模板标记和它们的字面量之间有空格
        'template-tag-spacing': 'error',
        // 要求箭头函数体使用大括号
        'arrow-body-style': ['error', 'always'],
        // 要求箭头函数的参数当只有一个参数时允许省略圆括号
        'arrow-parens': ['error', 'as-needed'],
        // 要求箭头函数的箭头之前或之后有空格
        'arrow-spacing': ['error', { before: true, after: true }],
        // 不允许改变用const声明的变量
        'no-const-assign': 'error',
        // 不允许类成员中有重复的名称
        'no-dupe-class-members': 'error',
        // 禁止重复导入
        'no-duplicate-imports': 'error',
        // 强制剩余和扩展运算符及其表达式之间没有空格
        'rest-spread-spacing': ['error', 'never'],
        // 该规则要求在方法链中 允许在同一行成链的深度为3
        'newline-per-chained-call': ['error', { ignoreChainWithDepth: 3 }]
    }
};
