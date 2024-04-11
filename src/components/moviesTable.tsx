// MoviesTable.tsx
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

interface Movie {
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

interface MoviesTableProps {
  movies: Movie[];
  onDelete: (id: string) => void;
}

export const MoviesTable: React.FC<MoviesTableProps> = ({ movies, onDelete }) => {
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
        {movies.map((movie, index) => (
          <TableRow key={movie.id}>
            <TableCell className="hidden w-auto sm:table-cell">
              <Image
                alt="Movie poster"
                className="aspect-square rounded-md object-cover"
                height="54"
                width="54"
                src={movie.posterUrl || '/placeholder.png'}
              />
            </TableCell>
            <TableCell className="font-medium w-auto">{movie.title}</TableCell>
            <TableCell className="w-auto">{movie.subtitle}</TableCell>
            <TableCell className="w-auto">{movie.year}</TableCell>
            <TableCell className="w-auto"><Badge variant="default">{movie.rating}</Badge></TableCell>
            <TableCell className="w-auto">{movie.description}</TableCell>
            <TableCell className="w-auto"><Badge variant="default">{movie.category}</Badge></TableCell>
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
                  <DropdownMenuItem onClick={() => onDelete(movie.id)}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};