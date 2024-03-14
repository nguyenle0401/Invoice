import Link from "next/link";
import { styled } from "@mui/material";
import Image from "next/image";

const LinkStyled = styled(Link)(() => ({
  height: "40px",
  width: "200px",
  overflow: "hidden",
  display: "block",
}));

const Logo = () => {
  return (
    <LinkStyled href="/">
      <Image src="/images/logo.svg" alt="logo" height={40} width={200} priority />
    </LinkStyled>
  );
};

export default Logo;
