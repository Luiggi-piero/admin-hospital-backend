const getMenuFrontEnd = (role = "USER_ROLE") => {
  const menu = [
    {
      title: "Dashboard",
      icon: "mdi mdi-gauge",
      submenu: [
        { title: "Main", url: "/" },
        { title: "Progress bar", url: "progress" },
        { title: "Grafica", url: "grafica1" },
        { title: "Promesa", url: "promesa" },
        { title: "Rxjs", url: "rxjs" },
      ],
    },
    {
      title: "Mantenimiento",
      icon: "mdi mdi-folder-lock-open",
      submenu: [
        { title: "Hospitales", url: "hospitales" },
        { title: "Médicos", url: "medicos" },
        // { title: "Usuarios", url: "usuarios" },
      ],
    },
  ];

  if (role === "ADMIN_ROLE") {
    menu[1].submenu.unshift({ title: "Usuarios", url: "usuarios" });
  }

  return menu;
};

module.exports = {
  getMenuFrontEnd,
};
