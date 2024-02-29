"use client";

import { Box, Button, Fade, Paper, Typography } from "@mui/material";
import Image from "next/image";

import { useInspirationalPosterGenerator } from "app/components/InspirationalPosterGenerator/useInspirationalPosterGenerator";

export const QUOTE_TEST_ID = "quote";
export const AUTHOR_TEST_ID = "author";
const xsSize = 300;
const smSize = 500;
const mdSize = 700;
const imageWidths = { md: mdSize, sm: smSize, xs: xsSize };

export function InspirationalPosterGenerator() {
  const {
    buildNewInspirationalPoster: handleEnter,
    fadeBackIn: handleExit,
    handleClickNewPoster,
    image,
    isFadingIn,
    quote,
  } = useInspirationalPosterGenerator();

  return (
    <Fade
      in={isFadingIn}
      onEnter={handleEnter}
      onExited={handleExit}
      timeout={1000}
    >
      <Paper>
        <Box
          borderRadius="1% 1% 0 0"
          display="flex"
          flexDirection="column"
          height={{ md: mdSize / 1.5, sm: smSize / 1.5, xs: xsSize / 1.5 }}
          overflow="hidden"
          position="relative"
          width={imageWidths}
        >
          {image ? (
            <Image
              alt={image.title}
              fill
              priority
              sizes={`(min-width: 600px) ${smSize}px, (min-width: 900px) ${mdSize}px, ${xsSize}px`}
              src={image.source.src}
              style={{
                objectFit: "cover",
              }}
            />
          ) : null}
        </Box>

        <Box bgcolor="darkgoldenrod" pt={0} px={0} width={imageWidths}>
          <Typography
            component="blockquote"
            data-testid={QUOTE_TEST_ID}
            px={2}
            py={1}
            textAlign="center"
          >
            {quote?.text}

            <Box component="footer" display="flex" justifyContent="center">
              <Typography
                component="cite"
                data-testid={AUTHOR_TEST_ID}
                textAlign="center"
              >
                ~ {quote?.author}
              </Typography>
            </Box>
          </Typography>
        </Box>

        <Box display="flex" justifyContent="center" py={1}>
          <Button
            disabled={!isFadingIn}
            onClick={handleClickNewPoster}
            variant="contained"
          >
            New Poster
          </Button>
        </Box>
      </Paper>
    </Fade>
  );
}
