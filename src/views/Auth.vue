<template>
    <section class="auth-section">

        <div class="container container__auth">
            <router-view name="auth"/>
        </div>
        <div class="container">
            <img src="https://picsum.photos/id/1062/1200/1080" alt="">
        </div>
    </section>
</template>

<script>
    export default {
        name: "Register"
    }
</script>

<style scoped>
    .auth-section {
        display: flex;
    }

section{
    height: 100vh;
}
    .container {
        width: 50%;
    }
    img{
        height: 100%;
        width: 99.9%;
    }
</style>
