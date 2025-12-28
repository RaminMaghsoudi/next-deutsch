import { Box } from "@mui/material";
import classess from "./page.module.css";

export default async function SatzSlug({ params }) {
  const { slug } = await params;
  return <Box className={classess.SatzSlug}></Box>;
}
