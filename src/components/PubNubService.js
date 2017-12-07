export default class PubNubService {
    constructor(options) {
        this.users = {};
        this.listeners = [];
        this.mls = [];
        //connect to pubnub
        this.pubnub = options.pubnub;
        this.channel = options.channel;
        this.pubnub.subscribe({
            channels:[this.channel],
            withPresence:true
        });
        this.pubnub.addListener({
            //status: (status) =>  console.log("got status",status),
            message: (message) => {
                console.log("got a message",message);
                this.mls.forEach((ml)=>ml(message));
            },
            presence: (pres) => {
                console.log("presence event",pres);
                if(pres.action === 'join')         return this.userJoined(pres);
                if(pres.action === 'timeout')      return this.userLeft(pres);
                if(pres.action === 'state-change') return this.stateChanged(pres);
            }
        });

        options.pubnub.hereNow({
            channels:[options.channel],
            includeUUIDs:true,
            includeState:true
        },(status,resp) => {
            //console.log("got status",status,resp);
            var room = resp.channels[options.channel];
            //console.log("room = ", room);
            room.occupants.forEach((user) => this.checkinUser(user));
            this.fireUpdate();
        });

    }

    getSelfInfo(cb) {
        this.pubnub.getState({
            uuid:this.pubnub.getUUID(),
            channels:[this.channel]
        },(status, response)=>{
            console.log("got back the state",status, response.channels[this.channel]);
            //this.checkinUser()
            var uuid = this.pubnub.getUUID();
            if(!this.users[uuid]) this.users[uuid] = { uuid:uuid };
            var user = this.users[uuid];
            var state = response.channels[this.channel];
            console.log('state is',state, 'user is',user);
            Object.keys(state).forEach((key) => {
                console.log("copying",key);
                user[key] = state[key];
            });
            this.fireUpdate();
            cb(state);
        })
    }

    checkinUser(evt) {
        //create if needed
        if(!this.users[evt.uuid]) this.users[evt.uuid] = { uuid:evt.uuid };
        var user = this.users[evt.uuid];
        if(evt.state) {
            Object.keys(evt.state).forEach((key)=>{
                user[key] = evt.state[key];
            });
        }
        return user;
    }

    getUserInfo(uuid) {
        if(this.users[uuid])  return this.users[uuid];
        return {}
    }

    onUserChange(l) {
        this.listeners.push(l);
    }
    onMessage(ml) {
        this.mls.push(ml);
    }

    fireUpdate() {
        var users = this.getUsers();
        this.listeners.forEach((l)=> l(users));
    }
    userJoined(pres) {
        //console.log("got joined");
        this.checkinUser(pres);
        this.fireUpdate();
    }

    userLeft(pres) {
        //console.log("timed out");
        delete this.users[pres.uuid];
        this.fireUpdate();
    }

    stateChanged(evt) {
        //console.log("state changed");
        this.checkinUser(evt)
        this.fireUpdate();
    }

    getUsers() {
        return Object.keys(this.users).map((key)=>this.users[key]);
    }

    setUserState(state) {
        this.pubnub.setState({
            state:state,
            channels:[this.channel]
        });
    }


    fetchHistory(count, cb) {
        console.log("fetching the history",count);
        this.pubnub.history({
            channel:this.channel,
            count:count
        }, (status,response)=>{
            console.log("got history back",status,response);
            var msgs = response.messages.map((msg)=>msg.entry);
            cb(msgs);
        })
    }
}