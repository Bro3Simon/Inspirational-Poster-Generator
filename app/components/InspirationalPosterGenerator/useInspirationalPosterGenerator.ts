import { useState } from "react";

import { IMAGES } from "app/data/images";
import { QUOTES } from "app/data/quotes";

export function useInspirationalPosterGenerator() {
  const [image, setImage] = useState<(typeof IMAGES)[0]>();
  const [quote, setQuote] = useState<(typeof QUOTES)[0]>();
  const [isFadingIn, setIsFadingIn] = useState(true);

  function handleClickNewPoster() {
    setIsFadingIn(false);
  }

  function fadeBackIn() {
    setIsFadingIn(true);
  }

  function buildNewInspirationalPoster() {
    let randomImage = IMAGES[computeRandomIndex(IMAGES)];
    let randomQuote = QUOTES[computeRandomIndex(QUOTES)];

    // Make sure the same image isn't used twice in a row.
    while (randomImage.source === image?.source) {
      randomImage = IMAGES[computeRandomIndex(IMAGES)];
    }

    // Make sure the same quote isn't used twice in a row.
    while (randomQuote.author === quote?.author) {
      randomQuote = QUOTES[computeRandomIndex(QUOTES)];
    }

    setImage(randomImage);
    setQuote(randomQuote);
  }

  function computeRandomIndex<T>(array: T[]) {
    return Math.floor(Math.random() * array.length);
  }

  return {
    buildNewInspirationalPoster,
    fadeBackIn,
    handleClickNewPoster,
    image,
    isFadingIn,
    quote,
  };
}
