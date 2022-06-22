import Cookies from "universal-cookie";

const cookies = new Cookies ();

export const saveCookie = (token) => {
    console.log(token);
    cookies.set("ACCESS_TOKEN", token.ACCESS_TOKEN, {path: '/',});
    cookies.set("ID_TOKEN", token.ID_TOKEN, {path: '/'});
    cookies.set("SESSION_STATE", token.SESSION_STATE, {path: '/'});
    cookies.set("TOKEN_TYPE", token.TOKEN_TYPE, {path: '/'});
};


export function getCookie (cookieName) {
    return cookies.get(cookieName);
}

export function getAllCookie () {
    return cookies.getAll();
}


export function removeCookie (){
    cookies.remove("ACCESS_TOKEN", {path: '/',});
    cookies.remove("ID_TOKEN", {path: '/'});
    cookies.remove("SESSION_STATE", {path: '/'});
    cookies.remove("TOKEN_TYPE", {path: '/'});

}