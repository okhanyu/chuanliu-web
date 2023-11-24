
// 服务器地址
var server = "https://nice.chuanliu.org/";
var timelineServer = "https://s.chuanliu.org/api/rss-hub/";

// 每次加载多少条
const limit = 30;
var offset = 0;

// 导航条配置
const navConfig = [
	{title:"川流严选",link:"/"},
    {title:"川流作者",link:"/user/"},
	{title:"川流广场",link:"/timeline/"},
    {title:"关于川流",link:"/about/"},
    {title:"加入川流",link:"/contact/"}
    
];


// 菜单
var menuShow = false;
function shows() {
    var elements = document.querySelectorAll('.menu-list');
    elements.forEach(function(element) {
        if (menuShow) {
            element.style.display = 'none'
        } else {
            element.style.display = 'block'
        }
        menuShow = !menuShow
    });
}
var elements = document.querySelectorAll('.menu-list');
elements.forEach(function(element) {
    element.addEventListener('blur', () =>{
        element.style.display = 'none'
    })
});

// 时间格式化
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

