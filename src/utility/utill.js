export function message(message,type="success",dangerouslyUseHTMLString=true){
    ElMessage({
        message,
        type,
        dangerouslyUseHTMLString,
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

// 修改输入弹出框
export function dilogElMessageBox(Please,value=''){
 return  ElMessageBox.prompt(Please, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputValue:value
  })
}
