/*** 初始化 vue begin***/


if (localStorage.getItem("mode") == "dark"){
    document.body.className = "night-mode";
}else{
      document.body.className = "";
}


const {
    createApp
} = Vue;

const app = createApp({
    data() {
        return {
            datas: [],
            ranks: [],
            aTotal: 0,
            aWatch: 0,
            server:server,
            moreBtn:"加载更多"
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
            }
            console.log(that.aTotal)
            console.log(that.aWatch)
        });
     
    }
});

const vm = app.mount('#app');

/*** 初始化 vue end***/



function getUsers(callback) {
    // $.ajaxSetup({ async: false });

        $.ajax({
            type: "GET",
            url: server + "user/list/group?page_num="+ offset + "&page_size="+limit,
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