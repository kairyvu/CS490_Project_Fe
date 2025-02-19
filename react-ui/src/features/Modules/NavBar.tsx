import { Link, To, useNavigate } from "react-router-dom";
import Logo from "../../assets/icon.svg";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import React, { useState, useEffect } from "react";

import { cn } from "@/lib/utils";

const NavBar = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setVisible(currentScrollY < lastScrollY || currentScrollY < 10);

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleClick = (route: To) => {
    navigate(route);
  };
  return (
    <div
      className={`w-full fixed flex z-100 justify-between px-8 h-12 bg-linear-to-r from-black to-blue-300 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div
        className="flex items-center gap-6 hover:cursor-pointer"
        onClick={() => handleClick("/")}
      >
        <img src={Logo} className="size-8 rounded-full" />
        <div className="font-grench text-3xl text-yellow-600">Sakila</div>
      </div>
      <NavigationMenu>
        <NavigationMenuList className="gap-8">
          <Link to="/films">
            <NavigationMenuLink
              className={`${navigationMenuTriggerStyle()} bg-transparent`}
            >
              Films
            </NavigationMenuLink>
          </Link>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent">
              Customers
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[120px] gap-3 p-4 md:w-[240px] md:grid-cols-1 lg:w-[250px]">
                <ListItem
                  key="Customers"
                  title="Customers"
                  href={"/customers"}
                />
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

const ListItem = React.forwardRef<
  React.ComponentRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

export default NavBar;
