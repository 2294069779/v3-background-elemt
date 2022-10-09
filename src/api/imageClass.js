import instance from "~/utility/axios"

/**
 * 指定分类下的图片列表
 * @returns 
 */
export function getimageClass(page){
    return instance({
        method:'get',
        url:'/admin/image_class/'+page
    })
}