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