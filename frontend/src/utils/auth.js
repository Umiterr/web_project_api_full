export const BASE_URL = "http://localhost:3000";

export const register = async (contraseña, email) => {
  try {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: contraseña,
        email: email,
      }),
    });

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error("Error: No se ha proporcionado uno o más campos");
      } else if (response.status === 401) {
        throw new Error(
          "Error: No se ha encontrado al usuario con el correo electrónico especificado"
        );
      } else {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
    }

    const responseBody = await response.json();

    return responseBody;
  } catch (error) {
    console.error("Error:", error.message);
    return { error: true, message: error.message };
  }
};

export const login = async (contraseña, email) => {
  try {
    const response = await fetch(`${BASE_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: contraseña,
        email: email,
      }),
    });

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error(
          "Error: Uno de los campos se rellenó de forma incorrecta"
        );
      } else if (response.status === 401) {
        throw new Error(
          "Error: No se ha encontrado al usuario con el correo electrónico especificado"
        );
      } else {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
    }

    const data = await response.json();

    if (data && data.token) {
      localStorage.setItem("jwt", data.token);
      console.log(data.token);
      return data;
    } else {
      throw new Error(
        "Error: La respuesta de la API no contiene el token esperado"
      );
    }
  } catch (error) {
    console.error("Error:", error.message);
    return { error: true, message: error.message };
  }
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        if (response.status === 400) {
          throw new Error(
            "Error: Uno de los campos se rellenó de forma incorrecta"
          );
        } else if (response.status === 401) {
          throw new Error(
            "Error: No se ha encontrado al usuario con el correo electrónico especificado"
          );
        } else {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
      }
      return response.json();
    })
    .then((data) => data)
    .catch((error) => {
      console.error("Error en la solicitud:", error);
      throw error;
    });
};
