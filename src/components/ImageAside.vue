<template>
    <el-aside class="image-aside" width="220px">
                    <div class="top">
                        <div v-for="i in 100" :key="i">
                            {{i}}
                        </div>
                    </div>
                    <div class="bottom">
                        fen
                    </div>
                </el-aside>
</template>

<script setup>

</script>

<style  scoped>
.image-aside {
    border-right: 1px solid #eeeeee;
     position: relative;
}

.image-aside .top {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 50px;
    overflow-y: auto;
}
.image-aside .bottom{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 50px;
}


</style>