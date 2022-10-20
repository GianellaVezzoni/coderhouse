class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }

  getFullName() {
    return console.log(`Mi nombre es ${this.nombre} ${this.apellido}`);
  }

  addMascota(mascota) {
    this.mascotas.push(mascota);
    console.log('Mascota agregada!')
    console.log("Mascotas: ", this.mascotas);
  }

  addBook(libro) {
    this.libros.push(libro);
    console.log("Libro agregado!");
  }

  getBooksName() {
    console.log("Libros:");
    this.libros.map((item) => console.log(`Nombre: ${item.nombre}`));
  }
}

const librosList = [
  {
    nombre: "El psicoanalista",
    autor: "John Katzenbach",
  },
  {
    nombre: "vuelta al mundo en 80 dias",
    autor: "Julio Verne",
  },
];
const mascotasList = ["Perro", "Gato", "Pajaro"];
const usuario = new Usuario("Gianella", "Vezzoni", librosList, mascotasList);
usuario.getFullName();
usuario.addMascota("Ballena");
usuario.addBook({ nombre: "Caos", autor: "Magali Tajes" });
usuario.getBooksName();
