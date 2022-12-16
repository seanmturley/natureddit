import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    postIds: [
      "zmjk77",
      "zmoi8j",
      "zmuyq8",
      "zmadh6",
      "zlxeta",
      "zmaq65",
      "zm0ii7",
      "zmmnqt"
    ],
    posts: {
      zmjk77: {
        title: "Frosty forest, Bavaria, Germany [4000x6000][OC]",
        subreddit: "r/EarthPorn",
        score: 12498,
        created: 1671106171.0,
        description: "Shows the Silver Award... and that's it.",
        id: "zmjk77",
        author: "guytakingpictures",
        num_comments: 93,
        permalink:
          "/r/EarthPorn/comments/zmjk77/frosty_forest_bavaria_germany_4000x6000oc/",
        image: "https://i.redd.it/3ybrptauy16a1.jpg"
      },
      zmoi8j: {
        title:
          "Devil's Bathtub in Duffield, Virginia. 7/4/21. [4032x3024] [OC]",
        subreddit: "r/EarthPorn",
        score: 1489,
        created: 1671119745.0,
        description: "Thank you stranger. Shows the award.",
        id: "zmoi8j",
        author: "Berryfly04",
        num_comments: 52,
        permalink:
          "/r/EarthPorn/comments/zmoi8j/devils_bathtub_in_duffield_virginia_7421/",
        image: "https://i.redd.it/74juurzyk46a1.jpg"
      },
      zmuyq8: {
        title: "White Pyramid, Antarctica[OC][1080x1080]",
        subreddit: "r/EarthPorn",
        score: 283,
        created: 1671135588.0,
        description: "C'est magnifique",
        id: "zmuyq8",
        author: "justerikfotos",
        num_comments: 10,
        permalink:
          "/r/EarthPorn/comments/zmuyq8/white_pyramid_antarcticaoc1080x1080/",
        image: "https://i.redd.it/78orcr1he46a1.jpg"
      },
      zmadh6: {
        title:
          "Misty morning in Grand Teton National Park, Wyoming [OC][1638x2048]",
        subreddit: "r/EarthPorn",
        score: 2511,
        created: 1671073323.0,
        description: "Thank you stranger. Shows the award.",
        id: "zmadh6",
        author: "Rob_Phillips_Photo",
        num_comments: 13,
        permalink:
          "/r/EarthPorn/comments/zmadh6/misty_morning_in_grand_teton_national_park/",
        image: "https://i.redd.it/p9iwtr3yq06a1.jpg"
      },
      zlxeta: {
        title: "Snowy river,Latvia,Salacgriva [1440x1800] [OC]",
        subreddit: "r/EarthPorn",
        score: 73,
        created: 1671139493.0,
        description: "When you come across a feel-good thing.",
        id: "zlxeta",
        author: "benunfairchild",
        num_comments: 267,
        permalink:
          "/r/EarthPorn/comments/zlxeta/four_peaks_east_of_phoenix_arizona_7671x5117oc/",
        image: "https://i.redd.it/dsdfdq2kiw5a1.jpg"
      },
      zmaq65: {
        title: "Fresh Snow on Zoa Peak, BC, Canada [OC] [3024x4032]",
        subreddit: "r/EarthPorn",
        score: 63,
        created: 1671136880.0,
        description: "Shows the Silver Award... and that's it.",
        id: "zmaq65",
        author: "michaelfoosh",
        num_comments: 9,
        permalink:
          "/r/EarthPorn/comments/zmaq65/a_thin_layer_of_fog_danced_around_the_reflection/",
        image: "https://i.redd.it/mp57og33u06a1.jpg"
      },
      zm0ii7: {
        title:
          "Lush Green Mountains in the Icelandic Highlands [2819x3524][OC] IG:isleifureli",
        subreddit: "r/EarthPorn",
        score: 1953,
        created: 1671047755.0,
        description: "When you come across a feel-good thing.",
        id: "zm0ii7",
        author: "ImportantCalendar8",
        num_comments: 24,
        permalink:
          "/r/EarthPorn/comments/zm0ii7/lush_green_mountains_in_the_icelandic_highlands/",
        image: "https://i.redd.it/yq4y6dlj4x5a1.png"
      },
      zmmnqt: {
        title: "Sunrise, Nugget Point, New Zealand [6287 X 4192] [OC]",
        subreddit: "r/EarthPorn",
        score: 60,
        created: 1671115181.0,
        description: null,
        id: "zmmnqt",
        author: "tvdisko",
        num_comments: 1,
        permalink:
          "/r/EarthPorn/comments/zmmnqt/sunrise_nugget_point_new_zealand_6287_x_4192_oc/",
        image: "https://i.redd.it/7ej6dkulp26a1.jpg"
      }
    }
  },
  reducers: {}
});

export const selectPostIds = (state) => state.posts.postIds;
export const selectPosts = (state) => state.posts.posts;

export default postsSlice.reducer;
