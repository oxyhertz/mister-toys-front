<template>
    <section class="toy-edit" v-if="toyToEdit">
        <form @submit.prevent="saveToy" class="form">
            <div class="form-control">
                <label>
                    Toy Name
                    <input type="text" v-model="toyToEdit.name">
                </label>
            </div>
            <div class="form-control">
                <label>
                    Toy Price
                    <input type="text" v-model="toyToEdit.price">
                </label>
            </div>
            <div class="form-control">
                <label>
                    In Stock
                    <input type="text" v-model="toyToEdit.name">
                </label>
            </div>
            <div class="btn-group">
                 <button @click="saveToy" class="">save</button>
                 <button @click="goBack" class="">go back</button>
            </div>
        </form>


    </section>
</template>

<script>
import { toyService } from "../services/toy-service";

    export default{
        name: 'toy-edit',
        data(){
            return{
                toyToEdit: null,
            }
        },
        created(){
            const {id} = this.$route.params
            if(id){
                toyService.getById(id).then(toy => {
                    this.toyToEdit = toy
                })
            }
            else this.toyToEdit = toyService.getEmptyToy();
        },
        methods:{
            goBack(){
                this.$router.push('/toy')
            },
            saveToy(){
                this.$store.dispatch({
                    type: 'saveToy',
                    toy: this.toyToEdit
                }).then( () => {
                    this.$router.push('/toy')
                } )
            }
        }
    }

</script>