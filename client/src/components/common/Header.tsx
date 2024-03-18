import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import Link from "next/link";

export function Header() {
  return (
    <div className="container">
      <Navbar shouldHideOnScroll maxWidth="full">
        <NavbarBrand>
          <Link href="/" className="font-bold text-inherit">
            mFlix
          </Link>
        </NavbarBrand>
        <NavbarContent className="hidden gap-4 sm:flex" justify="center">
          <NavbarItem>
            <Link href="/">Features</Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="/">Customers</Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/">Integrations</Link>
          </NavbarItem>
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
