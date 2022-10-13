import instance from "~/utility/axios"



/**
 * 指定分类下的图片列表
 * @returns 
 */
export function getimage(id,page){
    return instance({
        method:'get',
        url:`/admin/image_class/${id}/image/${page}`
    })
}

/**
 * 删除
 * @returns 
 */
 export function delectImageName(ids){
    return instance({
        method:'post',
        url:`/admin/image/delete_all`,
        data:{ ids:[ids] }
    })
}

/**
 * 修改
 * @returns 
 */
 export function postImageName(id,name){
    return instance({
        method:'post',
        url:`/admin/image/${id}`,
        data:{name}
    })
}