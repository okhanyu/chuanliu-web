/*** 初始化 vue begin***/


 document.body.className = (localStorage.getItem("mode") == "dark") ?  "night-mode" : "";


function setModeProto(mode){
      localStorage.setItem("mode",mode);
      vm.$data.mode = mode;
       if(window.innerWidth <= 768){
        if (mode == "dark"){
             $(".dark-mode").hide();
              $(".light-mode").show();
        }else{
            $(".light-mode").hide();
             $(".dark-mode").show();
        }
      }
}

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
            server:server,
            moreBtn:"加载更多",
            mode:localStorage.getItem("mode")
        }
    },
    methods: {
        modeSave(mode){
             localStorage.setItem("mode",mode);
        },
        next(event) {
            offset++;
            const that = this;
            getDatas(function(data) {
               that.datas.push(...data.data);

            });
        },
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
            if (param != undefined && param != "" && param.rss_link != undefined && param.rss_link != ""){
                s = param.rss_link.split('://')
                return s[0]+"://"+s[1].split("/")[0]
            }
        }
        // nextSort(event) {
        //     offset++;
        //     const that = this;
        //     getDatas(function(data) {
        //         data.push(...that.datas);
        //         that.datas = sort(data);
        //     });
        // }
    },
    mounted: function() {
        const that = this;
      
        getUsers(function(data) {
            // data.push(...that.datas);
            that.datas = data.data
            for (var i = 0; i < that.datas.length; i++) {
               that.aTotal +=  that.datas[i].total
               that.aWatch +=  that.datas[i].watch
               that.aLike +=  that.datas[i].like
            }
            getUsersRecent(that);
        });
     
    }
});

const vm = app.mount('#app');

/*** 初始化 vue end***/


function getUsersRecent(appglobal) {
    // $.ajaxSetup({ async: false });
        $.ajax({
            type: "GET",
            url: server + "rss/user/list/recent",
            beforeSend: function() {
            },
            success: function(response) {
                   console.log(response);
                   var map = {};
                   for (var i = 0; i < response.data.length; i++) {
                        if (map[response.data[i].user_id] == undefined){
                            map[response.data[i].user_id] = [];
                        }
                        map[response.data[i].user_id].push(response.data[i]);
                   }
                   console.log(map)
                   for (var i = 0; i < appglobal.datas.length; i++) {
                       appglobal.datas[i]["recent"] = map[appglobal.datas[i].id];
                   }
                    console.log(appglobal.datas)

            },
            error: function(e) {
                console.log(e);
            }
        });
};

function getUsers(callback) {
    // $.ajaxSetup({ async: false });
        var limitTemp = 1000;
        $.ajax({
            type: "GET",
            url: server + "user/list/group?page_num="+ offset + "&page_size="+limitTemp+"&order=4",
            beforeSend: function() {
            },
            success: function(response) {
                if (response.code == 0 && response.data != null  && response.data != undefined ){
                    getDataSuccess(response, callback);
                }else{
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

function getDataSuccess(data, callback) {
    console.log(data)
    callback(data);
};