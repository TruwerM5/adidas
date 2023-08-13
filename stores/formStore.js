import { defineStore } from "pinia";

export const useFormStore = defineStore('form', {
    state: () => {
        return {
            isFormOpened: false,
            isLogoutOpened: false,
            currentForm: 'email',
            email: '',
            password: '',
            errorMsg: '',
            passwordErrorMsg: ''
        }
    },
    actions: {
        toggleForm() {
            this.isFormOpened = !this.isFormOpened;
            this.currentForm = 'email';
            this.email = '';
            this.password = '';
            this.errorMsg = '';
            this.passwordErrorMsg = '';
        },
        validateLogin(email) {
            if(!email.includes('@')) {
                this.errorMsg = 'Incorrect login, enter correct login please';
                return false;
            } 
            return true;
        },
        validatePassword(pass) {
            if(pass.length < 8) {
                this.passwordErrorMsg = 'Password must be at least 8 characters long';
                return false;
            }
            return true;
        }
    }
})