// import { StatusBadge } from "@/components/lis/status-badge"
import { StatsCard } from "@/components/dashboard/stats-card"
import { Users, FileText, TestTube, FlaskConical, Clock, AlertTriangle } from "lucide-react"

async function getStats() {

  return {
    totalPacientes: 12,
    ordenesHoy: 3,
    muestrasPendientes: 5,
    resultadosValidados: 8,
  }
}

export default async function DashboardPage() {
  const stats = await getStats()
//   const recentOrders = await getRecentOrders()

  return (
    <div className="flex flex-col">
          <div className="p-6">
        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Pacientes Registrados"
            value={stats.totalPacientes}
            icon={Users}
            iconColor="bg-blue-100 text-blue-600"
          />
          <StatsCard
            title="Órdenes Hoy"
            value={stats.ordenesHoy}
            icon={FileText}
            iconColor="bg-green-100 text-green-600"
          />
          <StatsCard
            title="Muestras Pendientes"
            value={stats.muestrasPendientes}
            icon={TestTube}
            iconColor="bg-amber-100 text-amber-600"
          />
          <StatsCard
            title="Resultados Validados"
            value={stats.resultadosValidados}
            icon={FlaskConical}
            iconColor="bg-teal-100 text-teal-600"
          />
        </div>

        {/* Quick Actions and Recent Orders */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Quick Actions */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-card-foreground">Acciones Rápidas</h2>
            <div className="mt-4 grid gap-3">
              <a
                href="/admision"
                className="flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-muted"
              >
                <div className="rounded-lg bg-primary/10 p-2">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-card-foreground">Nueva Orden</p>
                  <p className="text-sm text-muted-foreground">Registrar paciente y exámenes</p>
                </div>
              </a>
              <a
                href="/muestras"
                className="flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-muted"
              >
                <div className="rounded-lg bg-amber-100 p-2">
                  <TestTube className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium text-card-foreground">Recepción de Muestras</p>
                  <p className="text-sm text-muted-foreground">Registrar ingreso de muestras</p>
                </div>
              </a>
              <a
                href="/resultados"
                className="flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-muted"
              >
                <div className="rounded-lg bg-green-100 p-2">
                  <FlaskConical className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-card-foreground">Ingresar Resultados</p>
                  <p className="text-sm text-muted-foreground">Capturar resultados de análisis</p>
                </div>
              </a>
            </div>
          </div>

          {/* Recent Orders */}
          {/* <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-card-foreground">Órdenes Recientes</h2>
            <div className="mt-4">
              {recentOrders.length === 0 ? (
                <p className="py-8 text-center text-muted-foreground">No hay órdenes recientes</p>
              ) : (
                <div className="divide-y divide-border">
                  {recentOrders.map((orden: any) => (
                    <div key={orden.id} className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-card-foreground">{orden.numero_orden}</p>
                          <p className="text-sm text-muted-foreground">
                            {orden.pacientes?.nombres} {orden.pacientes?.apellido_paterno}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <StatusBadge status={orden.estado as any} />
                        <p className="mt-1 text-xs text-muted-foreground">
                          {new Date(orden.fecha_orden).toLocaleDateString("es-PE", {
                            day: "2-digit",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div> */}
        </div>

        {/* Status Summary */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-6">
            <div className="rounded-full bg-amber-100 p-3">
              <Clock className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-card-foreground">12</p>
              <p className="text-sm text-muted-foreground">Pendientes de toma</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-6">
            <div className="rounded-full bg-blue-100 p-3">
              <TestTube className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-card-foreground">8</p>
              <p className="text-sm text-muted-foreground">En procesamiento</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-6">
            <div className="rounded-full bg-red-100 p-3">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-card-foreground">2</p>
              <p className="text-sm text-muted-foreground">Valores críticos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
