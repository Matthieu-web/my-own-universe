"use client"

import NewsPappersForm from "./NewsPappersForm"

export default function NewsPappers(){
    return (
    <div id="news-papers-section"  className="w-full absolute left-[-100vw]">
        <h3>Mon Journal de Bord</h3>
        <NewsPappersForm></NewsPappersForm>
    </div>
    )
}