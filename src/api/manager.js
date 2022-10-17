import instance from "~/utility/axios"
export function login(username, password) {
    return instance({
        method: 'post',
        url: '/admin/login',
        data: {
            username, password
        }
    })
}
export function getinfo(){
    return instance({
        method:"post",
        url:'/admin/getinfo'
    })
}
/***
 * 退出登录
 */
export function loginOut(){
    return instance({
        method:'post',
        url:'/admin/logout'
    })
}
/**
 * 
 * 修改密码
 * body：{oldpassword，password	，repassword}
 * @returns 
 */
export function updatepassword(data){
    return instance({
        method:'post',
        url:'/admin/updatepassword',
        data
    })
}
/**
 * 获取管理员信息和权限菜单
 */
// export function getinfo

export function getManagerList(page,keyword='',limit=''){
    return instance({
        method:'get',
        url:`/admin/manager/${page}`,
        params:{
            limit,
            keyword
        }
        
    })
}


/**
 * 修改用户管理状态
 */
// export function getinfo

export function updateManagerStatus(id,status){
    return instance({
        method:'post',
        url:`/admin/manager/${id}/update_status`,
        data:{
            status
        }
        
    })
}


/**
 * 增加管理员
 */
// export function getinfo

export function createManager(data){
    return instance({
        method:'post',
        url:`/admin/manager`,
        data
        
    })
}

/**
 * 修改管理员
 */
// export function getinfo

export function updateManager(id,data){
    return instance({
        method:'post',
        url:`//admin/manager/${id}`,
        data
        
    })
}

/**
 * 删除管理
 */
// export function getinfo

export function delectManager(id){
    return instance({
        method:'post',
        url:`/admin/manager/${id}/delete`,
        
        
    })
}