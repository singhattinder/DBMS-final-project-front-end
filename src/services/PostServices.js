import axios from 'axios';

let _singleton = Symbol();
let LOCAL_URL = 'https://dbms-cs5200-final-server.herokuapp.com';


//Run server first


if(process.env.REACT_APP_DEVELOPMENT_ENV === 'DEVELOPMENT') {
    LOCAL_URL = 'http://localhost:2000'
}
else if(process.env.REACT_APP_DEVELOPMENT_ENV === 'HEROKU') {
    LOCAL_URL = 'https://dbms-cs5200-final-server.herokuapp.com';
}




class PostServices {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new PostServices(_singleton);
        return this[_singleton]
    }

    // loginUser(user) {
    //
    //     return fetch(LOCAL_URL + '/api/login/',{
    //         method:'post',
    //         body: JSON.stringify(user),
    //         credentials: 'include',
    //         headers: {
    //             'content-type': 'application/json'
    //         }
    //     }).then((res) => res.json());
    // }

    createPost(post) {

        return fetch(LOCAL_URL + '/api/post',{
            method:'post',
            body: JSON.stringify(post),
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        }).then((res) => res.json());
    }

    getAllPosts() {
        return fetch(LOCAL_URL + '/api/post', {
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        }).then((res) =>
            res.json());
    }

    getAllPostsByUser(){
        return fetch(LOCAL_URL + '/api/post/user',{
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        }).then((res) =>
             res.json());
    }

    getAllPostsByUserId(userId){
        return fetch(LOCAL_URL + '/api/post/user/UID'.replace('UID', userId),{
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        }).then((res) =>
            res.json());
    }

    deletePostById (id) {
        const postID = {
            id: id
        }
                return fetch(LOCAL_URL + '/api/post',{
                    method: 'delete',
                    body:JSON.stringify(postID),
                    credentials: 'include',
                    headers: {
                        'content-type': 'application/json'
                    }
                }).then((res) => res.json())

    }

    getPostById(postId){
        return  fetch(LOCAL_URL + '/api/post/id/PID'.replace('PID', postId),{
        }).then((res) =>  res.json());

    }

    updatePost(post){
        return fetch(LOCAL_URL + '/api/update/post',{
            method: 'put',
            body:JSON.stringify(post),
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        }).then((res) => res.json())
    }


    addComment(comment) {
        return fetch(LOCAL_URL + '/api/update/post/comment',{
            method: 'put',
            body:JSON.stringify(comment),
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        }).then((res) => res.json())
    }

    deleteComment(id, commentId) {

        const postID = {
            id: id,
            commentId: commentId
        }
        return fetch(LOCAL_URL + '/api/post/comment',{
            method: 'delete',
            body:JSON.stringify(postID),
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        }).then((res) => res.json())

    }

    createTag(tag) {
        return fetch(LOCAL_URL + '/api/tag',{
            method:'post',
            body: JSON.stringify(tag),
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        }).then((res) => res.json());
    }

    getAllTagsByPostId(postId){
        return  fetch(LOCAL_URL + '/api/tag/post/PID'.replace('PID', postId),{
        }).then((res) =>  res.json());
    }





    //
    // getUserById(userId){
    //     return fetch(LOCAL_URL + '/api/user/UID'.replace('UID', userId),{
    //
    //     }).then((res) =>  res.json());
    // }
    // getProfile() {
    //     return fetch(LOCAL_URL + '/api/profile',{
    //         credentials: 'include'
    //     }).then((res) =>  res.json());
    // }
    //
    // createPost(post){
    //
    //     return fetch(LOCAL_URL + '/api/logout',{
    //         method: 'post',
    //         credentials: 'include'
    //     })
    // }
    // updateUser(user){
    //     return fetch(LOCAL_URL + '/api/update/profile',{
    //         method: 'put',
    //         body:JSON.stringify(user),
    //         credentials: 'include',
    //         headers: {
    //             'content-type': 'application/json'
    //         }
    //     }).then((res) => res.json())
    // }
    //
    //
    //
    //
    // updateUserById(user){
    //     return fetch(LOCAL_URL + '/api/update/user',{
    //         method: 'put',
    //         body:JSON.stringify(user),
    //         credentials: 'include',
    //         headers: {
    //             'content-type': 'application/json'
    //         }
    //     }).then((res) => res.json())
    // }
    //
    // deleteUserById(userId) {
    //     let id = {
    //         id: userId
    //     };
    //     return fetch(LOCAL_URL + '/api/delete/user',{
    //         method: 'delete',
    //         body:JSON.stringify(id),
    //         credentials: 'include',
    //         headers: {
    //             'content-type': 'application/json'
    //         }
    //     }).then((res) => res.json())
    // }
    //
    // getFollowers() {
    //     return fetch(LOCAL_URL + '/api/followers',{
    //         credentials: 'include'
    //     }).then((res) => res.json())
    // }
    //
    //
    // getFollowing() {
    //     return fetch(LOCAL_URL + '/api/following',{
    //         credentials: 'include'
    //     }).then((res) => res.json())
    // }
    //
    //
    // setFollowing(followId, userName) {
    //
    //     let id = {
    //         id: followId,
    //         user: userName
    //     };
    //
    //     return fetch(LOCAL_URL + '/api/following',{
    //         method: 'put',
    //         body:JSON.stringify(id),
    //         credentials: 'include',
    //         headers: {
    //             'content-type': 'application/json'
    //         }
    //     }).then((res) => res.json())
    // }
    //
    // registerUser(user) {
    //
    //     return fetch(LOCAL_URL + '/api/user/',{
    //         method:'post',
    //         body: JSON.stringify(user),
    //         credentials: 'include',
    //         headers: {
    //             'content-type': 'application/json'
    //         }
    //     }).then((res) => res.json());
    // }

}


export default PostServices;