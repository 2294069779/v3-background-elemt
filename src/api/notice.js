import instance from "~/utility/axios"

/**
 * 获取表单数据
 */
export function getNotice(page){
    return instance({
        method:'get',
        url:`/admin/notice/${page}`
    })
}

/**
 *新增公告
 */
export function createNotice(data){
    return instance({
        method:'post',
        url:'/admin/notice',
        data
    })
}

/**
 *修改公告
 */
 export function updateNotice(id,data){
    return instance({
        method:'post',
        url:`/admin/notice/${id}`,
        data
    })
}

/**
 *删除公告
 */
 export function delectNotice(id){
    return instance({
        method:'post',
        url:`/admin/notice/${id}/delete`,
        
    })
}