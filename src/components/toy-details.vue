<template>
    <section  v-if="toy" class="toy-details">
        <article>
            <p>ID: {{toy.id}}</p>
            <p>Name: {{toy.name}}</p>
            <p>Price: {{toy.price}}</p>
            <p>Labels: 
                <ul>
                    <li v-for="label in toy.labels" :key="label">
                        {{label}}
                    </li>
                </ul>
            </p>
            <hr>
            <div v-if="reviews.length && reviews" class="review-container">
                <div v-for="review in reviews" :key="review.content">
                    <p>{{review.content}}</p>
                </div>
            </div>
        </article>
        <el-button plain @click="open1"> Success </el-button>
        <chat-room :toy="toy" />
        <form v-if="loggedInUser" @submit.prevent="addReview()">
            <h2>Add review:</h2>
            <textarea placeholder="Your Opinion Matters..." v-model="reviewToEdit.content"></textarea>
            <button>Save</button>
         </form>

        <button @click="goBack">Back</button>
    </section>
</template>

<script>
import { toyService } from "../services/toy-service";
import { ElNotification } from 'element-plus'
import chatRoom from "./chat-room.vue";
export default{
    name:'toy-details',
    data(){
        return {
            toy : null,
            reviewToEdit: {
                content: '',
                userId: '',
                toyId:'',
            },
        }
    },
  async created(){
        const {id} = this.$route.params
        this.toy = await  toyService.getById(id)
         const user = this.$store.getters.loggedinUser

        await this.$store.dispatch({type: 'getReviews', filterBy: { toyId: id }})
        if(user){
            this.reviewToEdit.toyId = id
            this.reviewToEdit.userId = user._id

        }

    },
    components:{
        chatRoom
    },
    computed:{
       
        reviews() {
        return this.$store.getters.reviews;
        },
        loggedInUser() {
        return this.$store.getters.loggedinUser
        },
        users() {
        return this.$store.getters.users
        },
    },
    methods:{
        open1(){
            ElNotification({
                title: 'Success',
                message: 'This is a success message',
                type: 'success',
            })
        },
        goBack(){
            this.$router.push('/toy')
        },
        async addReview() {
         if (!this.reviewToEdit.content) return   
         await this.$store.dispatch({type: 'addReview', review: this.reviewToEdit})
         await this.$store.dispatch({ type: 'getReviews', filterBy: { toyId: this.toy._id } })
         this.reviewToEdit.content = ""
         }
    }
    

}

</script>