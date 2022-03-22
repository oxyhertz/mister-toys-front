<template>
    <section class="home-page">
        <h1>Welcome to toys app</h1>
        <div clas="login-container" v-if="!loggedinUser">
            <form @submit.prevent="login">
                <el-input v-model="username"  placeholder="Username..." />
                <el-input
                        v-model="password"
                        type="password"
                        placeholder="Password..."
                        show-password
                    />
                <button>Login</button>
            </form> 
        </div>
        <div class="sign-up-container">
            <form @submit.prevent="signup">
                <el-input v-model="fullname" type="text" placeholder="Fullname"/>
                <el-input v-model="username" type="text" placeholder="Username"/>
                <el-input
                        v-model="password"
                        type="password"
                        placeholder="Password..."
                        show-password
                    />
                 <button>Sign up</button>   
            </form>
        </div>
    </section>
</template>

<script>
import { userService } from "../services/user-service"
export default{
    data(){
      return {
            nickname: '',
            username: '',
            password: '',
            fullname: '',
            loggedinUser: userService.getLoggedinUser(),
      }     
    },
    methods:{
        async login() {
        this.loggedinUser = await userService.login(this.username,this.password)
        },
        async signup(){
        this.loggedinUser = await userService.signup(this.fullname,this.username,this.password)
        },
    }
}

</script>