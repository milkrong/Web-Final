<template>
    <div id="board" class="board mt-5" v-if="senderEmail">
        <div id="chatFrame" v-if="seenChatFrame">

            <!--head of chat, including friend name and buttons-->
            <div id="chatHead">
                <div id="iconName">
                    <p>{{currentFriend.name}}</p>
                </div>
                <div class="icon">
                    <div @click="closeChat" class="text-white mx-2">
                        <i class="fas fa-times"></i>
                    </div>
                </div>
            </div>

            <!--display the chat messages-->
            <ul ref="chatDisplay" id="chatDisplay" v-show="maximize">
                <li ref="msg" v-for="msg in msgs" :key="msg.id" v-bind:class="[msg.type]">
                    <img v-if="msg.type === 'receive'" class="rounded-circle" :src="currentFriend.src" :alt="currentFriend.Id"/>
                    <pre>{{msg.info}}</pre>
                </li>
            </ul>

            <!--type message and send files and emoji-->
            <div id="chatTool" v-show="maximize">
                <!--emoji-->
                <i class="far fa-smile-beam"></i>

                <form id="typeMsg">
                    <textarea ref="textarea" placeholder="type message..." v-model="msg"
                              @keydown.enter.exact.prevent @keyup.enter.exact="sendMessage"
                              @keydown.enter.shift.exact="newLine"></textarea>
                </form>

                <!--link-->
                <i class="fas fa-link"></i>
            </div>
        </div>

        <!--friend list frame-->
        <ul id="friendList" class="friendList">
            <li>
                <p id="myUserName">{{senderUserName}}</p>
            </li>
            <li class="friend" v-on:click="display" v-for="friend in friends" :key="friend.index">
                <!--head image-->
                <img v-if="friend.online" class="head img-thumbnail" :src="friend.src" :alt="friend.Id">
                <img v-else class="head img-thumbnail grayHead" :src="friend.src" :alt="friend.Id">
                <div>{{friend.name}}</div>
            </li>
        </ul>
    </div>
</template>

<script>
function isNull (str) {
  if (str === '' || str == null || str === undefined || str === '\n' || str === '\t') return true
  var regu = '^[ ]+$'
  var re = new RegExp(regu)
  return re.test(str)
}

export default {
  name: 'divChat',
  props: ['userData'],
  data: function () {
    return {
      senderUserName: '',
      senderEmail: this.userData.email,
      sender: '',
      receiver: '',
      friends: [],
      currentFriend: {
        src: '', name: '', Id: ''
      },
      seenChatFrame: false,
      maximize: true,
      firendName: '',
      userHead: '',
      displayHead: false,
      send: 'send',
      receive: 'receive',
      msgs: [],
      nextMsgId: 1,
      msg: ''
    }
  },

  watch: {
    nextMsgId: function () {
      this.$nextTick(function () {
        var elDisplay = this.$refs.chatDisplay
        elDisplay.scrollTop = elDisplay.scrollHeight
        console.log(elDisplay.scrollTop, elDisplay.scrollHeight)
      })
    }
  },
  created () {
    this.getSenderEmail()
  },
  mounted () {
    this.$socket.on('reconnect', (attemptNumber) => {
      console.log('rereredodododo')
      this.$socket.emit('friendOn', { sender: this.sender })
    })
    this.$socket.on('get history', (data) => {
      console.log('get history')
      for (let i = 0; i < data.length; i++) {
        this.msgs.push({ id: this.nextMsgId++, type: data[i].sendOrRecv, info: data[i].message })
      }
    })
    this.$socket.on('receive a message', (data) => {
      // data saved in the MongoDb, should be retrieved to display
      if (data.sender === this.receiver) {
        this.msgs.push({ id: this.nextMsgId++, type: 'receive', info: data.msg })
      } else {
        console.log('click the user iamge to display') // Use red dot to remind me
      }
    })
  },

  methods: {
    getSenderEmail: function () {
      const that = this
      var friendList = this.friends
      this.canLogin = false
      this.$axios.get('/api/chat/chat/' + this.userData.email)
        .then(function (response) {
          if (response.data) {
            for (var i = 0; i < response.data.length; i++) {
              var friend = response.data[i].friend_id
              friendList.push({
                src: friend.avatar,
                name: friend.username,
                online: false,
                Id: friend._id
              })
            }
            // that.senderUserName = response.data['me'].username
            that.sender = response.data[0].user_id
            that.$socket.emit('friendOn', { sender: that.sender })
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    closeChat: function () {
      this.seenChatFrame = false

      this.receiver = ''
      this.currentFriend.name = ''
      this.currentFriend.src = ''
      this.currentFriend.Id = ''
      console.log(this.seenChatFrame)
    },
    display: function (event) {
      this.msgs = []
      // currentFriend.src =
      this.seenChatFrame = true
      console.log(this.seenChatFrame)
      // this.currentFriend.Id = event.event.currentTarget.querySelector('div').;
      this.currentFriend.name = event.currentTarget.querySelector('div').innerText
      this.currentFriend.src = event.currentTarget.querySelector('img').getAttribute('src')
      this.currentFriend.Id = event.currentTarget.querySelector('img').getAttribute('alt')
      this.receiver = this.currentFriend.Id
      this.userHead = this.currentFriend.src

      // add message from database
      // load chat history
      this.$socket.emit('load history',
        {
          sender: this.sender,
          receiver: this.receiver
        })
      console.log('receiver: ' + this.receiver)
    },
    newLine: function () {
      this.msg = this.msg + '\n'
    },
    sendMessage: function () {
      // event.returnValue = false; // n case '\n'
      console.log(isNull(this.msg), this.msg)
      if (isNull(this.msg)) {
        return -1
      } else {
        // SOCKET: send message
        this.$socket.emit('send a message', { sender: this.sender, receiver: this.receiver, msg: this.msg })

        // update chat frame
        this.msgs.push({ id: this.nextMsgId++, type: 'send', info: this.msg })
        this.msg = ''
      }
    }
  }
}
</script>


<style scoped>
    .board {
        min-height: calc(100vh - 150px);
        background: white;
    }

    .friendList {
        background-color: white;
        width: 100%;
        list-style: none;
        overflow-y: auto;
        padding: 0;
    }
    ul.list-group{
        overflow-y: auto;
        padding: 0;
    }
    .friend{
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 2px;
        padding: 2px;
    }
    .friend:hover{
        cursor: pointer;
        background-color: #EAF5FC;
    }

    .friend > .head{
        width: 35px;
        height: 35px;
        padding: 2px;
        flex-grow: 0;
        border-style: none;
        border-radius: 6px;
    }

    .friend > svg.unread{
        margin-top: -28px;
        margin-left: -5px;
        width: 6px;
        height: 6px;
    }
    .friend > div{
        flex-grow: 0;
        text-align: start;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 2px 4px;
    }

    #chatFrame{
        position: absolute;
        z-index: 99;
        left: -200px;

        width: 200px;
        height: auto;
        border-radius: 8px;
        box-shadow: 0px 0px 4px #888888;
        border-style: none;
        background-color: white;
    }
    #chatHead{
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: nowrap;
        background-color: #548cc9;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    }
    #iconName{
        margin-left: 8px;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    }
    #iconName > p{
        font-weight: 500;
        margin: 8px auto;
        color: white;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .icon{
        display: flex;
        height: 35px;
        flex-direction: row;
        align-items: center;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    }
    #chatDisplay{
        width: 100%;
        height: 340px;
        border-style: none;
        list-style: none;
        overflow: scroll;
        margin: 0;
        padding: 0;
        background-color: #bccdeb;
    }
    #chatDisplay::-webkit-scrollbar { width: 0 !important }
    #chatDisplay > li{
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        flex-wrap: nowrap;
        clear: both;
        margin: 8px;
        padding: 0;
        height: auto;
    }
    li > pre{
        font-family: "Apple Braille";
        max-width: 55%;
        border-radius: 15px;
        white-space: pre-wrap;
        word-break: break-word;
        padding: 6px;
        height: auto;
        margin:0;
        font-size: 14px;
    }
    li.send{
        justify-content: flex-end;
    }
    li.send > pre{
        background-color: #7bb9ff;
    }
    li.receive{
        justify-content: flex-start;
    }
    li.receive > pre{
        background-color: #e8eaf0;
    }
    li.receive > img{
        margin-right: 2px;
        width: 20px;
        height: 20px;
        padding: 0;
    }
    li.receive > img:hover{
        cursor: pointer;
        box-shadow: 0px 0px 13px #007bff;
    }
    #chatTool{
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        height: auto;
        border-color: lightgray;
        padding: 0 3px;
    }
    svg.tool{
        flex-grow: 0;
        padding: 0;
        fill: #666666;
        width: 25px;
        height: 25px;
        margin: 0 6px;
    }
    svg:hover{
        cursor: pointer;
        fill: darkgray;
    }
    #typeMsg{
        flex-grow: 1;
        text-align: center;
        height: 34px;
    }
    #typeMsg > textarea{
        width: 100%;
        height: 100%;
        padding: 4px 8px;
        border-style: none;
        outline: none;
        font-size: 17px;
        resize: none;
        margin: auto;
    }
    .grayHead{
        -webkit-filter: grayscale(100%);
        filter: grayscale(100%);
    }

    #myUserName{
        text-align: center;
        background-color: #548cc9;
        padding: 0;
        margin: 1px 0;
        font-size: 20px;
    }

</style>
