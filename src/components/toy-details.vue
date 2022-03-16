<template>
    <section v-if="toy" class="toy-details">
        <article>
            <p>ID: {{toy.id}}</p>
            <p>Name: {{toy.name}}</p>
            <p>Price: {{toy.price}}</p>
            <p>Labels: 
                <ul>
                    <li v-for="label in toy.label" :key="label">
                        {{label}}
                    </li>
                </ul>
            </p>
        </article>
        <button @click="goBack">Back</button>
    </section>
</template>

<script>
import { toyService } from "../services/toy-service";

export default{
    name:'toy-details',
    data(){
        return {
            toy : null,
        }
    },
    created(){
        const {id} = this.$route.params
        toyService.getById(id).then(toy => {
            this.toy = toy

            console.log(toy)
        })
    },
    methods:{
        goBack(){
            this.$router.push('/toy')
        }
    }
    

}

</script>