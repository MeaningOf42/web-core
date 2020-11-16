import firebase from "firebase/app";
import "firebase/auth";

export class Auth {
    app: any;
    auth: any;

    constructor(config: object) {
        this.app = firebase.initializeApp(config);
        this.auth = firebase.auth();
    }

    login(email: string, password: string) {
        return new Promise((resolve: any, reject: any) => {
            this.auth
                .signInWithEmailAndPassword(email, password)
                .then(() => resolve(this.auth.currentUser))
                .catch((error: any) => reject(error.message));
        });
    }

    signUp(email: string, password: string, passwordConfirm: string) {
        if (email && password === passwordConfirm){
            return new Promise((resolve: any, reject: any) => {
                this.auth
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    this.auth.currentUser.sendEmailVerification()
                    resolve(this.auth.currentUser)
                })
                .catch((error: any) => reject(error.message));
            })
        } else {
            throw new Error("Passwords do not match")
        }
    }
}