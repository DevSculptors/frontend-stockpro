"use client";
import UserSingle from "@/components/Profile/User";
import { useContext } from "react";
import { ModalContext } from "@/context/ModalContext";
import { UserContext } from "@/context/UserContext";
import { useQuery } from "@tanstack/react-query";
import { getUserByIdAPI } from "@/api/Users";
import { useState, useEffect } from "react";

interface ExtractedData {
  username: string;
  email: string;
  isActive: boolean;
  id_document: string;
  type_document: string;
  name: string;
  last_name: string;
  phone: string;
  roleUser: string;
}

function User() {
  const [extractedData, setExtractedData] = useState<ExtractedData | {}>({});
  const [idUser, setIdUser] = useState<string>("");

  const { setOpen, setId } = useContext(ModalContext);
  const { setSelectedUser } = useContext(UserContext);

  const { data, isLoading } = useQuery(["users", idUser], () =>
    getUserByIdAPI(idUser)
  );

  const handleClick = () => {
    if (!isLoading) {
      setSelectedUser(data);
    }
    if (setId) {
      setId("editUser");
      setOpen(true);
    }
  };

  useEffect(() => {
    const user = sessionStorage.getItem("userData");

    if (user) {
      const userData = JSON.parse(user);
      setIdUser(userData.id);

      const data: ExtractedData = {
        username: userData.username,
        email: userData.email,
        isActive: userData.isActive,
        id_document: userData.person.id_document,
        type_document: userData.person.type_document,
        name: userData.person.name,
        last_name: userData.person.last_name,
        phone: userData.person.phone,
        roleUser: userData.roleUser,
      };
      setExtractedData(data);
    }
  }, []);

  const singleUser = {
    id: 1,
    title: (extractedData as ExtractedData).username,
    img: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    info: {
      username: (extractedData as ExtractedData).username,
      nombre:
        (extractedData as ExtractedData).name +
        " " +
        (extractedData as ExtractedData).last_name,
      email: (extractedData as ExtractedData).email,
      phone: (extractedData as ExtractedData).phone,
      estado: (extractedData as ExtractedData).isActive ? "Activo" : "Inactivo",
      documento: (extractedData as ExtractedData).id_document,
      "tipo Documento": (extractedData as ExtractedData).type_document,
      role: (extractedData as ExtractedData).roleUser,
    },

    activities: [
      {
        text: "Mantengamos nuestros estantes siempre surtidos y organizados",
        time: "Cada semana",
      },
      {
        text: "La satisfacción del cliente es nuestra prioridad",
        time: "Todos los dias",
      },
      {
        text: "Demos especial atención a la limpieza y orden del supermercado",
        time: "Todos los dias",
      },
      {
        text: "Prioricemos la seguridad y el bienestar de nuestros empleados",
        time: "Continuamente",
      },
      {
        text: "Promovamos la calidad en todos los aspectos",
        time: "Solo productos de calidad",
      },
    ],
  };

  return (
    <div>
      <UserSingle {...singleUser} onClick={handleClick} />
    </div>
  );
}

export default User;
