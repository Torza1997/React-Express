import {extendObservable} from 'mobx';
class Userstore{
    constructor(){
        extendObservable(this,{
            loading:true,
            isLoggedIn:true,
            username:'',

        })
    }
}
export default new Userstore();