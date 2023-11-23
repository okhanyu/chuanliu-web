var show = false;
function shows() {
    var elements = document.querySelectorAll('.menu-list');
    elements.forEach(function(element) {
        if (show) {
            element.style.display = 'none'
        } else {
            element.style.display = 'block'
        }
        show = !show
    })
}
var elements = document.querySelectorAll('.menu-list');
elements.forEach(function(element) {
    element.addEventListener('blur', () =>{
        element.style.display = 'none'
    })
});

var offset = 0;

const {
    createApp
} = Vue;

const app = createApp({
    delimiters: ['{[', ']}'],
    data() {
        return {
            datas: [],
            server: server,
            moreBtn: "More",
            moreBtnShow: false
        }
    },
    computed: {
        isMobile() {
            return window.innerWidth <= 768;
        },

    },
    methods: {
        handletitle(item) {
            // item.content.split("\n")[0].substr(1,item.content.length-1)
            var s = item.content.split("\n");
            if (s != undefined && s.length > 0) {
                return s[0].trim().substr(1, item.content.length - 1)
            }
            return "未知"
        },

        handlelink(item) {
            var s = item.content.split("\n");
            if (s != undefined && s.length > 1) {
                return s[1].trim()
            }
            return "#"
        },
        handleuser(item) {
            var s = item.content.split("\n");
            if (s != undefined && s.length > 2) {
                return s[2].trim()
            }
            return "未知"
        },
        handleweb(item) {
            var s = item.content.split("\n");
            if (s != undefined && s.length > 3) {
                return s[3].trim()
            }
            return "#"
        },
        handlestar(item) {
            var s = item.content.split("\n");
            if (s != undefined && s.length > 4 && s[4].trim() == "star") {
                return true;
            }
            return false;
        },
        handlesummary(item) {
            var s = item.content.split("\n");
            if (s != undefined && s.length > 4) {
                 //return s[5].trim() + "\n...\n" + s[s.length - 1].trim()
                var ss = "";
                for (var i = (s[4].trim() != "star" ? 4:5); i < s.length; i++) {
                    if (s[i].trim() != "") {
                        ss += s[i].trim() + "\n";
                    }
                }
                ss = ss.trim() == "" ?  "无推荐理由" : ss;
                return ss;
            }
            return "无推荐理由"
        },
        handle(param) {
            if (param != undefined && param != "" && param.link != undefined && param.link != "") {
                s = param.link.split('://');
                return s[0] + "://" + s[1].split("/")[0]
            }
        },
        next(event) {
            offset += limit;
            const that = this;
            gets(that,
            function(data) {
                that.datas.push(...data);
            });

        },
        format(times) {
            return format(times);
        },
    },
    mounted: function() {

        const that = this;
        gets(that,
        function(data) {
            that.datas.push(...data);
            that.moreBtnShow = true;
        });
    }
});

const vm = app.mount('#app');

/*** 初始化 vue end***/

function gets(that, callback) {
    // that = this;
    var url = server + "api/v1/memo?creatorId=1&offset=" + offset + "&limit=" + limit;
    var promise = fetch(url).then(function(response) {
        if (response.status === 200) {
            return response.json();
        } else {
            return {}
        }
    });

    promise = promise.then(function(data) {
        if (data == undefined || data.length == 0) {
            vm.$data.moreBtnShow = false;
            return;
        }
        getDataSuccess(data, callback);

    }).
    catch(function(err) {
        console.log(err);
    });
}

function getDataSuccess(data, callback) {
    console.log(data);
    callback(data);
};

function format(timestamp) {
    // 创建 Date 对象
    var date = new Date(timestamp * 1000);

    // 获取各种时间组件
    var year = date.getFullYear();
    var month = date.getMonth() + 1; // 月份从 0 开始，所以需要加 1
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    // 格式化时间
    var formattedTime = year + '-' + addLeadingZero(month) + '-' + addLeadingZero(day) + ' ' + addLeadingZero(hours) + ':' + addLeadingZero(minutes) + ':' + addLeadingZero(seconds);

    return formattedTime;
}

// 在个位数前添加前导零
function addLeadingZero(number) {
    return number < 10 ? '0' + number: number;
}