<template>
    <div id="board" class="board">
        <form v-if="canLogin">
            <input id="userName" @keydown.enter.exact.prevent @keyup.enter.exact="getSenderEmail" type="text" v-model="senderEmail"/>
        </form>
        <p>{{sender}}</p>
        <div id="chatFrame" v-if="seenChatFrame" class="align-self-end">

            <!--head of chat, including friend name and buttons-->
            <div id="chatHead">
                <div id="iconName">
                    <p v-text="currentFriend.name"></p>
                </div>
                <div class="icon">
                    <div v-html="minMax" @click="minChat" class="clickButton">
                    </div>

                    <div @click="closeChat" class="clickButton">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 64 64" enable-background="new 0 0 64 64"  width="15px" height="15px">
                            <path d="M28.941,31.786L0.613,60.114c-0.787,0.787-0.787,2.062,0,2.849c0.393,0.394,0.909,0.59,1.424,0.59   c0.516,0,1.031-0.196,1.424-0.59l28.541-28.541l28.541,28.541c0.394,0.394,0.909,0.59,1.424,0.59c0.515,0,1.031-0.196,1.424-0.59   c0.787-0.787,0.787-2.062,0-2.849L35.064,31.786L63.41,3.438c0.787-0.787,0.787-2.062,0-2.849c-0.787-0.786-2.062-0.786-2.848,0   L32.003,29.15L3.441,0.59c-0.787-0.786-2.061-0.786-2.848,0c-0.787,0.787-0.787,2.062,0,2.849L28.941,31.786z" fill="white"/>
                        </svg>
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
                <svg class="tool" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 295.996 295.996" style="enable-background:new 0 0 295.996 295.996;" xml:space="preserve" width="512px" height="512px">
                    <path d="M147.998,0C66.392,0,0,66.392,0,147.998s66.392,147.998,147.998,147.998s147.998-66.392,147.998-147.998   S229.605,0,147.998,0z M147.998,279.996c-36.256,0-69.143-14.696-93.022-38.44c-9.536-9.482-17.631-20.41-23.934-32.42   C21.442,190.847,16,170.047,16,147.998C16,75.214,75.214,16,147.998,16c34.523,0,65.987,13.328,89.533,35.102   c12.208,11.288,22.289,24.844,29.558,39.996c8.27,17.239,12.907,36.538,12.907,56.9   C279.996,220.782,220.782,279.996,147.998,279.996z" fill="#666666"/>
                    <circle cx="99.666" cy="114.998" r="16" fill="#666666"/>
                    <circle cx="198.666" cy="114.998" r="16" fill="#666666"/>
                    <path d="M147.715,229.995c30.954,0,60.619-15.83,77.604-42.113l-13.439-8.684c-15.597,24.135-44.126,37.604-72.693,34.308   c-22.262-2.567-42.849-15.393-55.072-34.308l-13.438,8.684c14.79,22.889,39.716,38.409,66.676,41.519   C140.814,229.8,144.27,229.995,147.715,229.995z" fill="#666666"/>
                </svg>

                <form id="typeMsg">
                    <textarea ref="textarea" placeholder="type message..." v-model="msg"
                              @keydown.enter.exact.prevent @keyup.enter.exact="sendMessage"
                              @keydown.enter.shift.exact="newLine"></textarea>
                </form>

                <!--link-->
                <svg class="tool" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 482.8 482.8" style="enable-background:new 0 0 482.8 482.8;" xml:space="preserve" width="512px" height="512px">
                    <path d="M255.2,209.3c-5.3,5.3-5.3,13.8,0,19.1c21.9,21.9,21.9,57.5,0,79.4l-115,115c-21.9,21.9-57.5,21.9-79.4,0l-17.3-17.3    c-21.9-21.9-21.9-57.5,0-79.4l115-115c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-115,115C8.7,322.7,0,343.6,0,365.8    c0,22.2,8.6,43.1,24.4,58.8l17.3,17.3c16.2,16.2,37.5,24.3,58.8,24.3s42.6-8.1,58.8-24.3l115-115c32.4-32.4,32.4-85.2,0-117.6    C269.1,204,260.5,204,255.2,209.3z" fill="#666666"/>
                    <path d="M458.5,58.2l-17.3-17.3c-32.4-32.4-85.2-32.4-117.6,0l-115,115c-32.4,32.4-32.4,85.2,0,117.6c5.3,5.3,13.8,5.3,19.1,0    s5.3-13.8,0-19.1c-21.9-21.9-21.9-57.5,0-79.4l115-115c21.9-21.9,57.5-21.9,79.4,0l17.3,17.3c21.9,21.9,21.9,57.5,0,79.4l-115,115    c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4l115-115c15.7-15.7,24.4-36.6,24.4-58.8    C482.8,94.8,474.2,73.9,458.5,58.2z" fill="#666666"/>
                </svg>
            </div>
        </div>

        <!--friend list frame-->
        <ul id="friendList" class="friendList">
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
	/* eslint-disable no-mixed-spaces-and-tabs */

	// check empty or all is space
    function isNull(str){
        if ( str === "" || str == null || str === undefined || str === '\n' || str === '\t') return true;
        var regu = "^[ ]+$";
        var re = new RegExp(regu);
        return re.test(str);
    }

    export default {
        name: "divChat",
        data: function () {
            return {
            	canLogin: true,
                senderEmail: '',
            	sender: '',
                receiver: '',
                friends: [],
                currentFriend: {
                    src: '', name:'', Id:''
                },
                seenChatFrame: false,
                maximize: true,
                maxSvg: '<svg class="clickButton" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ' +
                    'viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;">\n' +
                    '<g>\n' +
                    '<g>\n' +
                    '<path d="M503.172,0H8.828C3.953,0,0,3.953,0,8.828v273.655v220.69C0,508.047,3.953,512,8.828,512h220.69h273.655\n' +
                    'c4.875,0,8.828-3.953,8.828-8.828V8.828C512,3.953,508.047,0,503.172,0z M220.69,494.345H17.655V291.31H220.69V494.345z\n' +
                    'M494.345,494.345h-256V282.483c0-4.875-3.953-8.828-8.828-8.828H17.655v-256h476.69V494.345z" fill="white"/>\n' +
                    '</g>\n' +
                    '</g>\n' +
                    '<g>\n' +
                    '<g>\n' +
                    '<path d="M432.552,79.448H308.966c-4.875,0-8.828,3.953-8.828,8.828c0,4.875,3.953,8.828,8.828,8.828H411.24L261.171,247.172\n' +
                    'l12.484,12.484l150.069-150.069v102.275c0,4.875,3.953,8.828,8.828,8.828c4.875,0,8.828-3.953,8.828-8.828V88.276\n' +
                    'C441.379,83.401,437.427,79.448,432.552,79.448z" fill="white"/>\n' +
                    '</g>\n' +
                    '</g>\n' +
                    '</svg>',
                minSvg: '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 480.221 480.221" enable-background="new 0 0 480.221 480.221" fill="white">\n' +
                    '<path d="M480.158,260.878v166.979c0,28.874-23.501,52.363-52.381,52.363H52.453c-28.889,0-52.39-23.489-52.39-52.363V52.938   c0-28.874,23.501-52.369,52.39-52.369h167.434c-9.011,9.244-15.004,21.45-16.316,35.003H52.447   c-9.582,0-17.378,7.791-17.378,17.366v374.92c0,9.569,7.796,17.36,17.378,17.36h375.325c9.581,0,17.372-7.791,17.372-17.36V277.169   C458.33,275.904,470.56,270.236,480.158,260.878z M399.287,230.096H284.831L470.099,44.829c10.249-10.261,10.249-26.882,0-37.131   c-10.256-10.261-26.883-10.261-37.132-0.012L247.7,192.958V78.497c0-14.499-11.757-26.262-26.259-26.262   c-7.25,0-13.816,2.932-18.569,7.689c-4.752,4.765-7.693,11.325-7.693,18.572v177.854c0,14.499,11.754,26.256,26.256,26.256h177.852   c14.505,0,26.256-11.751,26.256-26.256S413.792,230.096,399.287,230.096z" fill="white"/>' +
                    '</svg>',
                minMax: '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" width="15px" height="15px" viewBox="0 0 480.221 480.221" style="enable-background:new 0 0 480.221 480.221;" xml:space="preserve">\n' +
                    '<g>\n' +
                    '\t<path d="M480.158,260.878v166.979c0,28.874-23.501,52.363-52.381,52.363H52.453c-28.889,0-52.39-23.489-52.39-52.363V52.938   c0-28.874,23.501-52.369,52.39-52.369h167.434c-9.011,9.244-15.004,21.45-16.316,35.003H52.447   c-9.582,0-17.378,7.791-17.378,17.366v374.92c0,9.569,7.796,17.36,17.378,17.36h375.325c9.581,0,17.372-7.791,17.372-17.36V277.169   C458.33,275.904,470.56,270.236,480.158,260.878z M399.287,230.096H284.831L470.099,44.829c10.249-10.261,10.249-26.882,0-37.131   c-10.256-10.261-26.883-10.261-37.132-0.012L247.7,192.958V78.497c0-14.499-11.757-26.262-26.259-26.262   c-7.25,0-13.816,2.932-18.569,7.689c-4.752,4.765-7.693,11.325-7.693,18.572v177.854c0,14.499,11.754,26.256,26.256,26.256h177.852   c14.505,0,26.256-11.751,26.256-26.256S413.792,230.096,399.287,230.096z" fill="white"/>\n' +
                    '</g>\n' +
                    '</svg>',
                firendName:'',
                userHead: '',
                displayHead: false,
                send: 'send',
                receive: 'receive',
                msgs: [],
                nextMsgId: 1,
                msg: '',
            }
        },

        watch: {
            nextMsgId: function(){
                this.$nextTick(function(){
                    var elDisplay = this.$refs.chatDisplay;
                    elDisplay.scrollTop = elDisplay.scrollHeight;
                    console.log(elDisplay.scrollTop, elDisplay.scrollHeight);
                })
            },
        },

        mounted: function () {
			this.$socket.on('receive a message', (data) => {
				//data saved in the MongoDb, should be retrieved to display
				if (data.sender === this.receiver){    // NO need to use red dot to remind me, we can see chat screen displayed
					this.msgs.push({id: this.nextMsgId++, type: 'receive', info: data.msg});
				}
				else{
					console.log('click the user iamge to display'); // Use red dot to remind me
				}
			});
			this.$socket.on('colorHead', (friendsOnline) => {
				// console.log(friendsOnline);
				var friendList = this.friends;
				if (friendsOnline.length != undefined || friendsOnline != null){
                    for(var i=0;i<friendsOnline.length;i++){
                        var idx = this.friends.map(function(x) {return x.Id; }).indexOf(friendsOnline[i]);
                        friendList[idx].online = true;
                        console.log(this.friends[idx].online)
                    }
				}
			});
			this.$socket.on('grayHead', (friend) => {
				console.log(this.friends);
				var idx = this.friends.map(function(x) {return x.Id; }).indexOf(friend);
				this.friends[idx].online = false;
				console.log(this.friends[idx].online)
			})

        },

        methods: {
        	getSenderEmail:  function () {
				const that = this;
        		var friendList = this.friends;
				var senderID = '123';
                this.canLogin = false;
                this.$axios.get('/chat/' + this.senderEmail)
                    .then(function (response) {
                        if (response.data){
                        	// get friend list
							// console.log(typeof(response.data));
							// console.log(response.data[0].user_id);
							for (var i=0;i<response.data.length;i++){
								var friend = response.data[i].friend_id;
								friendList.push({
                                    src: friend.avatar,
                                    name: friend.username,
                                    online: false,
                                    Id: friend._id
								});
							}
                            that.sender = response.data[0].user_id;
							that.$socket.emit('friendOn', {sender: that.sender})
						}
                    })
                    .catch(function (error) {
                    	console.log(error);
                    });
			},
            minChat: function () {
                this.maximize = !(this.maximize);
                console.log(this.maximize);
                if (this.maximize === true) {
                    this.minMax = this.minSvg;
					this.receiver = this.currentFriend.Id;
					console.log('maximize');
                    return 1;
                }
                else if (this.maximize === false) {
                    this.minMax = this.maxSvg;
					this.receiver = '' // user cannot see the chat message displayed
                    console.log('minimize');
                    return 1;
                }
                else {
                    console.log('error');
                    return -1;
                }
            },
            closeChat: function () {
                this.seenChatFrame = false;

                this.receiver = '';
				this.currentFriend.name = '';
				this.currentFriend.src = '';
				this.currentFriend.Id = '';
                console.log(this.seenChatFrame);
            },
            display: function (event) {
                this.msgs = [];
                // currentFriend.src =
                this.seenChatFrame = true;
                console.log(this.seenChatFrame);
                // this.currentFriend.Id = event.event.currentTarget.querySelector('div').;
                this.currentFriend.name = event.currentTarget.querySelector('div').innerText;
                this.currentFriend.src = event.currentTarget.querySelector('img').getAttribute('src');
                this.currentFriend.Id = event.currentTarget.querySelector('img').getAttribute('alt');
                this.receiver = this.currentFriend.Id;
                this.userHead = this.currentFriend.src;

                // add message from database
                // this.msgs.push({id: this.nextMsgId++, type: 'send', info: 'hello hello hellohellohellohellohellohellohellohellohello hello hello'});
                this.msgs.push({id: this.nextMsgId++, type: 'receive', info: 'I am your father'});
                this.msgs.push({id: this.nextMsgId++, type: 'send', info: 'what\' s your last name?'});
                this.msgs.push({id: this.nextMsgId++, type: 'receive', info: 'Of course the same as yours'});
                this.msgs.push({id: this.nextMsgId++, type: 'send', info: 'So you are my son'});
                this.msgs.push({id: this.nextMsgId++, type: 'send', info: 'dog gulugulu'});


                console.log('receiver: '+this.receiver);

                //change chatDisplay!!

            },
			newLine: function () {
				this.msg = this.msg + '\n';
			},
            sendMessage: function () {
                // event.returnValue = false; // n case '\n'
                console.log(isNull(this.msg), this.msg);
                if (isNull(this.msg)) {
                    //    alert
                    return -1;
                }
                else {
                    // SOCKET: send message
                    this.$socket.emit('send a message',{sender: this.sender, receiver: this.receiver, msg: this.msg});

                    // update chat frame
                    this.msgs.push({id: this.nextMsgId++, type: 'send', info: this.msg});
                    this.msg = '';
                }
            },
        }
    }
</script>


<style scoped>

    body {
        background-color: #eeeeee;
        font-family: 'Chakra Petch', sans-serif;
    }

    div.board {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        flex-wrap: nowrap;
        height: 100vh;
    }
    .friendList {
        background-color: white;
        width: 230px;
        list-style: none;
        border-left-color: lightgray;
        border-left-width: 1px;
        border-left-style: solid;
        border-top-left-radius: 8px;
        overflow-y: auto;
        padding: 0;
        margin: 0 8px 0;
    }
    ul.list-group{
        border-left-color: lightgray;
        border-left-style: solid;
        border-left-width: 1px;
        overflow-y: auto;
        padding: 0;
        margin: 0 8px 0;
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
        background-color: lightgray;
    }
    .head:hover{
        /*border-color: white;*/
        /*border-style: solid;*/
        /*border-width: thin;*/
        box-shadow: 0px 0px 13px #007bff;
        /*2e87e6  528dcc */

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
        width: 180px;
        flex-grow: 0;
        text-align: start;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 2px 4px;
    }

    #chatFrame{
        width: 360px;
        height: auto;
        border-radius: 8px;
        box-shadow: 0px 0px 4px #888888;
        border-style: none;
        background-color: white;
        margin:auto 8px 8px auto;
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
        width: 200px;
        margin: 8px auto;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
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
    .clickButton{
        margin-bottom: 4px;
        margin-top: 2px;
        margin-right: 10px;
        width: 20px;
        height: 20px;
    }
    .clickButton:hover{
        margin-bottom: 8px;
        cursor: pointer;
        width: 20px;
        height: 20px;
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
        /*border-bottom-width: 2px;*/
        /*border-bottom-style: solid;*/
        /*border-top-width: 2px;*/
        /*border-top-style: solid;*/
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

</style>
