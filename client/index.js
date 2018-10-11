var app = new Vue({
    el: '#app',
    data: {
        isLogin: false,
        loginEmail:'',
        loginPassword: '',
        notif: false,
        createName: '',
        createLocation: '',
        createAddress: '',
        allEvent: [],
        textsearch: ''
    },
    methods: {
      login(){
        axios({
          method :'POST',
          url: 'http://localhost:3000/users/login',
          data: {
            email: this.loginEmail,
            password: this.loginPassword
          }
        })
        .then((result) => {
          localStorage.setItem('token', result.data.token)
          app.isLogin = true  
          app.notif = false  
        }).catch((err) => {
          app.notif = true
        });
      },
      logout(){
        localStorage.clear()
        app.isLogin = false
      },
      addEvent(){
        let token = localStorage.getItem('token')
        axios({
          method: 'POST',
          url: 'http://localhost:3000/events',
          headers: {
            access_token: token
          },
          data: {
            name: createName,
            location: createLocation,
            address: createAddress
          }
        })
        .then((result) => {
          console.log('event added');
        }).catch((err) => {
          console.log(err);
        });
      },
      showEvent(){
        axios({
          method: 'GET',
          url: 'http://localhost:3000/events',
        })
        .then((result) => {
          app.allEvent = result.data.datas
        }).catch((err) => {
          console.log(err);
        });
      },
      search(){
        let token = localStorage.getItem('token')
        axios({
          method: 'GET',
          url: `http://localhost:3000/events/search/keyword?keyword=${app.textsearch}`,
          headers: {
            access_token: token
          }
        })
        .then((result) => {     
          console.log(result.data.result);
              
          app.allEvent = result.data.result
        }).catch((err) => {
          console.log(err);
        });
      }

    },
    created: function(){
      this.showEvent(),
      this.textsearch = ''
    }

})