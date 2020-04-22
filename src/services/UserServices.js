
let _singleton = Symbol();
let LOCAL_URL = 'https://dbms-cs5200-final-server.herokuapp.com';


//Run server first


if(process.env.REACT_APP_DEVELOPMENT_ENV === 'DEVELOPMENT') {
    LOCAL_URL = 'http://localhost:2000'
}
else if(process.env.REACT_APP_DEVELOPMENT_ENV === 'HEROKU') {
    LOCAL_URL = 'https://dbms-cs5200-final-server.herokuapp.com';
}




class UserServices {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new UserServices(_singleton);
        return this[_singleton]
    }

    loginUser(user) {

        return fetch(LOCAL_URL + '/api/login/',{
            method:'post',
            body: JSON.stringify(user),
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        }).then((res) => res.json());
    }

    getAllUsers(){
        return fetch(LOCAL_URL + '/api/user').then((res) =>  res.json());
    }

    getUserById(userId){
        return fetch(LOCAL_URL + '/api/user/UID'.replace('UID', userId),{

        }).then((res) =>  res.json());
    }
    getProfile() {
        return fetch(LOCAL_URL + '/api/profile',{
           credentials: 'include'
        }).then((res) =>  res.json());
    }

    logoutUser(){
        localStorage.removeItem("logged");
        return fetch(LOCAL_URL + '/api/logout',{
            method: 'post',
            credentials: 'include'
        })
    }
    updateUser(user){
        return fetch(LOCAL_URL + '/api/update/profile',{
            method: 'put',
            body:JSON.stringify(user),
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        }).then((res) => res.json())
    }




    updateUserById(user){
        return fetch(LOCAL_URL + '/api/update/user',{
            method: 'put',
            body:JSON.stringify(user),
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        }).then((res) => res.json())
    }

    deleteUserById(userId) {
        let id = {
            id: userId
        };
        return fetch(LOCAL_URL + '/api/delete/user',{
            method: 'delete',
            body:JSON.stringify(id),
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        }).then((res) => res.json())
    }

    getFollowers() {
        return fetch(LOCAL_URL + '/api/followers',{
            credentials: 'include'
        }).then((res) => res.json())
    }


    getFollowing() {
        return fetch(LOCAL_URL + '/api/following',{
            credentials: 'include'
        }).then((res) => res.json())
    }


    setFollowing(followId, userName) {

        let id = {
            id: followId,
            user: userName
        };

        return fetch(LOCAL_URL + '/api/following',{
            method: 'put',
            body:JSON.stringify(id),
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        }).then((res) => res.json())
    }

    registerUser(user) {

        return fetch(LOCAL_URL + '/api/user/',{
            method:'post',
            body: JSON.stringify(user),
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        }).then((res) => res.json());
    }

}


export default UserServices;