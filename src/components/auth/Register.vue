<template>
    <div class="form text-center">
        <h2>Добро пожаловать!</h2>
        <h4>Что бы воспользоваться приложением, пожалуйста, зарегистрируйтесь.</h4>
        <q-banner v-if="error" inline-actions  class="text-white bg-red text-center absolute-center shadow-10">
            {{error}}
        </q-banner>
        <q-form
                @submit.prevent="submit"
                class="q-gutter-md"
        >
            <q-input color="black" square filled v-model="form.name" label="Имя*" class="form-input"
                     :rules="[val => !!val || 'Обязательное поле']">
                <template v-if="form.name" v-slot:append>
                    <q-icon name="cancel" @click.stop="form.name = null" class="cursor-pointer"/>
                </template>
            </q-input>
            <q-input color="black" square v-model="form.email" filled type="email" label="E-Mail*"
                     class="form-input form-email"
                     :lazy-rules="[val =>  val.includes('@') || 'Неверный формат']">
                <template v-if="form.email" v-slot:append>
                    <q-icon name="cancel" @click.stop="form.email = null" class="cursor-pointer"/>
                </template>
            </q-input>
            <q-input color="black" square v-model="form.password" filled :type="isPwd ? 'password' : 'text'"
                     label="Пароль*" class="form-input"
                     :rules="[val => val.length >= 6 || 'Должно быть больше 6 символов']">
                <template v-slot:append>
                    <q-icon
                            :name="isPwd ? 'visibility_off' : 'visibility'"
                            class="cursor-pointer"
                            @click="isPwd = !isPwd"
                    />
                </template>
            </q-input>
            <q-btn
                    type="submit"
                    :loading="submitting"
                    label="Зарегистрироваться"
                    class="q-mt-md"
                    color="black"
            >
                <template v-slot:loading>
                    <q-spinner-facebook/>
                </template>
            </q-btn>
            <router-link to="login" class="link_to_login">Уже есть учетная запись. Перейти на страницу авторизации  <q-icon name="fas fa-sign-in-alt"/></router-link>
        </q-form>
    </div>
</template>

<script>
    import firebase from "firebase";

    export default {
        name: "Register",
        data() {
            return {
                form: {
                    name: "",
                    email: "",
                    password: ""
                },
                error: null,
                isPwd: true,
                submitting: false,
            };
        },
        methods: {
            submit() {
                this.submitting = true
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(this.form.email, this.form.password)
                    .then(data => {
                        data.user
                            .updateProfile({
                                displayName: this.form.name,
                                email: this.form.email
                            })
                            .then(()=>{
                                firebase.auth().currentUser.sendEmailVerification().then(function() {
                                    console.log('registered')
                                }).catch(function(error) {
                                    console.log('error')
                                });
                            })
                            .then(() => {
                                this.$router.push('/verify')
                            });
                    })
                    .catch(err => {
                        this.error = err.message;
                    });

            },
        }
    }
</script>

<style scoped>
    .form-input {
        width: 70%;
    }

    .q-form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        margin-top: 10%;
        margin-left: 20%;
    }

    .form-email {
        margin-bottom: 35px;
    }

    .q-btn {
        width: 70%;
    }
    .link_to_login{
        color: black;
        cursor: pointer;
    }

</style>
