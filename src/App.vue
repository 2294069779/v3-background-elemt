<script setup>
   

</script>

<template>
<div>
   <router-view></router-view>
</div>
</template>

<style>
   body{
      @apply bg-light-500;
   }
::-webkit-scrollbar{
width: 4px;
height: 6px;
}   
::-webkit-scrollbar-thumb, 
::-webkit-scrollbar-track {
 border-right-color:transparent;
 border-left-color:transparent;
 background-color: rgba(0, 0, 0, 0.1);

}  
::-webkit-scrollbar-track-piece{

} 
::-webkit-scrollbar-thumb {
border-radius: 8;
background-color: rgba(0, 0, 0, 0.2);
}
::-webkit-scrollbar-corner{
   display: block; 
}
::-webkit-resizer 

</style>
