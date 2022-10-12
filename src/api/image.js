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