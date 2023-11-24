const {
    createApp
} = Vue;

const app = createApp({
    delimiters: ['{[', ']}'],
    data() {
        return {
            datas: [],
            moreBtnShow: "More",
            nav: navConfig
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
            var sPre = item.content.split("\n");

            if (sPre != undefined) {
                s = [];

                for (var i = 0; i < sPre.length; i++) {
                    if (sPre[i].trim() != "") {
                        s.push(sPre[i]);
                    }
                }
                if (s != undefined && s.length > 0) {
                    //return s[0].trim().substr(1, item.content.length - 1)
                    return s[1].trim();
                }
            }
            return "未知"
        },

        handlelink(item) {
            var sPre = item.content.split("\n");

            if (sPre != undefined) {
                s = [];

                for (var i = 0; i < sPre.length; i++) {
                    if (sPre[i].trim() != "") {
                        s.push(sPre[i]);
                    }
                }
                if (s != undefined && s.length > 1) {
                    return s[2].trim()
                }
            }
            return "#"
        },
        handleuser(item) {
            var sPre = item.content.split("\n");

            if (sPre != undefined) {
                s = [];

                for (var i = 0; i < sPre.length; i++) {
                    if (sPre[i].trim() != "") {
                        s.push(sPre[i]);
                    }
                }
                if (s != undefined && s.length > 2) {
                    return s[3].trim()
                }
            }
            return "未知"
        },
        handleweb(item) {
            var sPre = item.content.split("\n");

            if (sPre != undefined) {
                s = [];

                for (var i = 0; i < sPre.length; i++) {
                    if (sPre[i].trim() != "") {
                        s.push(sPre[i]);
                    }
                }
                if (s != undefined && s.length > 3) {
                    return s[4].trim()
                }
            }
            return "#"
        },
        handlestar(item) {
            var sPre = item.content.split("\n");

            if (sPre != undefined) {
                s = [];

                for (var i = 0; i < sPre.length; i++) {
                    if (sPre[i].trim() != "") {
                        s.push(sPre[i]);
                    }
                }
                if (s != undefined && s.length > 5 && s[5].trim() == "star") {
                    return true;
                }
            }
            return false;
        },
        handlesummary(item) {
            var sPre = item.content.split("\n");

            if (sPre != undefined) {
                s = [];

                for (var i = 0; i < sPre.length; i++) {
                    if (sPre[i].trim() != "") {
                        s.push(sPre[i]);
                    }
                }

                if (s != undefined && s.length > 5) {
                    //return s[5].trim() + "\n...\n" + s[s.length - 1].trim()
                    var ss = "";
                    for (var i = (s[5].trim() != "star" ? 5 : 6); i < s.length; i++) {
                        if (s[i].trim() != "") {
                            ss += s[i].trim() + "\n";
                        }
                    }
                    ss = ss.trim() == "" ? "暂时无详细推荐理由": ss;
                    return ss;
                }

            }

            return "暂时无详细推荐理由"
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
            that.moreBtnShow = "More";
        });
    }
});

const vm = app.mount('#app');

/*** 初始化 vue end***/

function gets(that, callback) {
    if (that.moreBtnShow == "No More") {
        return;
    }
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
            vm.$data.moreBtnShow = "No More";
            return;
        }
        getDataSuccess(data, callback);

    }).
    catch(function(err) {
        console.log(err);
    });
}

function getDataSuccess(data, callback) {
    // console.log(data);
    callback(data);
};