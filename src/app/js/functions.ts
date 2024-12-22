"use client"


function removeNav(except: string){
    let toRemove = ["edit-profil", "news-papers-section"];
    let i = 0;
    while (toRemove[i]){
        if (toRemove[i] !== except)
            document.getElementById(toRemove[i])?.classList.remove("nav-menu")
        i++;
    }
}
export function toggleNavMenu(){
    document.getElementById("button-nav-menu")?.classList.toggle("active")
     document.getElementById("nav-menu")?.classList.toggle("nav-menu")
}

export function toggleEditForm(){
    removeNav("edit-profil");
    document.getElementById("edit-profil")?.classList.toggle("nav-menu");
}

export function toggleNewsPapersSection(){
    removeNav("news-papers-section");
    document.getElementById("news-papers-section")?.classList.toggle("nav-menu");
}
