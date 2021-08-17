var keycloak = new Keycloak();

function initKeycloak() {
    keycloak.init({
        onLoad: 'login-required'
    }).then(function(authenticated) {
        alert(authenticated ? 'autentikovano' : 'nije autentikovano');
        document.getElementById('trenutni').value = keycloak.token;
        document.getElementById('refresh').innerHTML = keycloak.refreshToken;
        document.getElementById('username').innerHTML = keycloak.idTokenParsed.preferred_username;
        document.getElementById('ime').innerHTML = keycloak.idTokenParsed.given_name;
        document.getElementById('prezime').innerHTML = keycloak.idTokenParsed.family_name;
        document.getElementById('puno').innerHTML = keycloak.idTokenParsed.name;
        document.getElementById('email').innerHTML = keycloak.idTokenParsed.email;

    }).catch(function() {
        alert('nije uspjela inicijalizacija');
    });


}

var red = function() {
    keycloak.login({ "redirectUri": "http://127.0.0.1:8085/index.html" });
}
var refreshToken = function() {
    if ((keycloak.idTokenParsed.exp) < Math.floor(Date.now() / 1000)) {
        logout()
    } else {
        keycloak.updateToken(-1)
            .then(function() {
                document.getElementById('trenutni').value = keycloak.token;
                document.getElementById('refresh').value = keycloak.refreshToken;

            });
    }


};

var logout = function() {
    keycloak.logout({ "redirectUri": "http://127.0.0.1:8085/login.html" });
}

var loadData = function(req, res) {
    console.log(Date.now() / 1000);
    if ((keycloak.idTokenParsed.exp) < Math.floor(Date.now() / 1000)) {
        logout()
    } else
        alert('Access token je validan!');
    return;
};