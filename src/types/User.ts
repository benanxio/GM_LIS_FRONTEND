type medicoRoles =
  | 'Médico Radiólogo'
  | 'Técnico Radiólogo'
  | 'Médico Referente';

export type userRoles = medicoRoles | 'Admin' | 'Admisión' | 'Solo lectura' | 'GOD' | 'Solo Lectura - Ext' | 'Residente';

export interface Sede {
  sede_id: number;
  nombre: string;
  short_name: string;
  rol: userRoles;
}

export interface Clientes {
  client_id: number;
  nombre: string;
  short_name: string;
  sedes: Sede[];
}


export interface User {
  email: string;
  username: string;
  sede: number | null;
  role: userRoles;
  clientes: Clientes[];
  permissions: Array<string>;
}