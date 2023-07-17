/*** 初始化 vue begin***/

const {
    createApp
} = Vue;

const app = createApp({
    data() {
        return {
            datas: [],
            ranks: [],
            banners: [],
            server:server,
            moreBtn:"加载更多"
        }
    },
    methods: {
        watch(event) {

            $.ajax({
              url: server +"watch",
              type: "POST",
              data: JSON.stringify({
                "id": parseInt(event.currentTarget.attributes["dataid"]["nodeValue"])
              }),
              success: function(response) {
                console.log(response)
              },
              error: function(xhr, status, error) {
                console.log(e);
              }
            });
        },
        next(event) {
            offset++;
            const that = this;
            getDatas(function(data) {
               that.datas.push(...data.data);

            });
        },
        nextSort(event) {
            offset++;
            const that = this;
            getDatas(function(data) {
                data.push(...that.datas);
                that.datas = sort(data);
            });
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
        getBanners(function(data) {
            that.banners = data.data
        });
    }
});

const vm = app.mount('#app');

/*** 初始化 vue end***/

function getBanners(callback) {
    // $.ajaxSetup({ async: false });

        $.ajax({
            type: "GET",
            url: server + "get?where=1",
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
            url: server + "get?order=1",
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
            url: server + "get?page_num="+ offset + "&page_size="+limit,
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