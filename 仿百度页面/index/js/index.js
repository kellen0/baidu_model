// var qinghua = '';
// var content = document.querySelector("#qinghua");
// console.log(content.innerHTML);

// 获取情话
var qinghua = new Vue({
    el: ".main",
    data: {
        //天气情况
        weather: '',
        //每日情话数据
        qinghua: "",
        // 电影数据
        movieList: [],
        //背景图片分类
        sortList: ['美女', '汽车', '二次元', '动漫'],
        //背景图片url
        bgUrl: '',
        //当前图片索引
        currentIndex: 1,
        //搜索内容
        query: '',
    },
    //页面加载完成后执行函数
    mounted() {
        this.get();
        this.getMovie();
        this.getBgUrl();
        this.getWeather();

    },
    methods: {
        //获取天气数据
        getWeather: function() {
            let that = this;
            axios.get("http://wthrcdn.etouch.cn/weather_mini?city=北京").then(
                function(response) {
                    // that.weatherList = response.data.data.forecast;
                    // console.log(response.data.data.wendu);
                    that.weather = response.data.data.wendu;
                },
                function(err) {}
            )
        },
        //获取情话数据
        get: function() {
            let that = this;
            axios.get("https://api.uomg.com/api/rand.qinghua").then(
                function(response) {
                    // console.log(response.data.content);
                    that.qinghua = response.data.content;

                },
                function(err) {
                    console.log(err);
                }
            )
        },
        // 获取电影列表
        getMovie: function() {
            let that = this;
            axios.get("https://api.vvhan.com/api/douban").then(
                function(response) {
                    // console.log(response.data.data);
                    that.movieList = response.data.data;
                },
                function(err) {
                    console.log(err);
                }
            )
        },
        //获取背景图片url
        getBgUrl: function() {
            let that = this;
            axios.get("https://api.uomg.com/api/rand.img1?sort=" + that.sortList[that.currentIndex] + "&format=json").then(
                function(response) {
                    // console.log(response);
                    that.bgUrl = response.data.imgurl;
                },
                function(err) {
                    console.log(err);
                }
            )
            if (that.currentIndex < that.sortList.length - 1) {
                that.currentIndex++;
            } else {
                that.currentIndex = 0;
            }
            // console.log(that.currentIndex);
        },
        //搜索
        search: function() {
            if (this.query != '') {
                window.location.href = 'https://www.baidu.com/s?wd=' + this.query;
            }
            // console.log(this.query);
        }
    }
})