"use client"
import Link from "next/link"
import { Eye, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DataTable, DataTableProps } from "@/components/data-table"

interface PatientsDataTableProps<T> extends Omit<DataTableProps<T>, "columns"> {}

function PatientsDataTable<T>(props: PatientsDataTableProps<T>) {

    const columns = [
        {
            key: "documento",
            header: "Documento",
            render: (paciente: any) => (
                <span className="font-mono">
                    {paciente.documento_tipo} {paciente.documento_numero}
                </span>
            ),
        },
        {
            key: "nombre",
            header: "Nombre Completo",
            render: (paciente: any) => (
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                        <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <span>
                        {paciente.nombres} {paciente.apellido_paterno} {paciente.apellido_materno}
                    </span>
                </div>
            ),
        },
        {
            key: "fecha_nacimiento",
            header: "Edad",
            render: (paciente: any) => {
                if (!paciente.fecha_nacimiento) return "-"
                const edad = Math.floor(
                    (new Date().getTime() - new Date(paciente.fecha_nacimiento).getTime()) / (365.25 * 24 * 60 * 60 * 1000),
                )
                return `${edad} años`
            },
        },
        {
            key: "genero",
            header: "Género",
            render: (paciente: any) => (paciente.genero === "M" ? "Masculino" : paciente.genero === "F" ? "Femenino" : "-"),
        },
        { key: "telefono", header: "Teléfono" },
        { key: "email", header: "Email" },
        {
            key: "created_at",
            header: "Registro",
            render: (paciente: any) => new Date(paciente.created_at).toLocaleDateString("es-PE"),
        },
        {
            key: "actions",
            header: "Acciones",
            render: (paciente: any) => (
                <Link href={`/pacientes/${paciente.id}`}>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                    </Button>
                </Link>
            ),
        },
    ]


    return (
        <DataTable
            {...props}
            columns={columns}
        />
    )
}

export default PatientsDataTable