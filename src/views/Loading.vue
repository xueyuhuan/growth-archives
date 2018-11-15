<template>
    
</template>

<script>
  export default {
    name: "Loading",
    created(){
      this.$ajax.post('/getLoginUrl')
        .then(res=>{
          sessionStorage.clear();
          window.location.href=res.data.url;
        })
    }
  }
</script>

<style scoped>

</style>