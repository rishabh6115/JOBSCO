import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { AlignJustify } from "lucide-react";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { fetchProfileAction } from "@/actions";

async function Header() {
  const user = await currentUser();
  const profileInfo = await fetchProfileAction(user?.id);
  const menuItems = [
    {
      label: "Home",
      path: "/",
      show: true,
    },
    {
      label: "Login",
      path: "/sign-in",
      show: !user,
    },
    {
      label: "Register",
      path: "/sign-up",
      show: !user,
    },
    {
      label: "Activity",
      path: "/activity",
      show: profileInfo?.role === "candidate",
    },
    {
      label: "Jobs",
      path: "/jobs",
      show: user,
    },
    {
      label: "Membership",
      path: "/membership",
      show: user,
    },
    {
      label: "Account",
      path: "/account",
      show: user,
    },
  ];

  return (
    <div>
      <header className="flex h-16 w-full shrink-0 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="lg:hidden">
              <AlignJustify className="h-6 w-6" />
              <span className="sr-only">Toogle Navigation Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Link href={"#"}>
              <h3>JOBSCO</h3>
            </Link>
            <div className="grid gap-2 py-6">
              {menuItems.map(
                (item, index) =>
                  item.show && (
                    <Link
                      href={item.path}
                      key={index}
                      className="flex w-full items-center py-2 text-lg font-semibold"
                    >
                      {item.label}
                    </Link>
                  )
              )}
            </div>
            <UserButton afterSignOutUrl="/" />
          </SheetContent>
        </Sheet>
        <Link className="hidden lg:flex mr-6" href={"#"}>
          JOBSCO
        </Link>
        <nav className="ml-auto hidden lg:flex gap-6">
          {menuItems.map(
            (item, index) =>
              item.show && (
                <Link
                  href={item.path}
                  key={index}
                  className="group inline-flex h-9 w-max items-center rounded-md bg-white px-4 py-2  text-sm font-medium"
                >
                  {item.label}
                </Link>
              )
          )}
        </nav>
        <span className="ml-5 hidden lg:flex">
          <UserButton afterSignOutUrl="/" />
        </span>
      </header>
    </div>
  );
}

export default Header;
