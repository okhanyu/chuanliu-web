

const {
    createApp
} = Vue;

const app = createApp({
    delimiters: ['{[', ']}'],
    data() {
        return {
            datas: [],
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
            if (param != undefined && param != "" && param.link != undefined && param.link != ""){
                s = param.link.split('://')
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
            gets(that,function(data) {
                    that.datas = data;
                    that.moreBtnShow = "More";
                });
        },
         watch(id) {
            watch(id);
        },
    },
    mounted: function() {

        const that = this;
        gets(that,
        function(data) {
            that.datas.push(...data);
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
    if (that.moreBtnShow == "No More"){
        return;
    }
    var sortOrder = "";
    if (!that.sort){
        sortOrder = "order=1&"
    }
    var url = timelineServer + "rss/list?"+sortOrder+"where=4&page_num="+ offset + "&page_size="+limit;
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

function getDataSuccess(data, callback) {
    // console.log(data);
    callback(data);
};

