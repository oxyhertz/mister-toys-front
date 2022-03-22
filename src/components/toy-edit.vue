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
            

            <div>
                <label>
                    In stock?
                <el-radio-group v-model="toyToEdit.inStock">
                    <el-radio :label="true">Yes</el-radio>
                    <el-radio :label="false">No</el-radio>
                </el-radio-group>
                </label>
            </div>
        <div style="display: inline-block; margin-left: 20px">
          <p style="margin-left: 10px">Labels</p>
          <el-select
          
            v-model="toyToEdit.labels"
            multiple
            collapse-tags
            collapse-tags-tooltip
            placeholder="Select"
            style="width: 240px"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
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
import {socketService} from '../services/socket.service';

    export default{
        name: 'toy-edit',
        data(){
            return{
                toyToEdit: null,
                options: [
                    {
                    value: 'On wheels',
                    label: 'On wheels',
                    },
                    {
                    value: 'Box game',
                    label: 'Box game',
                    },
                    {
                    value: 'Art',
                    label: 'Art',
                    },
                    {
                    value: 'Baby',
                    label: 'Baby',
                    },
                    {
                    value: 'Doll',
                    label: 'Doll',
                    },
                    {
                    value: 'Puzzle',
                    label: 'Puzzle',
                    },
                    {
                    value: 'Outdoor',
                    label: 'Outdoor',
                    },
                ]
            }
        },
       async created(){
            const {id} = this.$route.params
            if(id){
                this.toyToEdit = await toyService.getById(id)
            }
            else this.toyToEdit = toyService.getEmptyToy();
        },
        methods:{
            goBack(){
                this.$router.push('/toy')
            },
           async saveToy(){
                try{
                    await this.$store.dispatch({
                    type: 'saveToy',
                    savedToy: this.toyToEdit
                    })
                    this.$router.push('/toy')
                    // socketService.emit('adminUpdate')
                }catch(err){
                    console.log(err)
                }
            }
        }
    }

</script>