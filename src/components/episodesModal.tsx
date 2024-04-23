import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { db } from '../lib/firebase';
import { collection, addDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { useToast } from "@/components/ui/use-toast"
import { CheckCircle, PlusCircle } from 'lucide-react';


export function EpisodesModal({ episodes, setEpisodes, isOpen, setIsOpen, selectedSeries }: EpisodesModalProps) {
  const [episode, setEpisode] = useState<Episode>({ id: 0, season: 0, title: "", duration: "", poster: "", description: "", videoUrl: "" });
  const { toast } = useToast()

  const saveToFirestore = async () => {
    try {
      const seriesId = selectedSeries.id; // Use the ID of the selected series
      const seriesRef = doc(db, "series", seriesId);
      const seriesSnap = await getDoc(seriesRef);
  
      if (seriesSnap.exists()) {
        const seriesData = seriesSnap.data();
        let lastId = 0;
        if (seriesData.episodes && seriesData.episodes.length > 0) {
          lastId = seriesData.episodes.reduce((maxId: number, episode: { id: number; }) => Math.max(maxId, episode.id), 0);
        }
  
        // Gera um novo ID para cada episódio
        const newEpisodes = episodes.map((episode, index) => ({ ...episode, id: lastId + index + 1 }));
  
        seriesData.episodes = seriesData.episodes ? [...seriesData.episodes, ...newEpisodes] : [...newEpisodes];
  
        await updateDoc(seriesRef, seriesData);
      } else {
        console.log(`No series found with id: ${seriesId}`);
      }
  
      toast({
        title: "Sucesso!",
        description: (
          <div className="flex justify-between items-center">
            <span>
              Os episódios foram salvos com sucesso.
            </span>
            <CheckCircle className="ml-2 text-blue-500 " />
          </div>
        ),
      });
      setEpisodes([]);
    } catch (e: any) {
      console.error("Error adding document: ", e);
      toast({
        title: "Erro!",
        description: `Ocorreu um erro ao salvar os episódios: ${e.message}`,
        variant: "destructive",
      });
    }
  };

  const addEpisode = () => {
    if (!Array.isArray(episodes)) {
      console.error('Episodes is not an array:', episodes);
      return;
    }

    setEpisodes([...episodes, { ...episode, id: episodes.length + 1 }]);
    setEpisode({ id: 0, season: 0, title: "", duration: "", poster: "", description: "", videoUrl: "" });
  }

  const removeEpisode = (index: number) => {
    if (!Array.isArray(episodes)) {
      console.error('Episodes is not an array:', episodes);
      return;
    }

    const newEpisodes = [...episodes];
    newEpisodes.splice(index, 1);
    setEpisodes(newEpisodes);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className="p0">
        <Button className="h-6 px-0" variant="ghost">
          Add Episode
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Add Episode</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para cadastrar um novo episódio.
          </DialogDescription>
        </DialogHeader>
          <div className="grid grid-cols-4 gap-4 p-2">
            <div className="col-span-1">
              <Label htmlFor={`episode-season`}>Season</Label>
              <Input
                id={`episode-season`}
                value={episode.season}
                onChange={(e) => setEpisode({ ...episode, season: parseInt(e.target.value) })}
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor={`episode-title`}>Title</Label>
              <Input
                id={`episode-title`}
                value={episode.title}
                onChange={(e) => setEpisode({ ...episode, title: e.target.value })}
              />
            </div>
            <div className="col-span-1">
              <Label htmlFor={`episode-duration`}>Duration</Label>
              <Input
                id={`episode-duration`}
                value={episode.duration}
                onChange={(e) => setEpisode({ ...episode, duration: e.target.value })}
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor={`episode-poster`}>Poster</Label>
              <Input
                id={`episode-poster`}
                value={episode.poster}
                onChange={(e) => setEpisode({ ...episode, poster: e.target.value })}
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor={`episode-videoUrl`}>VideoUrl</Label>
              <Input
                id={`episode-videoUrl`}
                value={episode.videoUrl}
                onChange={(e) => setEpisode({ ...episode, videoUrl: e.target.value })}
              />
            </div>
            <div className="col-span-4">
              <Label htmlFor={`episode-description`}>Descrição</Label>
              <Textarea
                id={`episode-description`}
                value={episode.description}
                onChange={(e) => setEpisode({ ...episode, description: e.target.value })}
              />
            </div>
          </div>
          <Button
            type="button"
            size="sm"
            className="mt-2"
            onClick={addEpisode}
          >
            Add Episode
          </Button>
          <div className="max-h-[300px] overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/12">Season</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="w-1/12">Duration</TableHead>
                  <TableHead>Poster</TableHead>
                  <TableHead>VideoUrl</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {episodes && episodes.map((episode, index) => (
                  <TableRow key={index}>
                    <TableCell className="w-1/12 py-1 px-1">
                      <Label htmlFor={`season-${index}`} className="sr-only">Season</Label>
                      <Input className="h-7" id={`season-${index}`} type="text" defaultValue={episode.season} />
                    </TableCell>
                    <TableCell className="py-1 px-1">
                      <Label htmlFor={`title-${index}`} className="sr-only">Title</Label>
                      <Input className="h-7" id={`title-${index}`} type="text" defaultValue={episode.title} />
                    </TableCell>
                    <TableCell className="w-1/12 py-1 px-1">
                      <Label htmlFor={`duration-${index}`} className="sr-only">Duration</Label>
                      <Input className="h-7" id={`duration-${index}`} type="text" defaultValue={episode.duration} />
                    </TableCell>
                    <TableCell className="py-1 px-1">
                      <Label htmlFor={`poster-${index}`} className="sr-only">Poster</Label>
                      <Input className="h-7" id={`poster-${index}`} type="text" defaultValue={episode.poster} />
                    </TableCell>
                    <TableCell className="py-1 px-1">
                      <Label htmlFor={`videoUrl-${index}`} className="sr-only">videoUrl</Label>
                      <Input className="h-7" id={`videoUrl-${index}`} type="text" defaultValue={episode.videoUrl} />
                    </TableCell>
                    <TableCell className="py-1 px-1">
                      <Label htmlFor={`description-${index}`} className="sr-only">Description</Label>
                      <Input className="h-7" id={`description-${index}`} type="text" defaultValue={episode.description} />
                    </TableCell>
                    <TableCell className="py-1 px-1">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => removeEpisode(index)}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        <DialogFooter>
          <Button type="submit" onClick={saveToFirestore}>Save Episodes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}