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
  },
  {
    idProducto: 4,
    nombreProducto: "Tee de PVC 1/2 pulg DURMAN",
    descripcion: "Conector en forma de T para instalaciones de tubería en PVC.",
    precio: 0.24,
    stock: 100,
    idCategoria: 4,
    imagen_data: "assets/img/productos/tee_pvc_1_2.jpg"
  },
  {
    idProducto: 5,
    nombreProducto: "Toma superficial hembra doble 15A 120VAC EAGLE",
    descripcion: "Toma eléctrica doble polarizada para uso residencial y comercial.",
    precio: 2.20,
    stock: 50,
    idCategoria: 3,
    imagen_data: "assets/img/productos/toma_superficial_doble.jpg"
},
{
  idProducto: 6,
  nombreProducto: "Interruptor superficial 10A 125VAC BTICINO",
  descripcion: "Interruptor unipolar para instalación superficial, ideal para uso residencial.",
  precio: 1.90,
  stock: 60,
  idCategoria: 3,
  imagen_data: "assets/img/productos/interruptor_superficial_bticino.jpg"
},
{
  idProducto: 7,
  nombreProducto: "Pintura esmalte melocotón 3.78L (gal) CORONA",
  descripcion: "Esmalte alquídico de alto cubrimiento, resistente a la abrasión, lavado y desgaste. Ideal para mampostería, block, madera y metal.",
  precio: 18.35,
  stock: 40,
  idCategoria: 2,
  imagen_data: "assets/img/productos/pintura_melocoton_corona.jpg"
},
{
  idProducto: 8,
  nombreProducto: "Tubo PVC 160 psi de 1 pulg (25.40 mm)",
  descripcion: "Tubo de PVC para uso hidráulico, resistente a 160 psi. Ideal para instalaciones de agua fría.",
  precio: 4.15,
  stock: 80,
  idCategoria: 4,
  imagen_data: "assets/img/productos/tubo_pvc_1_pulg_160psi.jpg"
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
