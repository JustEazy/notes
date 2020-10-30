<template>
    <div class="form text-center">
        <h2>Добро пожаловать!</h2>
        <h4>Что бы воспользоваться приложением, пожалуйста, авторизируйтесь.</h4>
        <q-form
                @submit.prevent="submit"
                class="q-gutter-md"
        >
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
                    label="Войти"
                    class="q-mt-md"
                    color="black"
            >
                <template v-slot:loading>
                    <q-spinner-facebook/>
                </template>
            </q-btn>
        </q-form>
    </div>
</template>

<script>
    import firebase from "firebase";

    export default {
        name: "Login",
        data() {
            return {
                form: {
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
                    .signInWithEmailAndPassword(this.form.email, this.form.password)
                    .then(data => {
                        this.$router.replace({name: "All"});
                    })
                    .catch(err => {
                        this.error = err.message;
                    });
            }
        }
    }
</script>

<style scoped>
    .form-input {
        width: 70%;
    }

    .q-form {
        margin-top: 10%;
        margin-left: 20%;
    }

    .form-email {
        margin-bottom: 35px;
    }

    .q-btn {
        width: 70%;
        margin-right: 215px;
    }
</style>
