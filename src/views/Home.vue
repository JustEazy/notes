<template>
    <q-layout view="lHh LpR fFf">

        <q-header reveal class="bg-black text-white" height-hint="100">
            <q-img
                    :src="url"
            >
                <template v-slot:loading>
                    <q-spinner-gears color="white"/>
                </template>
                <q-toolbar>
                    <q-btn flat icon="menu" @click="drawer = !drawer"/>
                    <q-toolbar-title class="text-white">
                        Напоминания
                    </q-toolbar-title>
                </q-toolbar>
            </q-img>
            <q-tabs align="left">
                <q-route-tab to="/all" label="Все"/>
                <q-route-tab to="/important" label="Важные"/>
                <q-route-tab to="/later" label="На потом"/>
            </q-tabs>
        </q-header>

        <q-drawer
                v-model="drawer"
                show-if-above
                :width="200"
                :breakpoint="400"
                behavior="mobile"
        >
            <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
                <q-list padding>
                    <q-item clickable v-ripple>
                        <q-item-section avatar>
                            <q-icon name="note_add"/>
                        </q-item-section>

                        <q-item-section>
                            Создать напоминание
                        </q-item-section>
                    </q-item>

                    <q-item clickable v-ripple>
                        <q-item-section avatar>
                            <q-icon name="settings"/>
                        </q-item-section>

                        <q-item-section>
                            Настройки
                        </q-item-section>
                    </q-item>

                    <q-item clickable v-ripple>
                        <q-item-section avatar>
                            <q-icon name="description"/>
                        </q-item-section>

                        <q-item-section>
                            Описание обновления
                        </q-item-section>
                    </q-item>

                    <q-item clickable v-ripple>
                        <q-item-section avatar>
                            <q-icon name="drafts"/>
                        </q-item-section>

                        <q-item-section>
                            Уведомления
                        </q-item-section>
                    </q-item>

                    <q-item clickable v-ripple @click.prevent="signOut">
                        <q-item-section avatar>
                            <q-icon name="fas fa-sign-out-alt"/>
                        </q-item-section>

                        <q-item-section>
                            Выйти из учетной записи
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-scroll-area>
            <q-img class="absolute-top" src="https://picsum.photos/id/1010/200/150?blur" style="height: 150px">
                <div class="absolute-center bg-transparent">
                    <div class="text-weight-bold text-black text-h5">{{user.data.displayName}}</div>
                </div>
            </q-img>
        </q-drawer>
        <q-page-container class="bg-brown-1">
            <router-view name="pages"/>
        </q-page-container>
    </q-layout>
</template>

<script>
    import {mapGetters} from "vuex";
    import firebase from "firebase";

    export default {
        name: "Home",
        data() {
            return {
                drawer: false,
                url: 'https://picsum.photos/id/1/1920/300'
            }
        },
        computed: {
            ...mapGetters({
                user: "user"
            })
        },
        methods: {
            signOut() {
                firebase
                    .auth()
                    .signOut()
                    .then(() => {
                        this.$router.replace({
                            name: "login"
                        });
                    });
            }
        }
    }
</script>

<style scoped>

</style>
