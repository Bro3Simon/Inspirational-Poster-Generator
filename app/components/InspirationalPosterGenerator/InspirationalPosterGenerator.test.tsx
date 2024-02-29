/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { InspirationalPosterGenerator } from "app/components/InspirationalPosterGenerator";
import {
  AUTHOR_TEST_ID,
  QUOTE_TEST_ID,
} from "app/components/InspirationalPosterGenerator/InspirationalPosterGenerator";
import { Children } from "app/types/commonProps";

jest.mock("@mui/material", () => ({
  __esModule: true,
  ...jest.requireActual("@mui/material"),
  Fade: ({
    children,
    onEnter,
  }: {
    onEnter: () => void;
  } & Children) => {
    useEffect(() => {
      onEnter();
      setTimeout(() => {
        onEnter();
      });
    }, []);

    return <div>{children}</div>;
  },
}));

describe("test InspirationalPosterGenerator", () => {
  test("renders an image", () => {
    render(<InspirationalPosterGenerator />);

    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  test("renders a quote", () => {
    render(<InspirationalPosterGenerator />);

    expect(screen.getByTestId(QUOTE_TEST_ID).innerHTML).not.toHaveLength(0);
  });

  test("renders an author", () => {
    render(<InspirationalPosterGenerator />);

    expect(screen.getByTestId(AUTHOR_TEST_ID).innerHTML).not.toHaveLength(0);
  });

  test("renders the new poster button", () => {
    render(<InspirationalPosterGenerator />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("renders a different image, quote and author after clicking the new poster button", async () => {
    // TODO: This test didn't work after migrating to Next
    // Fade from MUI was mocked at the top of the file
    // Image changes automatically with a useEffect and setTimeout
    // not by button click
    // await user.click is used to give the setTimeout enough time to process

    const user = userEvent.setup();

    render(<InspirationalPosterGenerator />);

    const originalImageAltText = (screen.getByRole("img") as HTMLImageElement)
      .alt;
    const originalQuote = screen.getByTestId(QUOTE_TEST_ID).innerHTML;
    const originalAuthor = screen.getByTestId(AUTHOR_TEST_ID).innerHTML;

    await user.click(screen.getByRole("button"));

    const secondImageAltText = (screen.getByRole("img") as HTMLImageElement)
      .alt;
    const secondQuote = screen.getByTestId(QUOTE_TEST_ID).innerHTML;
    const secondAuthor = screen.getByTestId(AUTHOR_TEST_ID).innerHTML;

    expect(originalImageAltText).not.toEqual(secondImageAltText);
    expect(originalQuote).not.toEqual(secondQuote);
    expect(originalAuthor).not.toEqual(secondAuthor);
    jest.restoreAllMocks();
  });
});
