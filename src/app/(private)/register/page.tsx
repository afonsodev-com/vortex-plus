'use client'
import Image from "next/image"
import { MoviesModal } from "@/components/moviesModal"
import { SeriesModal } from "@/components/seriesModal"
import { MoviesTable } from "@/components/moviesTable"
import { SeriesTable } from "@/components/seriesTable"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, onSnapshot, doc, deleteDoc } from 'firebase/firestore';

export default function Register() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [series, setSeries] = useState<Series[]>([]);

  useEffect(() => {
    const moviesCollection = collection(db, 'movies');
    const seriesCollection = collection(db, 'series');
    
    const unsubscribeMovies = onSnapshot(moviesCollection, (snapshot) => {
      const moviesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), isFeatured: doc.data().isFeatured || false } as Movie));
      setMovies(moviesData);
    });

    const unsubscribeSeries = onSnapshot(seriesCollection, (snapshot) => {
      const seriesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), isFeatured: doc.data().isFeatured || false, episodes: doc.data().episodes || [] // Adicione esta linha
      } as Series));
      setSeries(seriesData);
    });

    return () => {
      unsubscribeMovies();
      unsubscribeSeries();
    };
  }, []);

  const deleteMovie = async (id: string) => {
    const movieRef = doc(db, 'movies', id);
    await deleteDoc(movieRef);
  }

  const deleteSeries = async (id: string) => {
    const seriesRef = doc(db, 'series', id);
    await deleteDoc(seriesRef);
  }

  return (
    <div className="flex h-full w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="movies">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="movies">Movies</TabsTrigger>
                <TabsTrigger value="series">Series</TabsTrigger>
              </TabsList>
              <TabsContent className="mt-0" value="movies">
                <MoviesModal />
              </TabsContent>
              <TabsContent className="mt-0" value="series">
                <SeriesModal />
              </TabsContent>
            </div>
            <TabsContent value="movies">
              <Card x-chunk="dashboard-06-chunk-1">
                <CardHeader>
                  <CardTitle>Movies</CardTitle>
                  <CardDescription>
                    Manage your movies and view their details.
                  </CardDescription>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                  <MoviesTable movies={movies} onDelete={deleteMovie} />
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    movies
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="series">
              <Card x-chunk="dashboard-06-chunk-1">
                <CardHeader>
                  <CardTitle>Series</CardTitle>
                  <CardDescription>
                    Manage your series and view their details.
                  </CardDescription>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                  <SeriesTable series={series} onDelete={deleteSeries} />
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    series
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}