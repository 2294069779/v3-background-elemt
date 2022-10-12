import { reactive, ref } from 'vue';
import { loginOut, updatepassword } from '~/api/manager.js'
import { dialogmessage, message } from '~/utility/utill.js'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';


// 
export function useRepassword() {
    const store = useStore()

    const refFromDrawer = ref(null)
    //修改密码
    const updatepa = reactive({
        oldpassword: '',
        password: '',
        repassword: ''
    })
    // 修改密码验证表单
    const rules = ({
        oldpassword: [{ required: true, message: '原密码不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '新密码不能为空', trigger: 'blur' }],
        repassword: [{ required: true, message: '确定密码不能为空', trigger: 'blur' }]

    })
    // 点击修改密码
    const rulepassword = ref(null)
    const updatepwd = () => {
        console.log(1)
        rulepassword.value.validate(async (valud) => {
            if (valud) {
                refFromDrawer.value.showloading()
                try {
                    await updatepassword(updatepa)
                    message('修改成功，请重新登录')
                    store.dispatch('user/loginOut')
                } finally {
                    refFromDrawer.value.hideloading()
                }
                return false
            }
        })
    }
    const openrefFromDrawer = () => refFromDrawer.value.openShowDrawer()
    return {
        refFromDrawer,
        updatepa,
        rules,
        rulepassword,
        updatepwd,
        openrefFromDrawer
    }

}

export function useLogout() {
    const store = useStore()
    // 刷新按钮
    const router = useRouter()
    const headlereload = () => location.reload()
    // 点击退出
    const handleloginOut = () => {
        dialogmessage('是否退出登录').then(async () => {
            await loginOut()
            store.dispatch('user/loginOut')
            router.push('/login')
            message('退出成功')


        }).catch(() => {
            console.log('取消');
        })


    }
    return {
        handleloginOut,
        headlereload
    }
}