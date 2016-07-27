# chofn-react
a ui demo library by React
基于React的UI组件库,提供基础表单组件,仅提供行为和交互,样式上需要使用者根据项目设计自行修改

## Step 1 : Initialize your develop environment 初始化你的开发环境

...本套组件库开发依赖的开发环境: node
...web容器: http-server
...自动化构建工具: webpack
...UI组件库框架: React
...函数工具库: Underscore


###安装Node
前端编译构建以及自动化工具都依赖于Node, MacOS/Windows 用户可直接在 [Node官网](https://nodejs.org/zh-cn/)自行下载可执行安装程序,直接运行即可。
（注:安装版本尽量选择 V4.4.7 既官网推荐版本）

###导入项目
超凡网React项目目前托管在github上,具体地址为 [https://github.com/nk232806338/chofn-react](https://github.com/nk232806338/chofn-react)
已经安装了git的同学直接在本地的工作目录下执行 <br/> 

  git clone https://github.com/nk232806338/chofn-react.git
    
###安装项目依赖
基于Node的工程下, 都会有一个被预定义的 package.json 文件, 此文件描述的是整个工程中依赖的node包, 主要配置的属性为 <br/> 

####dependencies : 在开发中被直接依赖的node包, 如jquery, underscore
####devDependencies: 在开发中类似于构建工具,自动化工具的依赖, 如webpack, babel

node 使用 NPM （node package management）进行包管理, 当项目中需要引入新的package时, 请在执行npm install xxx 时通过 --save-dev | --save 参数区分该package属于
dependencies 还是 devDependencies;<br/>
例如:<br/>
  npm install jquery --save  <br/>
  npm install webpack --save-dev <br/>
  
