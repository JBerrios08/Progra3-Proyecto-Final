// =============================
//  DATA SEMILLA - FERRO ORIENTE
// =============================

// Categorías semilla
const seedCategories = [
  { idCategoria: 1, nombreCategoria: "Herramientas" },
  { idCategoria: 2, nombreCategoria: "Pinturas" },
  { idCategoria: 3, nombreCategoria: "Electricidad" },
  { idCategoria: 4, nombreCategoria: "Fontanería" }
];

// Productos semilla con imágenes locales (assets/img/productos/)
const seedProducts = [
  {
    idProducto: 1,
    nombreProducto: "Martillo Profesional",
    descripcion: "Martillo de acero reforzado para construcción.",
    precio: 8.50,
    stock: 20,
    idCategoria: 1,
    imagen_data: "assets/img/productos/martillo.png"
  },
  {
    idProducto: 2,
    nombreProducto: "Taladro Inalámbrico 12V",
    descripcion: "Taladro compacto con batería recargable.",
    precio: 45.00,
    stock: 10,
    idCategoria: 1,
    imagen_data: "assets/img/productos/taladro.png"
  },
  {
    idProducto: 3,
    nombreProducto: "Pintura Látex Blanca 1gal",
    descripcion: "Alta cobertura para interiores.",
    precio: 18.75,
    stock: 30,
    idCategoria: 2,
    imagen_data: "assets/img/productos/pintura.png"
  }
];

// Usuarios oficiales (los que me diste)
const seedUsers = [
  // ADMIN
  {
    idUsuario: 1,
    nombre: "Administrador",
    correo: "bo0310042024@unab.edu.sv",
    password: "Jaime123",
    rol: "admin"
  },
  // SUPERVISOR
  {
    idUsuario: 2,
    nombre: "Supervisor",
    correo: "um1240042023@unab.edu.sv",
    password: "Rafael123",
    rol: "supervisor"
  },
  // TEAM
  {
    idUsuario: 3,
    nombre: "Team Carlos",
    correo: "cs1209042018@unab.edu.sv",
    password: "Carlos123",
    rol: "team"
  },
  {
    idUsuario: 4,
    nombre: "Team Alexis",
    correo: "cr0367042024@unab.edu.sv",
    password: "Alexis123",
    rol: "team"
  },
  {
    idUsuario: 5,
    nombre: "Team Andrea",
    correo: "no0882042024@unab.edu.sv",
    password: "Andrea123",
    rol: "team"
  },
  // USUARIO
  {
    idUsuario: 6,
    nombre: "Usuario Jaime",
    correo: "jaime.berrios08@gmail.com",
    password: "Fer123",
    rol: "usuario"
  }
];
