import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

const hours = Array.from({ length: 13 }, (_, i) => `${7 + i}:00 ${i < 5 ? "am" : "pm"}`);
const days = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];

interface DiaryComponentProps {
	data: Record<string, Record<string, string>>;
}

export const DiaryComponent: React.FC<DiaryComponentProps> = ({ data }) => {
	return (
		<div className="overflow-x-auto rounded-lg ">
			<Table className="min-w-full divide-y divide-gray-200">
				<TableCaption>Listado de Actividades Escolares.</TableCaption>
				<TableHeader className="bg-gray-50">
					<TableRow>
						<TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Time
						</TableHead>
						{days.map((day) => (
							<TableHead
								key={day}
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								{day}
							</TableHead>
						))}
					</TableRow>
				</TableHeader>
				<TableBody className="bg-white divide-y divide-gray-200">
					{hours.map((hour) => (
						<TableRow key={hour}>
							<TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 w-[10px]">
								{hour}
							</TableCell>
							{days.map((day) => (
								<TableCell
									key={day}
									className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-[200px]"
								>
									{data[hour]?.[day] || ""}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};
