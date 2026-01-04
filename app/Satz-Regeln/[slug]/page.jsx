import { Box } from "@mui/material";
import classess from "./page.module.css";
import { fetchDataSatz } from "@/lib/Deutsch";

export default async function SatzSlug({ params }) {
  const { slug } = await params;
  const id = Number(slug) + 1;
  const FetchDataSatz = fetchDataSatz(id);
  if (!FetchDataSatz) {
    return <Box>Nothing</Box>;
  }
  return (
    <Box
      className={classess.SatzSlug}
      dangerouslySetInnerHTML={{ __html: FetchDataSatz.text || "" }}
    />
  );
}
