import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import axios from 'axios'
import router from './router'
/* eslint-disable */

let provider = new firebase.auth.FacebookAuthProvider()
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: '',
    loggedStatus: '',
    incompleteArr: '',
    completeArr: '',
    userInfo: '',
    search: '',
    searchArr: ''
  },
  mutations: {
    userInfo(state, payload){
      state.userInfo = payload;
    },
    loggedStatus(state,payload){
      state.loggedStatus = payload
    },
    IncompleteArr(state, payload){
      state.incompleteArr = payload;
    },
    completeArr(state, payload){
      state.completeArr = payload;
    },
    search(state, payload){
      state.search = payload;
    },
    searchArr(state, payload){
      state.searchArr = payload
    },
    pageStatus(state, payload){
      state.pageStatus = payload
    }
  },
  actions: {
    signIn({commit}, userData){
      
      axios.post('https://todofancy-server.rin-ng.me/users/login', userData)
      .then(function({data}){
        swal({
          title: "You have successfully logged in!",
          text: `Welcome Back, ${data.user.name}!`, 
          icon: "success"
        });

        localStorage.setItem("token", data.token);
        router.push('/task')
      })
      .catch(function(err){
        swal({
          title: "Oops! Something went wrong",
          text: "Please try again",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
      })
    },
    register({commit}, userData){
      axios.post('https://todofancy-server.rin-ng.me/users/register', userData)
      .then(function({data}){
        console.log(data)
        swal({
          title: "You have successfully registered!", 
          icon: "success"
        });
        router.push('/');
        
      })
      .catch(function(err){
        swal({
          title: "Oops! Something went wrong",
          text: "Please try again",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
      })
    },
    facebookSignIn ({commit}) {
      provider.addScope('email')
      firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        let token = result.credential.accessToken
  
        // The signed-in user info.
        let user = result.user
        console.log('token: ', token)
        console.log('User', user.uid)
        let newInfo = {
          id: user.uid,
          name: user.displayName,
          email: user.email
        }
        axios.post('https://todofancy-server.rin-ng.me/users/fbLogin', newInfo, {
          headers: {
            fbToken: token
          }
        })
        .then(function({data}) {
          swal({
            title: "You have successfully logged in!",
            text: `Welcome Back, ${data.user.name}!`, 
            icon: "success"
          });
          localStorage.setItem("token", data.token);
          router.push('/task');
        })
        .catch(function(err){
          console.log(err)
          swal({
            title: "Oops! Something went wrong",
            text: "Please try again",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
        })

      }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        // The email of the user's account used.
        var email = error.email

        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential

        console.log('error: ', errorCode, ' ', errorMessage, ' ', email, ' ', credential)
      })
    },
    facebookSignOut ({commit}) {
      firebase.auth().signOut().then(function () {
        console.log('facebook logged out')
        commit('loggedStatus', false);
        localStorage.clear();
        router.push('/');
      }).catch(function (error) {
        console.log(error)
      })
    },
    getUserData({commit}){
      let token = localStorage.getItem('token');

      axios.get('https://todofancy-server.rin-ng.me/users/info', {
        headers:{
          token: token
        }
      })
      .then(function({data}){
        console.log(data)
        let user = data.user;
        let status;
        switch(user.level) {
          case 1:
             status = "Noob"
             break;
          case 3:
             status = "Casual"
             break;
          case 5:
             status = "Hardcore"
             break;
          case 7:
             status = "Pro"
             break;
          case 9:
             status = "Try Hard"
             break;
          case 10:
             status = "Forever Alone God"
             break;
          default:
             status = "noob"
             break;
       }

        let userInfo = {
          name: user.name,
          id: user._id,
          level: user.level,
          status: status,
          progress: user.progress,
          email: user.email,
          image: user.profileImg
        }
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        commit('userInfo', userInfo);
      })
      .catch(function(error){
        console.log(error)
      })
    },
    addTask({commit, dispatch}, taskInfo){
      console.log(taskInfo.description);
      let token = localStorage.getItem('token');
      let self = this;
      axios.post('https://todofancy-server.rin-ng.me/todo/create',{
        name: taskInfo.name,
        description: taskInfo.description,
        tags: taskInfo.tags
      }, {
        headers:{
          token: token
        }
      } )
      .then(function({data}){
        console.log("addTask response", data)
        swal({
          title: "Task has been successfully created", 
          icon: "success"
        });
        self.dispatch('getIncomplete');
        self.dispatch('getComplete')
      })
      .catch(function(err){
        console.log(err);
      })
    },
    getIncomplete({commit}){
      let token = localStorage.getItem('token');
      axios.get('https://todofancy-server.rin-ng.me/todo/getIncomplete', {
        headers:{
          token : token
        }
      })
      .then(function({data}){
        console.log("incomplete data: ",data.list);
        commit('IncompleteArr', data.list)
      })
      .catch(function(err){
        console.log(err);
      })
    },
    getComplete({commit}){
      let token = localStorage.getItem('token');
      axios.get('https://todofancy-server.rin-ng.me/todo/getComplete', {
        headers:{
          token : token
        }
      })
      .then(function({data}){
        console.log("complete data: ",data.list);
        commit('completeArr', data.list)
        
      })
      .catch(function(err){
        console.log(err);
      })
    },
    deleteTask({commit, dispatch}, id){
      let self = this;
      console.log(id);
      swal({
        title: "Are you sure?",
        text: "Deleted task cannot be recovered!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willConfirm) => {
        if (willConfirm) {
          swal("You have successfuly deleted task", {
            icon: "success",
          });
          
          axios.delete('https://todofancy-server.rin-ng.me/todo/delete', {
            headers:{
              taskid: id,
              token: localStorage.getItem('token')
            }
          })
          .then(function({data}){
            console.log(data);
            self.dispatch('getIncomplete');
            self.dispatch('getComplete')
          })
          .catch(function(err){
            console.log(err)
          })
        } else {
          swal("Your task is saved :)");
        }
      });
      
    },
    markComplete({commit, dispatch}, id){
      console.log("!!", id);
      let token = localStorage.getItem('token');
      console.log('token d mark: ', token);
      let self = this;

      swal({
        title: "Are you sure?",
        text: "Tasks that have been complete cannot be reverted!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willConfirm) => {
        if (willConfirm) {
          swal("You have successfuly marked task as complete!", {
            icon: "success",
          });
          
          axios.put('https://todofancy-server.rin-ng.me/todo/complete', {},{
            headers:{
              taskid: id,
              token : token,
            }
          })
          .then(function({data}){
            console.log("dah balik, ini datanya: ", data);
            console.log(data);
            self.dispatch('getIncomplete');
            self.dispatch('getComplete');
            self.dispatch('getUserData')
          })
          .catch(function(err){
            console.log(err);
          })
        } else {
          swal("Your task is still incomplete.");
        }
      });      
    },
    searchByTag({commit}, tag){
      axios.get('https://todofancy-server.rin-ng.me/todo/searchTags', {
        headers:{
          token: localStorage.getItem('token'),
          query: tag
        }
      })
      .then(function({data}){
        console.log("hasil search tag: ",data.tasks);
        commit('search', true);
        commit('searchArr', data.tasks);
      })
      .catch(function(err){
        console.log(err)
      })
      
    },
    resetSearch({commit}){
      commit('search', false)
    },
    searchKeyword({commit}, query){
      console.log("search query: " , query);
      axios.post('https://todofancy-server.rin-ng.me/todo/searchTasks', {
          query: query
      },
      {
        headers:{
          token: localStorage.getItem('token')
        }
      })
      .then(function({data}){
        console.log("ini hasil search query: ", data.tasks)
        commit('search', true);
        commit('searchArr', data.tasks)
      })
      .catch(function(err){
        console.log(err)
      })
    }
  }
})
