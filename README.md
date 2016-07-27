# chofn-react

基于`React`的UI组件库, 组件库本身结构大体分为`基础组件 功能组件`以及`业务组件`
- `基础组件` 
 例如 Table、Tab选项卡、下拉选择, 仅提供最基础的行为支持
- `功能组件`
基于`基础组件` 的组合，利用各种基础组件`组合`成相应的功能，如三级联动下拉框，就是利用基础下拉组件组合后的具备三级联动功能的功能组件。
- `业务组件`
业务组件是在组件层面上的最高层次的抽象，是利用`基础组件`或者`功能组件`作为支持，并且具备与业务模型场景对应的组件，一般的业务组件是按照业务场景的功能模块划分，可单独存在，当然具备通用性的业务模块可被其它业务组件复用
<br/>
![Image of Yaktocat](http://120.25.152.191:8080/img/1-%E7%BB%84%E4%BB%B6%E7%BB%93%E6%9E%84%E5%9B%BE.png)



## Initialize your develop environment 初始化你的开发环境
#### STEP-1: 安装Node
> Node.js是一个基于Chrome V8 引擎的 JavaScript 运行时。 Node.js 使用高效、轻量级的事件驱动、非阻塞 I/O 模型。Node.js 之生态系统是目前最大的开源包管理系统。

Windows以及MacOS用户可直接在[Node官网](https://nodejs.org/zh-cn/)下载可执行安装程序自动安装。
版本请选择官网目前推荐版本`V4.4.7LTS`，安装完毕后请在控制台下查看Node版本看是否安装成功：
```sh
node -v
```

#### STEP-2: 下载安装工程
目前本项目托管在Github上，具体地址为[https://github.com/nk232806338/chofn-react](https://github.com/nk232806338/chofn-react)
> GitHub is a code hosting platform for version control and collaboration. It lets you and others work together on projects from anywhere.

安装了git的同学可在控制台下直接clone项目：
```sh
git clone https://github.com/nk232806338/chofn-react.git
```
下载完成后（目前默认就在mast分支下）,在工程的根目录下执行
```sh
npm install
```
这条命令会读取当前目录的 package.json文件，并按照此包结构安装对应的Node Module

接着执行：
```sh
 npm install webpack -g
```
这是在全局安装 webpack(本项目依赖的自动化构建工具)

#### STEP-3: 运行项目
当上述的安装步骤执行完毕之后，需要将前端资源运行在某web容器上，推荐使用 [http-server](https://github.com/indexzero/http-server),安装使用只需在命令行下执行
```sh
npm install http-server -g
```
安装成功后在当前项目的根目录下运行
```sh
http-server ./  -p 8081
```
即可把当前目录的所有资源文件部署到本地的HttpServer中，端口号可根据需要自主设定，上述命令通过 
`-p 8081`指定了端口为8081， 启动成功后在浏览器中输入 localhost:8081 既可看到基于React的Demo首页










