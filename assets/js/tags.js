/*** 初始化 vue begin***/


document.body.className = (localStorage.getItem("mode") == "dark") ?  "night-mode" : "";

function setModeProto(mode){
      localStorage.setItem("mode",mode);
}

const {
    createApp
} = Vue;

const app = createApp({
    data() {
        return {
            datas: [],
            listByTag:[],
            moreBtn:"加载更多",
            moreListBtn:"加载更多",
            sortBtn:"点击观看量降序 ↓",
            cleanBtn:"去图模式关闭",
            tagList : true,
            currentTag : ""
        }
    },
    computed: {
      
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
        nextList(){
            offset++;
              const that = this;
                getListByTag(that.currentTag,function(data) {
                    // data.push(...that.datas);
                    // that.listByTag = data.data;
                    // that.tagList = false;
                     that.listByTag.push(...data.data);
               });
        },
        getListByTagExcute(tag){
              offset = 0;
              const that = this;
                getListByTag(tag,function(data) {
                    // data.push(...that.datas);
                    that.listByTag = data.data;
                    that.tagList = false;
                    that.currentTag = tag;
               });
        }
    },
    mounted: function() {

        const that = this;
  

        if (localStorage.getItem("cleanMode") == true || localStorage.getItem("cleanMode") == "true") {
              this.cleanBtn  = "去图模式开启";
              this.imgShow  = false;
        }else{
              this.cleanBtn  = "去图模式关闭";
              this.imgShow  = true;
        }


         getDatas(function(data) {
            // data.push(...that.datas);
            that.datas = data.data
        });

      
     
    }
});

const vm = app.mount('#app');

/*** 初始化 vue end***/

function getDatas(callback) {
    // $.ajaxSetup({ async: false });
        var limitSize  = 1000;
        $.ajax({
            type: "GET",
            url: server + "rss/tag/list?page_num="+ offset + "&page_size="+limitSize,
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

function getListByTag(tag, callback) {
    // $.ajaxSetup({ async: false });
        $.ajax({
            type: "GET",
            url: server + "rss/list?tag="+tag+"&page_num="+ offset + "&page_size="+limit,
            beforeSend: function() {
            },
            success: function(response) {
                if (response.code == 0 && response.data != null  && response.data != undefined ){
                    getDataSuccess(response, callback);
                } else {
                    vm.$data.moreListBtn = "无"
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