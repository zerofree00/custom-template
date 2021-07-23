 
# gulp pug stylus gulp-html-tpl

glup 3.0

#### 安装

```
npm i

```

#### 启动 1 ， 使用jade模板

```
npm run all
```
 

## jade 
* src/view/view文件下的html是分开的
* src/view/main文件下的html是合并的 

## gulp-html-tpl  
* src/htmltpl/ 文件下的html没有使用jade模板



## 遇到的问题

### 关于“primordials is not defined”报错的解决办法
   
也许是因为你的gulp版本v3，node版本v12。

* 解决方法：
  - 将gulp版本升级到v4。
  - 将node版本降级到v11。
  - 将graceful-fs升级到在node v12+下工作的版本4.2.2(推荐)。

* 推荐解决办法：

  1. 在package.json同级目录下新建文件npm-shrinkwrap.json，输入以下内容：

    ```
{
    "dependencies": {
        "graceful-fs": {
            "version": "4.2.2"
        }
    }
}
    ```

  2. npm install


## 注意点
dist、dist2文件夹不能丢失