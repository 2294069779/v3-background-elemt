<template>
    <div class="f-menu" :style="{ width: $store.state.user.asideWidth }">
        <el-menu text-color="#000000" :collapse="isCollapse" :collapse-transition="false" unique-opened :default-active="defaultActive" style="background-color: #545c64;"  @select="handleSelect" >
            <div v-for="(item,index) in asideMenus" :key="index">
                <el-sub-menu v-if="item.child && item.child.length >0" :index="item.name">
                    <template #title>
                        <el-icon>
                            <el-icon>
                                <component :is="item.icon"></component>
                            </el-icon>
                        </el-icon>
                        
                        <span>{{item.name}}</span>
                    </template>
                    <el-menu-item v-for="(item2,index2) in item.child" :key="index2" :index="item2.frontpath">
                        <el-icon>
                        <component :is="item2.icon"></component>
                    </el-icon>
                        {{item2.name}}
                    </el-menu-item>
                </el-sub-menu>
                        
                <el-menu-item v-else :index="item.frontpath">
                    <el-icon>
                        <component :is="item.icon"></component>
                    </el-icon>
                    <span>{{item.name}}</span>
                </el-menu-item>

            </div>
        </el-menu>
    </div>

</template>

<script setup>
import { ref } from 'vue';
import { useRouter,useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { computed } from 'vue';
const store = useStore();
const router = useRouter()
const route = useRoute()
const defaultActive=ref(route.path)
const isCollapse = computed(() => !(store.state.user.asideWidth == '250px'))
const asideMenus = computed(() => store.state.user.menus)

const handleSelect = (e) => {
    router.push(e)
}

// 是否折叠


</script>

<style  scoped>
.f-menu {
   transition: all 0.3s;
    @apply shadow-md fixed;
    top: 64px;
    bottom: 0px;
    left: 0px;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: #545c64;
    border: 0;
}
::v-deep(.el-menu) {
      border: 0;
    }

</style>
