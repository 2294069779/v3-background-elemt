<template>
    <div>
        <el-upload class="upload-demo" drag :action="ACTIONS" :headers="{token }"  name="img" :data="data" 
            :on-success="successImage" :on-error="errorImage" :on-progress="onprogress" multiple>
            <el-icon class="el-icon--upload">
                <upload-filled />
            </el-icon>
            <div class="el-upload__text">
                Drop file here or <em>click to upload</em>
            </div>
            <template #tip>
                <div class="el-upload__tip">
                    jpg/png files with a size less than 500kb
                </div>
            </template>
        </el-upload>
    </div>
</template>

<script setup>

import { ACTIONS } from '~/api/image.js'
import { getToken } from '~/utility/auth.js'
import { message} from '~/utility/utill.js'

const token = getToken()

// 上传成功
const emit=defineEmits(['successimg'])
const onprogress=()=>{
    message('正在上传重，需要一定的时间')
}
const successImage=(response) => {
    
    emit('successimg',response)
}
const errorImage=(error) => {
    let errormsg= JSON.parse(error.message)
    message(errormsg.msg,'error')
}

defineProps({
    data: Object
})

</script>
