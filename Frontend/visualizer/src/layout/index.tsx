import { styled } from "@mui/material";
import { Fragment } from "react";
import Header from "./Header";

interface Props {
  children: React.ReactElement;
}
const MainContentWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(3, 1, 9, 1),
  marginLeft: 0,
  height: "100%",
  transition: "margin-left 300ms ease",

  [theme.breakpoints.up("xsm")]: {
    padding: theme.spacing(5, 4, 4, 4),
  },
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(5, 2, 4, 2),
  },
  [theme.breakpoints.up("lg")]: {
    padding: theme.spacing(5, 4, 4, 4),
  },
}));
export default function Layout(props: Props) {
  const { children } = props;
  return (
    <Fragment>
      <Header />
      <MainContentWrapper>{children}</MainContentWrapper>
    </Fragment>
  );
}
