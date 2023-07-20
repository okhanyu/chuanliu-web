/*** 初始化 vue begin***/

const {
    createApp
} = Vue;

const app = createApp({
    data() {
        return {
            datas: [],
            ranks: [],
            server:server,
            moreBtn:"加载更多",
            sortBtn:"点击浏览量降序",
            sort:true,
            userMap:{}
        }
    },
     computed: {
        isMobile() {
            return window.innerWidth <= 768; // 根据实际需求调整阈值
        }
    },
    methods: {
        // isMobile() {  alert(1);
        //   return window.innerWidth <= 768; // 根据实际需求调整阈值 
        // },
        watch(id) {
            $.ajax({
              url: server +"rss/watch",
              type: "POST",
              data: JSON.stringify({
                //"id": parseInt(event.currentTarget.attributes["dataid"]["nodeValue"])
                "id": id
              }),
              success: function(response) {
                console.log(response)
              },
              error: function(xhr, status, error) {
                console.log(e);
              }
            });
        },
         handle(param){
            if (param != undefined && param != "" && param.link != undefined && param.link != ""){
                s = param.link.split('://')
                return s[0]+"://"+s[1].split("/")[0]
            }
        },
        next(event) {
            offset++;
            const that = this;
            if (this.sort){
                getDatas(function(data) {
                     that.datas.push(...data.data);
                });
            } else {
                 getSorts(function(data) {
                  that.datas.push(...data.data);
                    //data.push(...that.datas);
                    //that.datas = sort(data);
                });
            }
          
        },
        sortChange(event) {
            this.sort= !this.sort
            offset = 0;
            if (this.sortBtn == "点击时间倒序"){
                this.sortBtn = "点击浏览量降序"
            }else{
                this.sortBtn = "点击时间倒序"
            }
            const that = this;
             if (this.sort){
                 getDatas(function(data) {
                    // data.push(...that.datas);
                    that.datas = data.data
                });
             }else{
                getSorts(function(data) {
                 that.datas = data.data
                //data.push(...that.datas);
                //that.datas = sort(data);
            });
             }
            
        }
    },
    mounted: function() {
        const that = this;
        getDatas(function(data) {
            // data.push(...that.datas);
            that.datas = data.data
        });
        getRanks(function(data) {
            that.ranks = data.data
        });
        //getUsers(function(data) {
            // var map = {};
            // for (var i = 0; i < data.data.length; i++) {
            //    map[data.data[i].id] = data.data[i];
            // }
            // that.userMap = map;
            // for (var i = 0; i < that.datas.length; i++) {
            //     that.set(that.datas[i], 'avatar', that.userMap[that.datas[i].user_id].avatar);
            //     // that.datas[i].avatar =  that.userMap[that.datas[i].user_id].avatar;
            //     // that.$forceUpdate()
            // }
        //});
     
    }
});

const vm = app.mount('#app');

/*** 初始化 vue end***/


function getSorts(callback) {
    // $.ajaxSetup({ async: false });

        $.ajax({
            type: "GET",
            url: server + "rss/list?order=1&where=1&page_num="+ offset + "&page_size="+limit,
            beforeSend: function() {
            },
            success: function(response) {
                
                getDataSuccess(response, callback);
            },
            error: function(e) {
                console.log(e);
            }
        });
    // $.ajaxSetup({ async: true });
    //getDataSuccess(sort(allData), callback);

};


function getRanks(callback) {
    // $.ajaxSetup({ async: false });

        $.ajax({
            type: "GET",
            url: server + "rss/list?order=1&where=2&page_num="+ offset + "&page_size=3",
            beforeSend: function() {
            },
            success: function(response) {
                getDataSuccess(response, callback);
            },
            error: function(e) {
                console.log(e);
            }
        });
    // $.ajaxSetup({ async: true });
    //getDataSuccess(sort(allData), callback);

};


function getDatas(callback) {
    // $.ajaxSetup({ async: false });

        $.ajax({
            type: "GET",
            url: server + "rss/list?where=1&page_num="+ offset + "&page_size="+limit,
            beforeSend: function() {
            },
            success: function(response) {
                if (response.code == 0 && response.data != null  && response.data != undefined ){
                    getDataSuccess(response, callback);
                } else {
                    vm.$data.moreBtn = "无"
                }
                
            },
            error: function(e) {
                console.log(e);
            }
        });
    // $.ajaxSetup({ async: true });
    // getDataSuccess(sort(allData), callback);

};

function getUsers(callback) {
    // $.ajaxSetup({ async: false });

        $.ajax({
            type: "GET",
            url: server + "user/list",
            beforeSend: function() {
            },
            success: function(response) {
                getDataSuccess(response, callback);
                console.log(response);
            },
            error: function(e) {
                console.log(e);
            }
        });
    // $.ajaxSetup({ async: true });
    // getDataSuccess(sort(allData), callback);

};

function getDataSuccess(data, callback) {
    console.log(data)
    callback(data);
};