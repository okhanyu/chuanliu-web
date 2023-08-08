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
            server:server,
            moreBtn:"加载更多",
            sortBtn:"点击观看量降序 ↓",
            cleanBtn:"无图模式",
            sort:true,
            imgShow:true,
            mode:localStorage.getItem("mode"),
            selectedColor: localStorage.getItem("color") == undefined || localStorage.getItem("color") == null || localStorage.getItem("color") == '' ? '#4659a0' : localStorage.getItem("color")
        }
    },
    computed: {
        isMobile() {
            return window.innerWidth <= 768; // 根据实际需求调整阈值
        },
        generateRandomImg() {
            if (imgRand != undefined && imgRand != null) {
                return imgRandDomain+imgRand[Math.floor(Math.random() * 100)%imgRand.length];
            }
            return backImg;
        }
        // replacedHtmlContent(html) {
        //   return this.htmlContent.replace(/<blockquote/g, '<div').replace(/<\/blockquote>/g, '</div>');
        // }
    },
    methods: {
        // isMobile() {  alert(1);
        //   return window.innerWidth <= 768; // 根据实际需求调整阈值 
        // },
        replaceBlockquoteWithDiv(html) {
             if (html != undefined && html != null && html != ""){
                 html = html.replace(/<blockquote/g, '<div').replace(/<\/blockquote>/g, '</div>');
                 html = html.replace(/<img/g, '<img style="display: none;"');
             }
          return html
        },
        changeColor() {
          // 在这里可以对颜色进行处理或执行其他操作
          console.log('Selected Color:', this.selectedColor);
           document.documentElement.style.setProperty('--primary-color', this.selectedColor);
           localStorage.setItem("color",this.selectedColor) 
        },
        imgShowSwitch(){
             this.imgShow = !this.imgShow;
             this.cleanBtn = (this.cleanBtn == "无图模式") ? "有图模式":"无图模式";
             localStorage.setItem("cleanMode",!this.imgShow);

        },
        modeSave(mode){
             localStorage.setItem("mode",mode);
        },
         generateRandomImgFunc() {
            if (imgRand != undefined && imgRand != null) {
                return imgRandDomain+imgRand[Math.floor(Math.random() * 100)%imgRand.length];
            }
            return backImg;
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
        like(item) {
            if (localStorage.getItem("like"+item.id)){
                alert("您已点过赞");
                return
            }
            $.ajax({
              url: server +"rss/like",
              type: "POST",
              data: JSON.stringify({
                //"id": parseInt(event.currentTarget.attributes["dataid"]["nodeValue"])
                "id": item.id
              }),
              success: function(response) {
                alert("点赞成功");
                item.like +=1;
                localStorage.setItem("like"+item.id,true)
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
            
            offset = 0;
            this.sort= !this.sort
            this.sortBtn = (this.sortBtn == "点击时间倒序 ↓") ? "点击观看量降序 ↓" : "点击时间倒序 ↓"
            // if (this.sortBtn == "点击按时间倒序 ↓"){
            //     this.sortBtn = "点击按观看量降序 ↓"
            // }else{
            //     this.sortBtn = "点击按时间倒序 ↓"
            // }
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
        this.changeColor();
        getDatas(function(data) {
            // data.push(...that.datas);
            that.datas = data.data
        });
        getRanks(function(data) {
            that.ranks = data.data
        });

        if (localStorage.getItem("cleanMode") == true || localStorage.getItem("cleanMode") == "true") {
              this.cleanBtn  = "有图模式";
              this.imgShow  = false;
        }else{
              this.cleanBtn  = "无图模式";
              this.imgShow  = true;
        }

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



function generateRandomImgFuncForError(node) {
            if (imgRand != undefined && imgRand != null) {
                node.src= imgRandDomain+imgRand[Math.floor(Math.random() * 100)%imgRand.length];
                return 
            }
            node.src='assets/images/back.jpg'
        }

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