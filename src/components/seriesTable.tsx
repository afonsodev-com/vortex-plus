// SeriesTable.tsx
import Image from "next/image"
import { MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Series {
  id: string;
  title?: string;
  subtitle?: string;
  year?: number;
  rating?: number;
  posterUrl?: string;
  description?: string;
  category?: string;
  trailerUrl?: string;
  videoUrl?: string;
}

interface SeriesTableProps {
  series: Series[];
  onDelete: (id: string) => void;
}

export const SeriesTable: React.FC<SeriesTableProps> = ({ series, onDelete }) => {
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="hidden w-auto sm:table-cell">Poster</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Subtitle</TableHead>
          <TableHead>Year</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Categories</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {series.map((serie, index) => (
          <TableRow key={serie.id}>
            <TableCell className="hidden w-auto sm:table-cell">
              <Image
                alt="Serie poster"
                className="aspect-square rounded-md object-cover"
                height="54"
                width="54"
                src={serie.posterUrl || '/placeholder.png'}
              />
            </TableCell>
            <TableCell className="font-medium w-auto">{serie.title}</TableCell>
            <TableCell className="w-auto">{serie.subtitle}</TableCell>
            <TableCell className="w-auto">{serie.year}</TableCell>
            <TableCell className="w-auto"><Badge variant="default">{serie.rating}</Badge></TableCell>
            <TableCell className="w-auto">{serie.description}</TableCell>
            <TableCell className="w-auto"><Badge variant="default">{serie.category}</Badge></TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDelete(serie.id)}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};