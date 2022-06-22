import Cookies from "universal-cookie";

const cookiesUserInfo = new Cookies ();



export const saveCookieUserInfo = (userinfo) => {

  
    console.log("O que recebi no SaveCookisUserInfo: ", userinfo);
    cookiesUserInfo.set("NOME", userinfo.NOME, {path: '/'});
    cookiesUserInfo.set("EMAIL", userinfo.EMAIL, {path: '/'});
    cookiesUserInfo.set("ROLES", userinfo.ROLES, {path: '/'});

    
    
};


export function getCookieUserInfo (cookieName) {
    return cookiesUserInfo.get(cookieName);
}

export function getAllCookieUserInfo () {
    return cookiesUserInfo.getAll();
}


export function removeCookieUserInfo (){
    cookiesUserInfo.remove("NOME", {path: '/'});
    cookiesUserInfo.remove("EMAIL", {path: '/'});
    cookiesUserInfo.remove("ROLES", {path: '/'});

}





