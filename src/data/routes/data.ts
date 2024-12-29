export const Admin_NavData = [
	{ title: "Dashboard", href: "/inicio" },
	{
		title: "Estudiantes",
		children: [
			{ title: "Asistencias", href: "/students/asistence", description: "Gestionar conteo de asistencias totales." },
			{ title: "Cargar Asistencias", href: "", description: "Cargar Asitencias diarías" },
			{ title: "Cargar Notas", href: "", description: "Cargar notas" },
			{ title: "Lista de Estudiantes", href: "/students", description: "Lista total de estudiantes." },
		],
	},
	{
		title: "Administración",
		children: [
			{ title: "Alumnos", href: "", description: "Gestionar alumnos" },
			{ title: "Cobranza", href: "", description: "Cargar cobranza" },
			{ title: "Representantes", href: "", description: "Gestionar representantes." },
			{ title: "Moras", href: "", description: "Visualizar deudores" },
			{ title: "Expedientes", href: "", description: "Gestionar expedientes de todos los alumnos" },
		],
	},
	{
		title: "Configuración",
		children: [
			{ title: "Gestionar Materias", href: "", description: "Agregar, editar, eliminar materias" },
			{ title: "Gestionar Grados", href: "", description: "Agregar, editar, eliminar Grados" },
			{
				title: "Gestionar Secciones",
				href: "",
				description: "Agregar, editar, eliminar secciones",
			},
			{
				title: "Gestionar Perfiles",
				href: "",
				description: "Agregar, Administrar, eliminar perfiles",
			},
			{ title: "Calendario Academico", href: "", description: "Gestionar calendario academico" },
		],
	},
];
