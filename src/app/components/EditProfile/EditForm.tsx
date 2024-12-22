"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/actions";
import { useEffect } from "react";

export default  function EditForm() {
  const router = useRouter();
  const [inputData, setInputData] = useState({
    firstname: "",
    lastname: "",
    pseudonyme: "",
    email: "",
    password: "",
    passwordconfirm: "",
  });

  const [warningPassword, setWarningPassword] = useState("");
  const [warningPasswordConfirm, setWarningPasswordConfirm] = useState("");
  const [warningPseudonyme, setWarningPseudonyme] = useState("");
  const [warningEmail, setWarningEmail] = useState("");

  const [successEditProfile, setSuccessEditProfile] = useState("");

  // Fetch les données de l'utilisateur
  const [isLoading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchData = async() => {
            const response = await fetch("/api/edit-user")
            const dataJson = await response.json();

            setInputData(dataJson)
            setLoading(false);
    }
    fetchData();
  }, []);

  // fonction pour vérifier les champs du formulaire
  if (isLoading)return <div>Loading...</div>
  
  function parseForm(formData: FormData) {
    let password = formData.get("password");
    let passwordConfirm = formData.get("passwordconfirm");
    let email = formData.get("email");
    let pseudonyme = formData.get("pseudonyme");
    let isGood = true;
    setWarningPassword("");
    setWarningPasswordConfirm("");
    setWarningPseudonyme("");
    setWarningEmail("");
    setSuccessEditProfile("");
    if (password === "") {
      setWarningPassword("Vous devez entrer un mot de passe.");
      isGood = false;
    }
    if (passwordConfirm === "") {
      setWarningPasswordConfirm("Ce champ ne peut pas être vide.");
      isGood = false;
    }
    if (email === "") {
      setWarningEmail("Vous devez entrer un email valide");
      isGood = false;
    }
    if (isGood && password != passwordConfirm) {
      setWarningPassword("Les deux mots de passe ne correspondent pas");
      isGood = false;
    }
    if (pseudonyme === "") {
      setWarningPseudonyme("Nom d'utilisateur Obligatoire.");
      isGood = false;
    }
    return isGood;
  }

  function handleTyping(e: any) {
    const { type, name, value } = e.target;
    setInputData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    let password = formData.get("password");
    let passwordConfirm = formData.get("passwordconfirm");
    let email = formData.get("email");
    let firstname = formData.get("firstname");
    let lastname = formData.get("lastname");
    let pseudonyme = formData.get("pseudonyme");

    if (!parseForm(formData)) {
      return;
    }

    const response = await fetch("api/edit-user", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        firstname,
        lastname,
        pseudonyme,
        email,
        password,
      }),
    });
    const result = await response.json();
    if (result.error === "pseudonymeAlreadySet")
      setWarningPseudonyme(result.message);
    else {
      login(formData);
      setSuccessEditProfile("Profil bien modifié!")
      router.push("/mon-univers");
      router.refresh();
    }
  }

  return (
    <div id="edit-profil" className="w-full absolute left-[-100vw]">
      <h3>Mes Informations</h3>
      <div className="text-black">
        <form method="POST" action="" onSubmit={handleSubmit}>
          <input
            name="firstname"
            type="text"
            placeholder="Votre Prénom..."
            value={inputData.firstname || ""}
            onChange={handleTyping}
            className=" block border-2 p-2 rounded-lg mb-4 mx-auto"
          />
          <input
            name="lastname"
            type="text"
            placeholder="Votre Nom..."
            value={inputData.lastname || ""}
            onChange={handleTyping}
            className="  block border-2 p-2 rounded-lg mb-4 mx-auto"
          />

          <input
            name="pseudonyme"
            type="text"
            placeholder="Nom d'utilisateur (public)"
            value={inputData.pseudonyme || ""}
            onChange={handleTyping}
            className="block border-2 p-2 rounded-lg mb-4 mx-auto"
          />
          <div className="text-orange-600 mb-4 ">{warningPseudonyme}</div>
          <input
            name="email"
            type="email"
            placeholder="Votre Email..."
            value={inputData.email || ""}
            onChange={handleTyping}
            className="block border-2 p-2 rounded-lg mb-4 mx-auto"
          />
          <div className="text-orange-600 mb-4">{warningEmail}</div>
          <input
            name="password"
            type="string"
            placeholder="Votre Mot de Passe..."
            value={inputData.password || ""}
            onChange={handleTyping}
            className=" block border-2 p-2 rounded-lg mb-4 mx-auto"
          />
          <div className="text-orange-600 mb-4">{warningPassword}</div>
          <input
            name="passwordconfirm"
            type="string"
            placeholder="Confirmer Mot de Passe..."
            value={inputData.passwordconfirm || ""}
            onChange={handleTyping}
            className=" block border-2 p-2 rounded-lg mb-4 mx-auto"
          />
          <div className="text-orange-600 mb-4">{warningPasswordConfirm}</div>
          <button
            type="submit"
            className="btn text-white border-2 px-4 py-2 rounded-lg hover:text-vert hover:border-vert"
          >
            Enregistrer
          </button>
          <div className="text-vert mb-4">{successEditProfile}</div>
        </form>
      </div>
    </div>
  );
}
