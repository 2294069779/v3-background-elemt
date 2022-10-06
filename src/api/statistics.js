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