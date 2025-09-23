"use client";

import {
	closestCenter,
	DndContext,
	type DragEndEvent,
	KeyboardSensor,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import {
	arrayMove,
	horizontalListSortingStrategy,
	SortableContext,
	useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
	type Cell,
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	type Header,
	type SortingState,
	useReactTable,
} from "@tanstack/react-table";
import {
	ChevronDownIcon,
	ChevronUpIcon,
	EditIcon,
	GripVerticalIcon,
	MoreHorizontalIcon,
	TrashIcon,
} from "lucide-react";
import { type CSSProperties, useId, useState } from "react";
import type { FormsType } from "@/app/data/business/user/forms/get-forms";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

const columns: ColumnDef<FormsType>[] = [
	{
		id: "title",
		header: "Title",
		accessorKey: "title",
		cell: ({ row }) => (
			<div className="flex flex-col gap-1">
				<div className="font-medium truncate">{row.getValue("title")}</div>
				{row.original.description && (
					<div className="max-w-xs text-sm truncate text-muted-foreground">
						{row.original.description}
					</div>
				)}
			</div>
		),
		sortUndefined: "last",
		sortDescFirst: false,
	},
	{
		id: "type",
		header: "Type",
		accessorKey: "isTemplate",
		cell: ({ row }) => (
			<Badge variant={row.original.isTemplate ? "outline" : "primary"}>
				{row.original.isTemplate ? "Template" : "Form"}
			</Badge>
		),
	},
	{
		id: "questions",
		header: "Questions",
		accessorKey: "questionsCount",
		cell: ({ row }) => (
			<div className="text-center">{row.original.questions.length}</div>
		),
	},
	{
		id: "shops",
		header: "Shops",
		accessorKey: "shopsCount",
		cell: ({ row }) => (
			<div className="text-center">{row.original.shops.length}</div>
		),
	},
	{
		id: "createdAt",
		header: "Created",
		accessorKey: "createdAt",
		cell: ({ row }) => {
			const date = row.getValue("createdAt") as Date;
			return <div className="text-sm">{date.toLocaleDateString()}</div>;
		},
	},
	{
		id: "updatedAt",
		header: "Updated",
		accessorKey: "updatedAt",
		cell: ({ row }) => {
			const date = row.getValue("updatedAt") as Date;
			return <div className="text-sm">{date.toLocaleDateString()}</div>;
		},
	},
	{
		id: "actions",
		header: "",
		cell: ({ row }) => (
			<div className="flex items-center justify-end gap-2">
				<Button
					size="sm"
					variant="ghost"
					className="w-8 h-8 p-0"
					onClick={() => handleEdit(row.original.id)}
				>
					<EditIcon className="w-4 h-4" />
					<span className="sr-only">Edit form</span>
				</Button>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button size="sm" variant="ghost" className="w-8 h-8 p-0">
							<MoreHorizontalIcon className="w-4 h-4" />
							<span className="sr-only">Open menu</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem
							onClick={() => handleEdit(row.original.id)}
							className="cursor-pointer"
						>
							<EditIcon className="w-4 h-4 mr-2" />
							Edit
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => handleDelete(row.original.id)}
							variant="destructive"
							className="cursor-pointer"
						>
							<TrashIcon className="w-4 h-4 mr-2" />
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		),
	},
];

// Mock action handlers
const handleEdit = (formId: string) => {
	console.log("Edit form:", formId);
	// TODO: Navigate to edit form page
};

const handleDelete = (formId: string) => {
	console.log("Delete form:", formId);
	// TODO: Show confirmation dialog and delete form
};

type FormListProps = {
	forms: FormsType[]; // TODO: use prisma return type
};

export default function FormsList({ forms }: FormListProps) {
	const [data, setData] = useState<FormsType[]>(forms);
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnOrder, setColumnOrder] = useState<string[]>(
		columns.map((column) => column.id as string),
	);

	const table = useReactTable({
		data,
		columns,
		columnResizeMode: "onChange",
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onSortingChange: setSorting,
		state: {
			sorting,
			columnOrder,
		},
		onColumnOrderChange: setColumnOrder,
		enableSortingRemoval: false,
	});

	// reorder columns after drag & drop
	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;
		if (active && over && active.id !== over.id) {
			setColumnOrder((columnOrder) => {
				const oldIndex = columnOrder.indexOf(active.id as string);
				const newIndex = columnOrder.indexOf(over.id as string);
				return arrayMove(columnOrder, oldIndex, newIndex); //this is just a splice util
			});
		}
	}

	const sensors = useSensors(
		useSensor(MouseSensor, {}),
		useSensor(TouchSensor, {}),
		useSensor(KeyboardSensor, {}),
	);

	return (
		<DndContext
			id={useId()}
			collisionDetection={closestCenter}
			modifiers={[restrictToHorizontalAxis]}
			onDragEnd={handleDragEnd}
			sensors={sensors}
		>
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id} className="bg-muted/50">
							<SortableContext
								items={columnOrder}
								strategy={horizontalListSortingStrategy}
							>
								{headerGroup.headers.map((header) => (
									<DraggableTableHeader key={header.id} header={header} />
								))}
							</SortableContext>
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && "selected"}
							>
								{row.getVisibleCells().map((cell) => (
									<SortableContext
										key={cell.id}
										items={columnOrder}
										strategy={horizontalListSortingStrategy}
									>
										<DragAlongCell key={cell.id} cell={cell} />
									</SortableContext>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								No forms found.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</DndContext>
	);
}

const DraggableTableHeader = ({
	header,
}: {
	header: Header<FormsType, unknown>;
}) => {
	const {
		attributes,
		isDragging,
		listeners,
		setNodeRef,
		transform,
		transition,
	} = useSortable({
		id: header.column.id,
	});

	const style: CSSProperties = {
		opacity: isDragging ? 0.8 : 1,
		position: "relative",
		transform: CSS.Translate.toString(transform),
		transition,
		whiteSpace: "nowrap",
		width: header.column.getSize(),
		zIndex: isDragging ? 1 : 0,
	};

	return (
		<TableHead
			ref={setNodeRef}
			className="relative h-10 border-t before:bg-border before:absolute before:inset-y-0 before:start-0 before:w-px first:before:bg-transparent"
			style={style}
			aria-sort={
				header.column.getIsSorted() === "asc"
					? "ascending"
					: header.column.getIsSorted() === "desc"
						? "descending"
						: "none"
			}
		>
			<div className="flex items-center justify-start gap-0.5">
				{header.column.id !== "actions" && (
					<Button
						size="icon"
						variant="foreground"
						className="-ml-2 shadow-none size-7 hover:cursor-grab active:cursor-grabbing"
						{...attributes}
						{...listeners}
						aria-label="Drag to reorder"
					>
						<GripVerticalIcon
							className="opacity-60"
							size={16}
							aria-hidden="true"
						/>
					</Button>
				)}
				<span className="truncate grow">
					{header.isPlaceholder
						? null
						: flexRender(header.column.columnDef.header, header.getContext())}
				</span>
				{header.column.getCanSort() && (
					<Button
						size="icon"
						variant="foreground"
						className="-mr-1 shadow-none group size-7"
						onClick={header.column.getToggleSortingHandler()}
						onKeyDown={(e) => {
							// Enhanced keyboard handling for sorting
							if (
								header.column.getCanSort() &&
								(e.key === "Enter" || e.key === " ")
							) {
								e.preventDefault();
								header.column.getToggleSortingHandler()?.(e);
							}
						}}
					>
						{{
							asc: (
								<ChevronUpIcon
									className="shrink-0 opacity-60"
									size={16}
									aria-hidden="true"
								/>
							),
							desc: (
								<ChevronDownIcon
									className="shrink-0 opacity-60"
									size={16}
									aria-hidden="true"
								/>
							),
						}[header.column.getIsSorted() as string] ?? (
							<ChevronUpIcon
								className="opacity-0 shrink-0 group-hover:opacity-60"
								size={16}
								aria-hidden="true"
							/>
						)}
					</Button>
				)}
			</div>
		</TableHead>
	);
};

const DragAlongCell = ({ cell }: { cell: Cell<FormsType, unknown> }) => {
	const { isDragging, setNodeRef, transform, transition } = useSortable({
		id: cell.column.id,
	});

	const style: CSSProperties = {
		opacity: isDragging ? 0.8 : 1,
		position: "relative",
		transform: CSS.Translate.toString(transform),
		transition,
		width: cell.column.getSize(),
		zIndex: isDragging ? 1 : 0,
	};

	return (
		<TableCell ref={setNodeRef} className="truncate" style={style}>
			{flexRender(cell.column.columnDef.cell, cell.getContext())}
		</TableCell>
	);
};
