var table;

Array.prototype.unique = function () {
  var arr = [], n = {};
  for (var i = 0; i < this.length; i++) {
    if (!n[this[i]]) {
      n[this[i]] = true; //存入hash表 
      arr.push(this[i]);
    }
  }
  return arr;
}

$(document).ready(function () {
  //从cookie获取支持的列名，若存在则替换默认值
  var _displayColimns = localStorage.getItem("point_displayColimns");
  if (_displayColimns !== null && _displayColimns !== undefined) {
    $("#displayColumns").val(_displayColimns);
  }

  var _filterRule = localStorage.getItem("point_filterRule");
  if (_filterRule !== null && _filterRule !== undefined) {
    $("#filterRule").val(_filterRule);
  }

  var _needDuplicate = localStorage.getItem("point_needDuplicate");
  if (_needDuplicate !== null && _needDuplicate !== undefined) {
    $("#needDuplicate").prop("checked",(_needDuplicate.toLowerCase() == "true"));
  }
});

$("#cleanJsonSource").click(function () {
  $("#jsonSource").val('');
});

$("#parserJsonSource").click(function () {
    try
    {
        //获取json与需要展示的列
        var jsonSource = $("#jsonSource").val();
        var displayColumns = $("#displayColumns").val();
        var filterRule = $("#filterRule").val();
        var needAllColumns = false;

        //特殊处理，当displayColumns为空或者 '*' 时，显示所有字段
        if(displayColumns=="" || displayColumns=="*" || displayColumns == undefined || displayColumns == null)
        {
            needAllColumns = true;
        }

        var _jsonObject = JSON.parse(jsonSource);
        var _columns = [];
        if(!needAllColumns)
        {
            _columns = displayColumns.split(',');
        }

        var _filterRule = JSON.parse(filterRule);

        var dataSet = new Array();

        for (i = 0; i < _jsonObject.length; i++) {

            var _object = _jsonObject[i];
            
            if(needAllColumns)
            {
            const keys= Object.keys(_object); 
            _columns = _columns.concat(keys.filter(v => !_columns.includes(v)));
            }

            var row = new Array();
            var isremoved = false;
            for (j = 0; j < _columns.length; j++) {
            var _value = "";

            var _columnName = _columns[j];
            if (_object[_columnName] !== null && _object[_columnName] !== undefined) {
                _value = _object[_columnName];
            }

            if (_filterRule !== null && _filterRule !== undefined && _filterRule[_columnName] !== null && _filterRule[_columnName] !== undefined) {
                if (_filterRule[_columnName] == "*" && (_value == null || _value == "")) {
                isremoved = true;
                break;
                }
                if (_filterRule[_columnName] !== "*" && _filterRule[_columnName] !== "") {
                var _rules = _filterRule[_columnName].split(',');
                if ($.inArray(_value, _rules) == -1) {
                    isremoved = true;
                    break;
                }
                }

            }

            row[j] = _value;
            }
            if (!isremoved) {
            dataSet.push(row);
            }
        }

        var columnNames = new Array();
        for (j = 0; j < _columns.length; j++) {
            var _title = { "title": _columns[j] };
            columnNames[j] = _title;
        }

        if (table !== null && table !== undefined) {
            table.destroy();
            $('#dataTable').empty();
        }

        var needDuplicate = $("#needDuplicate").is(':checked');

        if (needDuplicate) {
            dataSet = dataSet.unique();
        }

        $.fn.dataTable.ext.errMode = 'none';
        table = $('#dataTable').DataTable({
            data: dataSet,
            columns: columnNames,
            lengthMenu: [ 20, 50, 80, 100 ]
        });

        localStorage.setItem("point_displayColimns", displayColumns);
        localStorage.setItem("point_filterRule", filterRule);
        localStorage.setItem("point_needDuplicate", needDuplicate);

        $('body,html').animate({ scrollTop: $('#scrollToSearch').offset().top }, 200);
    }
    catch(e)
    {
        alert("Please check your json format.");
    }
});