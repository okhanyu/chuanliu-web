

const {
    createApp
} = Vue;

const app = createApp({
    delimiters: ['{[', ']}'],
    data() {
        return {
            nav:navConfig,
        }
    },
    computed: {
        isMobile() {
            return window.innerWidth <= 768;
        },

    },
    methods: {
        
    },
    mounted: function (){
    }   
});

const vm = app.mount('#app');

/*** 初始化 vue end***/



