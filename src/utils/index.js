/**
 * @description     公共方法
 *
 * @author          
 * @email           
 * @phone           
 * @create          2019-02-13 11:00
 * */

export function parseTime(time, cFormat) {
    if (arguments.length === 0) {
        return null
    }
    if (!time) {
        return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
            time = parseInt(time)
        }
        if ((typeof time === 'number') && (time.toString().length === 10)) {
            time = time * 1000
        }
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    })
    return time_str
}

export function dateFormat(time, format) {
    if (arguments.length === 0) {
        return null
    }
    if (!time) {
        return null
    }
    let fmt = format || 'yyyy-MM-dd hh:mm:ss'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
            time = parseInt(time)
        }
        if ((typeof time === 'number') && (time.toString().length === 10)) {
            time = time * 1000
        }
        date = new Date(time)
    }

    var o = {
        "M+": date.getMonth() + 1, //月份 
        "d+": date.getDate(), //日 
        "h+": date.getHours(), //小时 
        "m+": date.getMinutes(), //分 
        "s+": date.getSeconds(), //秒 
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
        "S": date.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

export function formatTime(time, option) {
    time = +time * 1000
    const d = new Date(time)
    const now = Date.now()

    const diff = (now - d) / 1000

    if (diff < 30) {
        return '刚刚'
    } else if (diff < 3600) {
        // less 1 hour
        return Math.ceil(diff / 60) + '分钟前'
    } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + '小时前'
    } else if (diff < 3600 * 24 * 2) {
        return '1天前'
    }
    if (option) {
        return parseTime(time, option)
    } else {
        return (
            d.getMonth() +
            1 +
            '月' +
            d.getDate() +
            '日' +
            d.getHours() +
            '时' +
            d.getMinutes() +
            '分'
        )
    }
}

/**
 * @description     获取当前url参数
 *
 * @param       { key:String }         key为需要获取的参数
 * @return      { String }             必反，返回对应参数的值
 *
 * */
export function getQueryString(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURI(r[2]);
    }
    return "";
}

export function param2Obj(url) {
    const search = url.split('?')[1]
    if (!search) {
        return {}
    }
    return JSON.parse(
        '{"' +
        decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
        '"}'
    )
}

export function html2Text(val) {
    const div = document.createElement('div')
    div.innerHTML = val
    return div.textContent || div.innerText
}

export function objectMerge(target, source) {
    /* Merges two  objects,
       giving the last one precedence */

    if (typeof target !== 'object') {
        target = {}
    }
    if (Array.isArray(source)) {
        return source.slice()
    }
    Object.keys(source).forEach(property => {
        const sourceProperty = source[property]
        if (typeof sourceProperty === 'object') {
            target[property] = objectMerge(target[property], sourceProperty)
        } else {
            target[property] = sourceProperty
        }
    })
    return target
}

export function toggleClass(element, className) {
    if (!element || !className) {
        return
    }
    let classString = element.className
    const nameIndex = classString.indexOf(className)
    if (nameIndex === -1) {
        classString += '' + className
    } else {
        classString =
            classString.substr(0, nameIndex) +
            classString.substr(nameIndex + className.length)
    }
    element.className = classString
}



export function debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result

    const later = function() {
        // 据上一次触发时间间隔
        const last = +new Date() - timestamp

        // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
        if (last < wait && last > 0) {
            timeout = setTimeout(later, wait - last)
        } else {
            timeout = null
            // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
            if (!immediate) {
                result = func.apply(context, args)
                if (!timeout) context = args = null
            }
        }
    }

    return function(...args) {
        context = this
        timestamp = +new Date()
        const callNow = immediate && !timeout
        // 如果延时不存在，重新设定延时
        if (!timeout) timeout = setTimeout(later, wait)
        if (callNow) {
            result = func.apply(context, args)
            context = args = null
        }

        return result
    }
}

/**
 * @description     对象深拷贝
 *
 * @param       { source:Object }         source为需要拷贝的源对象
 * @return      { Object }                返回拷贝后的新的对象
 *
 * */
export function deepClone(source) {
    if (!source && typeof source !== 'object') {
        throw new Error('error arguments', 'shallowClone')
    }
    const targetObj = source.constructor === Array ? [] : {}
    Object.keys(source).forEach(keys => {
        if (source[keys] && typeof source[keys] === 'object') {
            targetObj[keys] = deepClone(source[keys])
        } else {
            targetObj[keys] = source[keys]
        }
    });
    return targetObj
}

export function uniqueArr(arr) {
    return Array.from(new Set(arr))
}

export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}

export function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
    var dataURL = canvas.toDataURL("image/" + ext);
    return dataURL;
}

//blob对象
export function base64ToBlob(dataurl) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}

// 转Blob (url)
export function getBlobUrl(blobObj) {
    return URL.createObjectURL(blobObj);
}

/**
 * 生成一个用不重复的ID
 */
export function genNonDuplicateID(randomLength) {
    return Number(Math.random().toString().substr(3, randomLength) + Date.now()).toString(36)
}

/**
 * 获取一个dom节点的绝对定位，相对于整个document
 */
export function getPosition(dom) {
    var t = dom.offsetTop,
        l = dom.offsetLeft;
    var obj = dom;
    //从目标元素开始向外遍历，累加top和left值  
    for (var t = obj.offsetTop, l = obj.offsetLeft; obj = obj.offsetParent;) {
        t += obj.offsetTop;
        l += obj.offsetLeft;
    }
    return {
        left: l,
        top: t
    }
}
/**
 * 合并参数对象
 */
export function extend(target, source) {
    for (let p in source) {
        if (source.hasOwnProperty(p)) {
            target[p] = source[p];
        }
    }
    return target;
}

// 把页面的表格转化为excel下载下来
export function tablesToExcel(table, name, filename) {

    var uri = "data:application/vnd.ms-excel;base64,"
        ,
        template = "<html xmlns:o=\"urn:schemas-microsoft-com:office:office\" xmlns:x=\"urn:schemas-microsoft-com:office:excel\" xmlns=\"http://www.w3.org/TR/REC-html40\"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets>"
        , templateend = "</x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head>"
        , body = "<body>"
        , tablevar = "<table>{table"
        , tablevarend = "}</table>"
        , bodyend = "</body></html>"
        , worksheet = "<x:ExcelWorksheet><x:Name>"
        , worksheetend = "</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>"
        , worksheetvar = "{worksheet"
        , worksheetvarend = "}"
        , base64 = function (s) {
            return window.btoa(unescape(encodeURIComponent(s)));
        }
        , format = function (s, c) {
            return s.replace(/{(\w+)}/g, function (m, p) {
                return c[p];
            });
        }
        , wstemplate = ""
        , tabletemplate = "";

    var tables = table;

    for (var i = 0; i < tables.length; ++i) {
        wstemplate += worksheet + worksheetvar + i + worksheetvarend + worksheetend;
        /*
         *  addd <td></td> let two table arrange left and right
         */
        if (tables.length > 1) {
            tabletemplate += "<td>" + tablevar + i + tablevarend + "</td>";
        } else {
            tabletemplate += tablevar + i + tablevarend;
        }
    }

    /*
     * add <table><tr> and </table></tr> to Conbime left_tab and right_tab to one table
     */
    if (tables.length > 1) {
        tabletemplate = "<table><tr>" + tabletemplate + "</table></tr>";
    }

    var allTemplate = template + wstemplate + templateend;
    var allWorksheet = body + tabletemplate + bodyend;
    var allOfIt = allTemplate + allWorksheet;

    var ctx = {};
    for (var j = 0; j < tables.length; ++j) {
        ctx["worksheet" + j] = name[j];
    }

    for (var k = 0; k < tables.length; ++k) {
        var exceltable;
        if (!tables[k].nodeType) exceltable = document.getElementById(tables[k]);
        ctx["table" + k] = exceltable.innerHTML;
    }

    window.location.href = uri + base64(format(allOfIt, ctx));
}