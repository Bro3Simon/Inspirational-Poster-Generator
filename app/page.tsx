import { Container } from "@mui/material";

import { InspirationalPosterGenerator } from "app/components/InspirationalPosterGenerator";

export default function Home() {
  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        justifyContent: "center",
      }}
    >
      <InspirationalPosterGenerator />
    </Container>
  );
}
