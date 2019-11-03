# json-point-parser

Json 解析工具，将 json 数组转换为 datatable 展示，方便查看与搜索。

使用纯 html 与 js 实现，无服务端代码；所有操作均在浏览器本地完成，数据不会上传到服务器。代码已经开源到 [json-point-parser](https://github.com/ziyunhx/json-point-parser) 。你可以自行下载后直接打开或者部署到服务器，也可以访问我部署的在线版本，网址为：https://point.tnidea.com/。

 ![Image](https://www.tnidea.com/media/image/point-main.png)

 网页使用了 dataTables 作为显示控件，因此你可以自定义排序和搜索，也可以设置每页显示的条数。

 ![Image](https://www.tnidea.com/media/image/point-table.png)

 你可以通过自定义 Display Columns 字段来实现仅显示希望展示的列，多个字段使用 ',' 分割，这里仅支持使用完整的列名来表示。当然，你也可以留空或者使用 '*' 来显示所有的列。

 即使你的数据在数组中的首列并未出现完整的字段，程序也能自动增补后续出现的字段。

    [{"col1":"123","col3":"222"},{"col1":"345","col4":123}]

  ![Image](https://www.tnidea.com/media/image/point-json-obj.png)

 Filter Rule 字段被用于筛选展示数据，它使用 json 对象表示，例如我需要展示 name 不为空的，且年龄为 18 或 19 的数据，可以使用以下方式表示：

    { "name" : "*" , "age" : "18,19" }

 目前仅支持 '*' 用于限制非空，和使用完整的值过滤，多个值使用 ',' 分隔。另外你也可以勾选 Need Remove Duplicate? 选项来过滤重复数据，注意这里仅使用显示的字段判断是否重复数据。

 最后，你的配置将通过 cookies 保存到本地，下次打开时会加载最后一次成功解析时的数据。无论数据或者配置均不会被上传到服务器上，以保证你的机密数据不会通过该工具被泄露。