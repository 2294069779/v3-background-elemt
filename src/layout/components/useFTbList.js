import { ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { useCookies } from '@vueuse/integrations/useCookies'
import { router } from '~/router';

export function useFTabfn() {
    const cookies = useCookies()
    const route = useRoute()

    const activeTab = ref(route.path)
    const TabsList = ref([
        {
            title: '后台首页',
            path: '/',
        },

    ])
    //初始化tab事件
    const initTabList = () => {
        const initTab = cookies.get('tab')
        if (initTab == undefined) {
            return
        }
        console.log(1)
        TabsList.value = cookies.get('tab')

    }
    initTabList()
    //  监听路由发生变化 oNBeforeRouteUpdate,
    onBeforeRouteUpdate((to, from) => {
        activeTab.value = to.path
        addTabsList({
            title: to.meta.title,
            path: to.path
        })
    })

    // 添加tab的方法
    const addTabsList = (taboj) => {
        let istab = TabsList.value.findIndex(o => o.path == taboj.path) == -1
        if (istab) {
            TabsList.value.push(taboj)
        }
        cookies.set('tab', TabsList.value)
    }
    // 切换tab触发
    const changeTab = (e) => {
        router.push(e)
    }

    // 删除
    const removeTab = (t) => {
        let tabs = TabsList.value
        let a = activeTab.value
        if (t == a) {
            tabs.forEach((item, index) => {
                if (item.path == t) {
                    const nextactive = tabs[index - 1] || tabs[index + 1]
                    if (nextactive) {
                        a = nextactive.path
                    }

                }
            })
        }
        activeTab.value = a
        TabsList.value = tabs.filter((item) => item.path != t)
        cookies.set('tab', TabsList.value)
    }
    // 下拉按钮
    const handleClose = (e) => {
        switch (e) {
            case 'closeTabOther':
                let other = TabsList.value.filter(item => item.path == '/' || item.path == activeTab.value)
                TabsList.value = other
                cookies.set('tab', TabsList.value)
                break;
            case 'closeTabAll':
                activeTab.value = '/'
                TabsList.value = [{
                    title: '后台首页',
                    path: '/',
                }]

                cookies.set('tab', TabsList.value)
                break;
        }
    }
    return {
        activeTab, TabsList, changeTab, removeTab,handleClose
    }
}

