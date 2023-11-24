

const {
    createApp
} = Vue;

const app = createApp({
    delimiters: ['{[', ']}'],
    data() {
        return {
            datas: [],
            ranks: [],
            aTotal: 0,
            aWatch: 0,
            aLike: 0,
            moreBtnShow: "More",
            nav:navConfig,
            sortBtn:"↓",
            sort:true
        }
    },
    computed: {
        isMobile() {
            return window.innerWidth <= 768;
        },

    },
    methods: {
         handleUserLink(param){
           if (param != undefined && param != "" && param.rss_link != undefined && param.rss_link != ""){
                s = param.rss_link.split('://')
                return s[0]+"://"+s[1].split("/")[0]
            }
        },
        next(event) {
            offset++;
            const that = this;
            gets(that,
            function(data) {
                that.datas.push(...data);
            });

        },
        format(times) {
            return format(times);
        },
         watch(id) {
            watch(id);
        },
    },
    mounted: function() {

        const that = this;
        gets(that,
        function(data) {
              for (var i = data.length - 1; i >= 0; i--) {
                that.aTotal +=  data[i].total;
                that.aWatch +=  data[i].watch;
                that.aLike +=   data[i].like;
                that.datas.push(data[i]);
            };
            getsRecent(that);
        });
    }
});

const vm = app.mount('#app');

/*** 初始化 vue end***/

function watch(id){
     var url = timelineServer + "rss/watch";
    var promise = fetch(url,
        {
            method: 'post',
            // headers: {
            //     'Content-Type': 'application/json'
            // },
            body: JSON.stringify({
                "id": id
            })
        }).then(function(response) {
        if (response.status === 200) {
            return response.json();
        } else {
            return {}
        }
    });

    promise = promise.then(function(data) {

    }).
    catch(function(err) {
        console.log(err);
    });
}

function gets(that, callback) {
    // that = this;
    var limitTemp = 1000;
    var url = timelineServer + "user/list/group?page_num="+ offset + "&page_size="+limitTemp+"&order=4";
    var promise = fetch(url).then(function(response) {
        if (response.status === 200) {
            return response.json();
        } else {
            return {}
        }
    });

    promise = promise.then(function(data) {
        if (data == undefined || data.code != 0 || data.data == null) {
            vm.$data.moreBtnShow = "No More";
            return;
        }
        getDataSuccess(data.data, callback);

    }).
    catch(function(err) {
        console.log(err);
    });
}

function getsRecent(that, callback) {
    var url = timelineServer + "rss/user/list/recent";
    var promise = fetch(url).then(function(response) {
        if (response.status === 200) {
            return response.json();
        } else {
            return {}
        }
    });

    promise = promise.then(function(response) {
        if (response == undefined || response.code != 0 || response.data == null) {
            vm.response.moreBtnShow = "No More";
            return;
        }
       // console.log(response);
       var map = {};
       for (var i = 0; i < response.data.length; i++) {
            if (map[response.data[i].user_id] == undefined){
                map[response.data[i].user_id] = [];
            }
            map[response.data[i].user_id].push(response.data[i]);
       }
       // console.log(map);
       for (var i = 0; i < vm.$data.datas.length; i++) {
           vm.$data.datas[i]["recent"] = map[vm.$data.datas[i].id];
       }
        // console.log(vm.$data.datas);

    }).
    catch(function(err) {
        console.log(err);
    });
}

function getDataSuccess(data, callback) {
    // console.log(data);
    callback(data);
};

