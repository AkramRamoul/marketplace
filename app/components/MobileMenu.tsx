"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { links } from "./NavbarLinks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

function MobileMenu() {
  const path = usePathname();
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu className="w-4 h-4" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Link Menu</SheetTitle>
            <SheetDescription>Navigate to screen</SheetDescription>
          </SheetHeader>
          <div className="mt-5 flex px-2 space-y-1 flex-col">
            {links.map((link) => (
              <Link
                href={link.href}
                key={link.id}
                className={cn(
                  path === link.href
                    ? "bg-muted"
                    : "hover:bg-muted hover:bg-opacity-75",
                  "grpup flex items-center px-2 py-2 font-medium rounded-md"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileMenu;
