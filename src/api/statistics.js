import instance from "~/utility/axios"

/**
 * 获取后台统计数据
 */
 export function getstatistics1(username, password) {
    return instance({
        method: 'get',
        url: '/admin/statistics1',
        data: {
            username, password
        }
    })
}

/**
 * 获取后台统计数据二
 * 
 * http://ceshi13.dishait.cn/admin/statistics2
 */
 export function getstatistics2() {
    return instance({
        method: 'get',
        url: '/admin/statistics2'
       
    })
}

/**
 * 获取后台统计数据三
 * query：type
 * http://ceshi13.dishait.cn/admin/statistics3?type=hour
 */
 export function getstatistics3(type) {
    return instance({
        method: 'get',
        url: '/admin/statistics3?type='+type,
       
    })
}