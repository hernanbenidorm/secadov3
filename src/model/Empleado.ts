export class Empleado {
    constructor(
        public id: number,
        public nombre: string,
        public dni: string,
        public telefono: string,
        public direccion: string,
        public fecha_nacimiento: string,
        public email: string,
        public num_ss: string,
        public imagen: string,
        public role: string

    ) { }
}