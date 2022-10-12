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

/**
 * 添加图片分类下的图片列表
 * @returns 
 */

 export function PostimageClass(data){
    return instance({
        method:'POST',
        url:'/admin/image_class',
        data
    })
}


/**
 * 添加图片分类下的图片列表
 * @returns 
 */

 export function PostimageClassid(id,data){
    return instance({
        method:'POST',
        url:'/admin/image_class/'+id,
        data
    })
}

/**
 * 添加图片分类下的图片列表
 * @returns 
 */

 export function delectimageClassid(id){
    return instance({
        method:'POST',
        url:'/admin/image_class/'+id+'/delete',
    })
}
