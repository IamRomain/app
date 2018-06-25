'use script';


window.onload = function () {
    window.ESDJob = new ESDJob();
};

class ESDJob {
    constructor() {

        this.googleBtn = document.querySelector('#login-google');

        this._checkSetup();
        this._initFirebase();
    }

    _initFirebase() {
        this.auth = firebase.auth();
        this.db = firebase.firestore();
        const settings = {timestampsInSnapshots: true};
        this.db.settings(settings);
        this.storage = firebase.storage();
        this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
    }

    onAuthStateChanged(user) {
        console.log('user:', JSON.stringify(user));
        if (user) {
            console.log("Connecté");
        } else {
            console.log("Déconnecté");
        }
    }


    _checkSetup() {
        if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
            window.firebase('Not configured');
        }
    }
}

signInWithLogin()
{
    let email = document.querySelector('#username').value;
    let pass  = document.querySelector('#userpass').value;

    if (email === '' || pass === '')
    {
        let data = {
            message: 'Please add a login and password',
            timeout: 4000
        };
        this.snackbar.MaterialSnackbar.showSnackbar(data);
    }

    this.auth.signInWithEmailAndPassword(email, pass)
        .then(result => {
            if (result) { this.loginPanel.close(); }
        })
        .catch(e => {
            console.error(e);
            let data = {
                message: 'Please add a correct login and password',
                timeout: 4000
            };
            this.snackbar.MaterialSnackbar.showSnackbar(data);
        });
}

