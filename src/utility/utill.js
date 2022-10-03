export function message(message,type="success"){
    ElMessage({
        message,
        type,
        duration:2000
    })
}

// 消息弹出框
export function dialogmessage(context='提示内容',type= 'warning',title){
  return  ElMessageBox.confirm(
        context,
        title,
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type
        }
      )
}
