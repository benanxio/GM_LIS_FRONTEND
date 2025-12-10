import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import PatientsDataTable from "./DataTable"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "LIS - Pacientes",
    description: 'Administrar pacientes'
}

async function getPacientes() {

    return [
        { "id": "0f1c9b7d-5f3e-4e1d-8ff2-0ab5e8e548a1", "documento_tipo": "DNI", "documento_numero": "74382951", "nombres": "María José", "apellido_paterno": "Ramírez", "apellido_materno": "Gonzales", "fecha_nacimiento": "1992-03-15", "genero": "F", "telefono": "987452310", "email": "mj.ramirez@example.com", "direccion": "Av. Los Pinos 234, Lima", "created_at": "2025-01-10 20:00:00+00", "updated_at": "2025-01-10 20:00:00+00" },
        { "id": "1a2b3c4d-1122-4455-8899-aabbccddeeff", "documento_tipo": "DNI", "documento_numero": "45678213", "nombres": "Carlos", "apellido_paterno": "Quispe", "apellido_materno": "Huamán", "fecha_nacimiento": "1988-11-02", "genero": "M", "telefono": "986125478", "email": "carlos.quispe@example.com", "direccion": "Jr. Libertadores 520, Arequipa", "created_at": "2025-01-10 20:00:00+00", "updated_at": "2025-01-10 20:00:00+00" }
    ]
}

export default async function PacientesPage() {
    const pacientes = await getPacientes()

    return (
        <div className="flex flex-col">
            <div className="p-6">
                <div className="mb-6 flex items-center justify-between">
                    <p className="text-muted-foreground">
                        {pacientes.length} paciente{pacientes.length !== 1 ? "s" : ""} registrado{pacientes.length !== 1 ? "s" : ""}
                    </p>
                    <Link href="/admision">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Nuevo Paciente
                        </Button>
                    </Link>
                </div>
                <PatientsDataTable data={pacientes} emptyMessage="No hay pacientes registrados" />
            </div>
        </div>
    )
}
