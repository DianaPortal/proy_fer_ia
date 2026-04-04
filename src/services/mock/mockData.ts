// ─── Usuarios ───────────────────────────────────────────────────────────────
export type UserRole = "Admin" | "Editor" | "Viewer";
export type UserStatus = "Activo" | "Inactivo" | "Pendiente";

export interface User {
    id: number;
    initials: string;
    name: string;
    username: string;
    role: UserRole;
    status: UserStatus;
}

export const mockUsers: User[] = [
    { id: 1, initials: "AG", name: "Ana García",    username: "AGARCIA", role: "Admin",  status: "Activo"    },
    { id: 2, initials: "CR", name: "Carlos Ruiz",   username: "CRUIZ",   role: "Editor", status: "Activo"    },
    { id: 3, initials: "EL", name: "Elena López",   username: "ELOPÉZ",  role: "Viewer", status: "Inactivo"  },
    { id: 4, initials: "DM", name: "David Muñoz",   username: "DMUÑOZ",  role: "Editor", status: "Activo"    },
    { id: 5, initials: "SP", name: "Sofía Pérez",   username: "SPEREZ",  role: "Viewer", status: "Pendiente" },
    { id: 6, initials: "LM", name: "Luis Mendez",   username: "LMENDEZ", role: "Editor", status: "Activo"    },
    { id: 7, initials: "SL", name: "Sofia Lopez",   username: "SLOPEZ",  role: "Viewer", status: "Activo"    },
    { id: 8, initials: "RG", name: "Rosa Gutierrez",username: "RGUTIER", role: "Viewer", status: "Inactivo"  },
];

// ─── Documentos / Archivos recientes ────────────────────────────────────────
export type FileStatus = "Completado" | "Procesando" | "Error" | "Alerta: Formato inusual";

export interface RecentFile {
    id: number;
    name: string;
    size: string;
    time: string;
    status: FileStatus;
}

export const mockRecentFiles: RecentFile[] = [
    { id: 1, name: "INFORME N 6354-SUSAUD.IID.pdf", size: "2.4 MB", time: "Hace 2 min",    status: "Procesando" },
    { id: 2, name: "INFORME N 6354-SUSAUD.IID.pdf", size: "2.4 MB", time: "Ayer, 14:30",   status: "Completado" },
    { id: 3, name: "INFORME N 6354-SUSAUD.IID.pdf", size: "2.4 MB", time: "Ayer, 09:15",   status: "Alerta: Formato inusual" },
    { id: 4, name: "INFORME N 6354-SUSAUD.IID.pdf", size: "2.4 MB", time: "Lunes, 18:45",  status: "Error" },
    { id: 5, name: "INFORME N 6354-SUSAUD.IID.pdf", size: "2.4 MB", time: "Lunes, 10:00",  status: "Completado" },
];

// ─── Expedientes analizados ──────────────────────────────────────────────────
export type ExpedienteStatus = "Pendiente" | "Urgente" | "En Revisión" | "Baja";

export interface Expediente {
    id: string;
    document: string;
    size: string;
    observation: string;
    date: string;
    status: ExpedienteStatus;
}

export const mockExpedientes: Expediente[] = [
    { id: "EXP-2023-001", document: "INFORME N 6354-SUSAUD.IID", size: "2.4 MB", observation: "Firma Faltante",      date: "12 Oct 2023", status: "Pendiente"   },
    { id: "EXP-2023-004", document: "INFORME N 6355-SUSAUD.IID", size: "2.4 MB", observation: "Fechas Inconsistentes",date: "11 Oct 2023", status: "Urgente"     },
    { id: "EXP-2023-009", document: "INFORME N 6356-SUSAUD.IID", size: "2.4 MB", observation: "Página Borrosa",      date: "10 Oct 2023", status: "En Revisión" },
    { id: "EXP-2023-012", document: "INFORME N 6357-SUSAUD.IID", size: "2.4 MB", observation: "Datos Ilegible",      date: "09 Oct 2023", status: "Pendiente"   },
    { id: "EXP-2023-015", document: "INFORME N 6358-SUSAUD.IID", size: "2.4 MB", observation: "Formato Incorrecto",  date: "08 Oct 2023", status: "Baja"        },
];

// ─── Borradores concluidos ───────────────────────────────────────────────────
export type DraftStatus = "Completado" | "Revisado" | "Procesando";

export interface Draft {
    id: number;
    name: string;
    size: string;
    legalInitials: string;
    legalName: string;
    createdAt: string;
    status: DraftStatus;
}

export const mockDrafts: Draft[] = [
    { id: 1, name: "Informe_Q3_2023.docx",            size: "2.4 MB", legalInitials: "AG", legalName: "Ana García",   createdAt: "24 Oct 2023", status: "Completado" },
    { id: 2, name: "Contrato_Arrendamiento_V2.docx",  size: "1.8 MB", legalInitials: "CR", legalName: "Carlos Ruiz",  createdAt: "22 Oct 2023", status: "Completado" },
    { id: 3, name: "Acta_Reunion_Octubre.docx",       size: "850 KB", legalInitials: "AG", legalName: "Ana García",   createdAt: "20 Oct 2023", status: "Completado" },
    { id: 4, name: "Propuesta_Proyecto_AI.docx",      size: "4.2 MB", legalInitials: "LM", legalName: "Luis Mendez",  createdAt: "18 Oct 2023", status: "Revisado"   },
    { id: 5, name: "Manual_Usuario_v1.docx",          size: "1.1 MB", legalInitials: "SL", legalName: "Sofia Lopez",  createdAt: "15 Oct 2023", status: "Completado" },
];

// ─── Notificaciones ──────────────────────────────────────────────────────────
export type NotifType = "success" | "warning" | "error" | "info";

export interface Notification {
    id: number;
    type: NotifType;
    title: string;
    message: string;
    time: string;
}

export const mockNotifications: Notification[] = [
    { id: 1, type: "success", title: "Análisis completo",    message: "INFORME N 6354-SUSAUD.pdf procesado exitosamente.", time: "Hace 5 min"  },
    { id: 2, type: "warning", title: "Observaciones",        message: "Baja calidad de imagen detectada en pag. 4.",       time: "Hace 32 min" },
    { id: 3, type: "error",   title: "Alerta Crítica",       message: "Error al convertir INFORME N 6354.pdf. Formato no soportado.", time: "Hace 2 horas" },
    { id: 4, type: "info",    title: "Historial archivado",  message: "Limpieza automática del sistema realizada.",         time: "Ayer"        },
];

// ─── Dashboard chart data ────────────────────────────────────────────────────
export const mockHourlyData = [
    { time: "00:00", value: 30 },
    { time: "02:00", value: 45 },
    { time: "04:00", value: 25 },
    { time: "06:00", value: 60 },
    { time: "08:00", value: 50 },
    { time: "10:00", value: 5  },
    { time: "12:00", value: 90 },
    { time: "14:00", value: 65 },
    { time: "16:00", value: 40 },
    { time: "18:00", value: 55 },
    { time: "20:00", value: 35 },
    { time: "23:59", value: 20 },
];

export const mockWeeklyAccuracy = [
    { week: "Sem 1", value: 72 },
    { week: "Sem 2", value: 80 },
    { week: "Sem 3", value: 87 },
    { week: "Sem 4", value: 98 },
];

export const mockDashboardFiles = [
    { name: "P. INICIO 01011-2026.pdf",   size: "2.4 MB", time: "Hace 10 min", status: "Completado" },
    { name: "P. ARCHIVO 01011-2026.docx", size: "1.8 MB", time: "Hace 45 min", status: "Procesando" },
    { name: "P. ARCHIVO 01011-2026.pdf",  size: "5.1 MB", time: "Hace 2 horas",status: "Completado" },
];
