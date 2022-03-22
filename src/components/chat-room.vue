<template>
    <section class="chat-container">
        <h2>Chit Chat</h2>
            <ul>
                <li v-for="(msg, idx) in msgs" :key="idx">
                    <span>{{msg.from}}:</span>{{msg.txt}}
                </li>
            </ul>
            <form @submit.prevent="sendMsg">
                <input type="text" @keydown="userTyping" v-model="msg.txt" placeholder="Your msg"/>
                <button>Send</button>
            </form>
            <div v-if="isTyping.typing">
                <p>{{isTyping.user}} is typing...</p>
            </div>
            {{toy}}
    </section>
</template>

<script>
import {socketService} from '../services/socket.service';
import { toyService } from "../services/toy-service";


export default{
    props:{
        toy: Object
    },
    name:'chat-room',
    data() {
        return {
        msg: { txt: '',from:null},
        msgs: null,
        topic : this.getToyId,
        isTyping: {
            user: null,
            typing: false,
            
        },
        }
     },
    async created(){ 
        this.editToy  = this.toy
        this.msgs = this.editToy.msgs
        socketService.emit('chat topic', this.getToyId);
        socketService.on('chat addMsg', this.addMsg);
        socketService.on('chat userTyping', this.chatUserTyping);
        this.msg.from = this.getUsername
    },
    unmounted() {
        socketService.off('chat addMsg', this.addMsg)
        socketService.off('chat userTyping', this.chatUserTyping);


    },
    computed:{
        getToyId(){
             return this.$route.params.id
         },
         getUsername(){
            const user = this.$store.getters.loggedinUser;
            return user ? user.username : 'Guest'
         }
    },
     methods: {
        async addMsg(msg) {
        //  this.msgs.push(msg)
        if(!this.editToy.msgs) this.editToy.msgs = []
         this.editToy.msgs.push(msg)
         console.log(this.editToy)
         await toyService.save(this.editToy)
        //  console.log(this.msgs)
        },
        sendMsg() {
            console.log('Sending', this.msg);
            socketService.emit('chat newMsg', this.msg)
            // TODO: next line not needed after connecting to backend
            // this.addMsg(this.msg)
            // setTimeout(()=>this.addMsg({from: 'Dummy', txt: 'Yey'}), 2000)
            this.msg.txt = '';
        },
        userTyping(){
            // console.log('istyping')
            socketService.emit('userTyping',this.getUsername)
        },
        chatUserTyping(user){
            console.log('typing user',user);
            this.isTyping.user = user;
            this.isTyping.typing = true;
            setTimeout(() => {
            this.isTyping.typing = false;
            },2000)
        },
       
  }
}
</script>