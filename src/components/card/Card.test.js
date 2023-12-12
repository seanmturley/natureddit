import React from "react";

import Card from "./Card";

import { screen } from "@testing-library/react";

import { setupWithRouting } from "../../testingUtilities";

const cardExample = {
  title:
    "One of the more bizarre formations I've found, Canyonlands, UT, USA [OC][5436x3624]",
  subreddit_name_prefixed: "r/EarthPorn",
  // score: 3539,
  created: 1702304828,
  preview: {
    images: [
      {
        source: {
          url: "https://preview.redd.it/hazlrpu8eo5c1.jpeg?auto=webp&amp;s=c4bf9938d47c4da597c01886dd34bf7f592046ac",
          width: 5436,
          height: 3624
        },
        resolutions: [
          {
            url: "https://preview.redd.it/hazlrpu8eo5c1.jpeg?width=108&amp;crop=smart&amp;auto=webp&amp;s=59ceccf2f0a03db34f3791610471e958e6d5bde6",
            width: 108,
            height: 72
          },
          {
            url: "https://preview.redd.it/hazlrpu8eo5c1.jpeg?width=216&amp;crop=smart&amp;auto=webp&amp;s=943be2cdb772e0d0c249429e144b7ae751767506",
            width: 216,
            height: 144
          },
          {
            url: "https://preview.redd.it/hazlrpu8eo5c1.jpeg?width=320&amp;crop=smart&amp;auto=webp&amp;s=379f570c08b7f6272863ac6aa7afe951faea7483",
            width: 320,
            height: 213
          },
          {
            url: "https://preview.redd.it/hazlrpu8eo5c1.jpeg?width=640&amp;crop=smart&amp;auto=webp&amp;s=c27b1fce28e84e20a4763dad9a4fc441550ddf88",
            width: 640,
            height: 426
          },
          {
            url: "https://preview.redd.it/hazlrpu8eo5c1.jpeg?width=960&amp;crop=smart&amp;auto=webp&amp;s=867895efa4cc9f746a4a6208d00e3c3765ea1c3a",
            width: 960,
            height: 640
          },
          {
            url: "https://preview.redd.it/hazlrpu8eo5c1.jpeg?width=1080&amp;crop=smart&amp;auto=webp&amp;s=d2fe2b2d823665bdefa1188c48d25ee56375b7b9",
            width: 1080,
            height: 720
          }
        ],
        variants: {},
        id: "c6y2IGIjBhgRNW7vzzx8Tf9hKRrA9HAmHjp7DLNvS9o"
      }
    ],
    enabled: true
  },
  author: "pycckuu_brady",
  // num_comments: 63,
  permalink:
    "/r/EarthPorn/comments/18fvqi4/one_of_the_more_bizarre_formations_ive_found/"
};

const subredditDefaultRoute = "/r/EarthPorn/hot";
const subredditRoutes = (options) => {
  const num_comments = options?.num_comments ?? 63;
  const score = options?.score ?? 3539;

  return [
    {
      path: "/r/:subreddit/:sortFilter",
      element: (
        <Card
          card={{ ...cardExample, num_comments: num_comments, score: score }}
        />
      )
    }
  ];
};
const subredditInitialEntries = [subredditDefaultRoute];

const searchBaseRoute = "/search";
const searchDefaultRoute = `${searchBaseRoute}?q=EarthPorn&sort=relevance&t=all`;
const searchRoutes = [
  {
    path: searchBaseRoute,
    element: <Card card={cardExample} />
  }
];
const searchInitialEntries = [searchDefaultRoute];

describe("On subreddit pages Card should display", () => {
  it("the post's title", () => {
    setupWithRouting(subredditRoutes(), subredditInitialEntries);

    const title = screen.queryByRole("heading", { name: cardExample.title });
    expect(title).toBeInTheDocument();
  });

  it("the post's author", () => {
    setupWithRouting(subredditRoutes(), subredditInitialEntries);

    const author = screen.queryByText(`u/${cardExample.author}`);
    expect(author).toBeInTheDocument();
  });
});

describe("Card should display the number of comments", () => {
  it("when there are 0 comments", () => {
    const num_comments = 0;
    setupWithRouting(
      subredditRoutes({ num_comments: num_comments }),
      subredditInitialEntries
    );

    const commentsText = screen.queryByText(`${num_comments} comments`);
    expect(commentsText).toBeInTheDocument();
  });

  it("unaltered when there are <1000 comments", () => {
    const num_comments = 999;
    setupWithRouting(
      subredditRoutes({ num_comments: num_comments }),
      subredditInitialEntries
    );

    const commentsText = screen.queryByText(`${num_comments} comments`);
    expect(commentsText).toBeInTheDocument();
  });

  it("abbreviated with a 'k' suffix and 1 dp for 1000s of comments", () => {
    const num_comments = 4675;
    setupWithRouting(
      subredditRoutes({ num_comments: num_comments }),
      subredditInitialEntries
    );

    const commentsText = screen.queryByText("4.7k comments");
    expect(commentsText).toBeInTheDocument();
  });

  it("abbreviated with n 'm' suffix and 1 dp for millions of comments", () => {
    const num_comments = 4675000;
    setupWithRouting(
      subredditRoutes({ num_comments: num_comments }),
      subredditInitialEntries
    );

    const commentsText = screen.queryByText("4.7m comments");
    expect(commentsText).toBeInTheDocument();
  });
});

describe("Card should display the number of upvotes", () => {
  it("when there are 0 upvotes", () => {
    const score = 0;
    setupWithRouting(
      subredditRoutes({ score: score }),
      subredditInitialEntries
    );

    const upvotesText = screen.queryByText(`${score} upvotes`);
    expect(upvotesText).toBeInTheDocument();
  });

  it("unaltered when there are <1000 upvotes", () => {
    const score = 999;
    setupWithRouting(
      subredditRoutes({ score: score }),
      subredditInitialEntries
    );

    const upvotesText = screen.queryByText(`${score} upvotes`);
    expect(upvotesText).toBeInTheDocument();
  });

  it("abbreviated with a 'k' suffix and 1 dp for 1000s of upvotes", () => {
    const score = 4675;
    setupWithRouting(
      subredditRoutes({ score: score }),
      subredditInitialEntries
    );

    const upvotesText = screen.queryByText("4.7k upvotes");
    expect(upvotesText).toBeInTheDocument();
  });

  it("abbreviated with n 'm' suffix and 1 dp for millions of upvotes", () => {
    const score = 4675000;
    setupWithRouting(
      subredditRoutes({ score: score }),
      subredditInitialEntries
    );

    const upvotesText = screen.queryByText("4.7m upvotes");
    expect(upvotesText).toBeInTheDocument();
  });
});

describe("On the homepage and search pages Card should display", () => {
  it("the post's subreddit", () => {
    setupWithRouting(searchRoutes, searchInitialEntries);

    const subreddit = screen.queryByText(
      `${cardExample.subreddit_name_prefixed}`
    );
    expect(subreddit).toBeInTheDocument();
  });
});
