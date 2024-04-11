"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Cookie from "js-cookie";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [userEmail, setUserEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [userImage, setUserImage] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserEmail(user.email);

        const userDoc = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDoc);

        if (userDocSnap.exists()) {
          setUsername(userDocSnap.data().username);
          setUserImage(userDocSnap.data().image);
        } else {
          console.log("No such document!");
        }
      } else {
        setUserEmail(null);
        setUsername(null);
        setUserImage(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    Cookie.remove("token");
    router.push("/login");
  };

  const pathnames = pathname.split("/").filter((x) => x);

  return (
    <header className="flex h-12 items-center gap-4 border-0 bg-muted/40 px-6 sm:static sm:h-auto sm:bg-muted/40 sm:gap-4 sm:pt-3">
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          {pathnames.map((value, index) => {
            const breadcrumbLink = `/${pathnames
              .slice(0, index + 1)
              .join("/")}`;

            return (
              <BreadcrumbItem key={breadcrumbLink}>
                <BreadcrumbLink asChild>
                  <Link href={breadcrumbLink}>{value}</Link>
                </BreadcrumbLink>
                {index < pathnames.length - 1 && <BreadcrumbSeparator />}
              </BreadcrumbItem>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full h-8 rounded bg-background pl-8 md:w-[200px] lg:w-[320px]"
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <Avatar>
              <AvatarImage src={userImage || "https://github.com/shadcn.png"} />
              <AvatarFallback>{username ? username[0] : 'CN'}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{username ? username : 'My Account'}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem><Link href="/analytics">Analytics</Link></DropdownMenuItem>
          <DropdownMenuItem><Link href="/settings">Settings</Link></DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}