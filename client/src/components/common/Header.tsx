import { site } from "@/config/site";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <div className="container">
      <Navbar shouldHideOnScroll maxWidth="full">
        <NavbarBrand>
          <Link href="/">
            <Image src="/logo.png" alt="logo" width={120} height={120} />
          </Link>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex sm:gap-6" justify="center">
          {site.mainNav.map(({ id, title, href }) => (
            <NavbarItem key={id}>
              <Link href={href}>{title}</Link>
            </NavbarItem>
          ))}
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Link href="/auth/login">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              color="primary"
              href="/auth/register"
              variant="flat"
            >
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  );
}
