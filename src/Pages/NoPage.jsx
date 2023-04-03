import React, { useState, useEffect } from "react";
import ImgCard from "../Components/ImgCard";

import { Link, useParams } from "react-router-dom";

const NoPage = () => {
//   const id = 438631;
//   const [movieCastCrew, SetMovieCastCrew] = useState({});
//   const [streaming, setStreaming] = useState({});
//   const [userLocaction, setUserLocaction] = useState();
//   const [moviethemes, SetMovieThemes] = useState({});
//   const [currentBackdrop, setCurrentBackdrop] = useState({});
//   const [similarMovies, setSimilarMovies] = useState();
//   useEffect(() => {
//     fetch(
//       `https://api.themoviedb.org/3/movie/${id}/credits?api_key=87c98f2492b42f48b506b2d48f51461e`
//     )
//       .then((res) => res.json())
//       .then((json) => {
//         SetMovieCastCrew(json);
//         window.scrollTo(0, 0);
//       });
//   }, [id]);

//   useEffect(() => {
//     fetch(
//       `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=87c98f2492b42f48b506b2d48f51461e`
//     )
//       .then((res) => res.json())
//       .then((json) => {
//         setStreaming(json.results);
//         window.scrollTo(0, 0);
//         console.log(json.results);
//       });
//   }, [id]);

//   useEffect(() => {
//     fetch("https://ipapi.co/json/")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data.country_code);
//         setUserLocaction(data.country_code);
//       });
//   }, [id]);

//   useEffect(() => {
//     fetch(
//       `https://api.themoviedb.org/3/movie/${id}/keywords?api_key=87c98f2492b42f48b506b2d48f51461e`
//     )
//       .then((res) => res.json())
//       .then((json) => {
//         SetMovieThemes(json);
//         window.scrollTo(0, 0);
//       });
//   }, [id]);

//   useEffect(() => {
//     fetch(
//       `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=87c98f2492b42f48b506b2d48f51461e`
//     )
//       .then((res) => res.json())
//       .then((json) => {
//         setSimilarMovies(json.results);
//         window.scrollTo(0, 0);
//       });
//   }, [id]);

//   useEffect(() => {
//     fetch(
//       `https://api.themoviedb.org/3/movie/${id}?api_key=87c98f2492b42f48b506b2d48f51461e&append_to_response=videos,images&include_image_language=null`
//     )
//       .then((res) => res.json())
//       .then((json) => {
//         setCurrentBackdrop(json);
//         window.scrollTo(0, 0);
//       });
//   }, [id]);

//   const Details = {
//     image:
//       "https://www.themoviedb.org/t/p/original/dz4xJ2SiIK85EEcgArvXyo7HCvP.jpg",
//     title: "Dune",
//     runtime: 168,
//     year: "2021",
//     overview:
//       "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people. As malevolent forces explode into conflict over the planet's exclusive supply of the most precious resource in existence-a commodity capable of unlocking humanity's greatest potential-only those who can conquer their fear will survive.",
//     id: 438631,
//     // cast: [
//     //   {
//     //     adult: false,
//     //     gender: 2,
//     //     id: 1190668,
//     //     known_for_department: "Acting",
//     //     name: "Timothée Chalamet",
//     //     original_name: "Timothée Chalamet",
//     //     popularity: 7.531,
//     //     profile_path: "/7ejM0s3hMZSnfibIX7OWXeQmRo.jpg",
//     //     cast_id: 13,
//     //     character: "Paul Atreides",
//     //     credit_id: "5b4d01bac3a36823d803cd45",
//     //     order: 0,
//     //   },
//     //   {
//     //     adult: false,
//     //     gender: 1,
//     //     id: 933238,
//     //     known_for_department: "Acting",
//     //     name: "Rebecca Ferguson",
//     //     original_name: "Rebecca Ferguson",
//     //     popularity: 7.531,
//     //     profile_path: "/6NRlV9oUipeak7r00V6k73Jb7we.jpg",
//     //     cast_id: 14,
//     //     character: "Lady Jessica Atreides",
//     //     credit_id: "5b90742fc3a368222e002f41",
//     //     order: 1,
//     //   },
//     //   {
//     //     adult: false,
//     //     gender: 2,
//     //     id: 25072,
//     //     known_for_department: "Acting",
//     //     name: "Oscar Isaac",
//     //     original_name: "Oscar Isaac",
//     //     popularity: 31.385,
//     //     profile_path: "/dW5U5yrIIPmMjRThR9KT2xH6nTz.jpg",
//     //     cast_id: 53,
//     //     character: "Duke Leto Atreides",
//     //     credit_id: "5c50bc070e0a2612cccedcb3",
//     //     order: 2,
//     //   },
//     //   {
//     //     adult: false,
//     //     gender: 2,
//     //     id: 16851,
//     //     known_for_department: "Acting",
//     //     name: "Josh Brolin",
//     //     original_name: "Josh Brolin",
//     //     popularity: 34.236,
//     //     profile_path: "/sX2etBbIkxRaCsATyw5ZpOVMPTD.jpg",
//     //     cast_id: 73,
//     //     character: "Gurney Halleck",
//     //     credit_id: "5c64750d9251412fb4feec3e",
//     //     order: 3,
//     //   },
//     //   {
//     //     adult: false,
//     //     gender: 2,
//     //     id: 1640,
//     //     known_for_department: "Acting",
//     //     name: "Stellan Skarsgård",
//     //     original_name: "Stellan Skarsgård",
//     //     popularity: 21.276,
//     //     profile_path: "/x78BtYHElirO7Iw8bL4m8CnzRDc.jpg",
//     //     cast_id: 31,
//     //     character: "Baron Vladimir Harkonnen",
//     //     credit_id: "5c364b61c3a368273c1c5fee",
//     //     order: 4,
//     //   },
//     //   {
//     //     adult: false,
//     //     gender: 2,
//     //     id: 543530,
//     //     known_for_department: "Acting",
//     //     name: "Dave Bautista",
//     //     original_name: "Dave Bautista",
//     //     popularity: 42.256,
//     //     profile_path: "/snk6JiXOOoRjPtHU5VMoy6qbd32.jpg",
//     //     cast_id: 30,
//     //     character: "Beast Rabban Harkonnen",
//     //     credit_id: "5c342d10c3a36851f8b52ac9",
//     //     order: 5,
//     //   },
//     //   {
//     //     adult: false,
//     //     gender: 1,
//     //     id: 195666,
//     //     known_for_department: "Acting",
//     //     name: "Sharon Duncan-Brewster",
//     //     original_name: "Sharon Duncan-Brewster",
//     //     popularity: 4.738,
//     //     profile_path: "/av9gsJMlTnkzcRPyURBxAvlq9YX.jpg",
//     //     cast_id: 160,
//     //     character: "Dr. Liet Kynes",
//     //     credit_id: "5e37991c4ca676001252ea99",
//     //     order: 6,
//     //   },
//     // ],
//     // crew: [
//     //   {
//     //     adult: false,
//     //     gender: 2,
//     //     id: 12506,
//     //     known_for_department: "Writing",
//     //     name: "Frank Herbert",
//     //     original_name: "Frank Herbert",
//     //     popularity: 2.374,
//     //     profile_path: "/47UBMcq9toQzH0ZCvGQq2XeepN5.jpg",
//     //     credit_id: "58a0e7109251412b6a003c3e",
//     //     department: "Writing",
//     //     job: "Novel",
//     //   },
//     //   {
//     //     adult: false,
//     //     gender: 2,
//     //     id: 947,
//     //     known_for_department: "Sound",
//     //     name: "Hans Zimmer",
//     //     original_name: "Hans Zimmer",
//     //     popularity: 14.12,
//     //     profile_path: "/tpQnDeHY15szIXvpnhlprufz4d.jpg",
//     //     credit_id: "5c8fd3b69251410fe7a42229",
//     //     department: "Sound",
//     //     job: "Original Music Composer",
//     //   },
//     //   {
//     //     adult: false,
//     //     gender: 2,
//     //     id: 67113,
//     //     known_for_department: "Camera",
//     //     name: "Greig Fraser",
//     //     original_name: "Greig Fraser",
//     //     popularity: 5.331,
//     //     profile_path: "/cwj0aValmr7TGQ2OOQk5CAy1PWf.jpg",
//     //     credit_id: "5c080b760e0a2636ce118c46",
//     //     department: "Camera",
//     //     job: "Director of Photography",
//     //   },
//     //   {
//     //     adult: false,
//     //     gender: 2,
//     //     id: 137427,
//     //     known_for_department: "Directing",
//     //     name: "Denis Villeneuve",
//     //     original_name: "Denis Villeneuve",
//     //     popularity: 11.397,
//     //     profile_path: "/zdDx9Xs93UIrJFWYApYR28J8M6b.jpg",
//     //     credit_id: "58920db99251412dd10093b4",
//     //     department: "Directing",
//     //     job: "Director",
//     //   },
//     // ],
//     // keywords: [
//     //   {
//     //     id: 530,
//     //     name: "prophecy",
//     //   },
//     //   {
//     //     id: 818,
//     //     name: "based on novel or book",
//     //   },
//     //   {
//     //     id: 2280,
//     //     name: "emperor",
//     //   },
//     //   {
//     //     id: 2964,
//     //     name: "future",
//     //   },
//     //   {
//     //     id: 4565,
//     //     name: "dystopia",
//     //   },
//     //   {
//     //     id: 5789,
//     //     name: "sand",
//     //   },
//     //   {
//     //     id: 6074,
//     //     name: "spice",
//     //   },
//     //   {
//     //     id: 6092,
//     //     name: "army",
//     //   },
//     //   {
//     //     id: 6410,
//     //     name: "hallucinogen",
//     //   },
//     //   {
//     //     id: 6917,
//     //     name: "epic",
//     //   },
//     //   {
//     //     id: 9552,
//     //     name: "baron",
//     //   },
//     //   {
//     //     id: 9714,
//     //     name: "remake",
//     //   },
//     //   {
//     //     id: 9748,
//     //     name: "revenge",
//     //   },
//     //   {
//     //     id: 9882,
//     //     name: "space",
//     //   },
//     //   {
//     //     id: 10085,
//     //     name: "betrayal",
//     //   },
//     //   {
//     //     id: 10170,
//     //     name: "premonition",
//     //   },
//     //   {
//     //     id: 10202,
//     //     name: "treason",
//     //   },
//     //   {
//     //     id: 10489,
//     //     name: "water shortage",
//     //   },
//     //   {
//     //     id: 11195,
//     //     name: "empire",
//     //   },
//     //   {
//     //     id: 13031,
//     //     name: "creature",
//     //   },
//     //   {
//     //     id: 18034,
//     //     name: "desert",
//     //   },
//     //   {
//     //     id: 18109,
//     //     name: "knife fight",
//     //   },
//     //   {
//     //     id: 40850,
//     //     name: "destiny",
//     //   },
//     //   {
//     //     id: 158144,
//     //     name: "giant worm",
//     //   },
//     //   {
//     //     id: 161176,
//     //     name: "space opera",
//     //   },
//     //   {
//     //     id: 178080,
//     //     name: "sand dune",
//     //   },
//     //   {
//     //     id: 194063,
//     //     name: "messiah",
//     //   },
//     //   {
//     //     id: 240237,
//     //     name: "mother son relationship",
//     //   },
//     //   {
//     //     id: 250363,
//     //     name: "stereoscopic",
//     //   },
//     //   {
//     //     id: 286709,
//     //     name: "giant creature",
//     //   },
//     //   {
//     //     id: 299608,
//     //     name: "non-traditional casting",
//     //   },
//     // ],
//     // IN: {
//     //   link: "https://www.themoviedb.org/movie/438631-dune/watch?locale=IN",
//     //   flatrate: [
//     //     {
//     //       logo_path: "/emthp39XA2YScoYL1p0sdbAH2WA.jpg",
//     //       provider_id: 119,
//     //       provider_name: "Amazon Prime Video",
//     //       display_priority: 1,
//     //     },
//     //     {
//     //       logo_path: "/eXxCDzaz4F7bkkgkZ8p6AbNQ8Dk.jpg",
//     //       provider_id: 1750,
//     //       provider_name: "TOD",
//     //       display_priority: 28,
//     //     },
//     //     {
//     //       logo_path: "/t2yyOv40HZeVlLjYsCsPHnWLk4W.jpg",
//     //       provider_id: 8,
//     //       provider_name: "Netflix",
//     //       display_priority: 0,
//     //     },
//     //   ],
//     //   rent: [
//     //     {
//     //       logo_path: "/peURlLlr8jggOwK53fJ5wdQl05y.jpg",
//     //       provider_id: 2,
//     //       provider_name: "Apple iTunes",
//     //       display_priority: 8,
//     //     },
//     //     {
//     //       logo_path: "/tbEdFQDwx5LEVr8WpSeXQSIirVq.jpg",
//     //       provider_id: 3,
//     //       provider_name: "Google Play Movies",
//     //       display_priority: 10,
//     //     },
//     //     {
//     //       logo_path: "/oIkQkEkwfmcG7IGpRR1NB8frZZM.jpg",
//     //       provider_id: 192,
//     //       provider_name: "YouTube",
//     //       display_priority: 13,
//     //     },
//     //     {
//     //       logo_path: "/qLR6qzB1IcANZUqMEkLf6Sh8Y8s.jpg",
//     //       provider_id: 502,
//     //       provider_name: "Tata Play",
//     //       display_priority: 27,
//     //     },
//     //     {
//     //       logo_path: "/5NyLm42TmCqCMOZFvH4fcoSNKEW.jpg",
//     //       provider_id: 10,
//     //       provider_name: "Amazon Video",
//     //       display_priority: 49,
//     //     },
//     //   ],
//     //   buy: [
//     //     {
//     //       logo_path: "/peURlLlr8jggOwK53fJ5wdQl05y.jpg",
//     //       provider_id: 2,
//     //       provider_name: "Apple iTunes",
//     //       display_priority: 8,
//     //     },
//     //     {
//     //       logo_path: "/tbEdFQDwx5LEVr8WpSeXQSIirVq.jpg",
//     //       provider_id: 3,
//     //       provider_name: "Google Play Movies",
//     //       display_priority: 10,
//     //     },
//     //     {
//     //       logo_path: "/oIkQkEkwfmcG7IGpRR1NB8frZZM.jpg",
//     //       provider_id: 192,
//     //       provider_name: "YouTube",
//     //       display_priority: 13,
//     //     },
//     //   ],
//     // },
//     // IQ: {
//     //   link: "https://www.themoviedb.org/movie/438631-dune/watch?locale=IQ",
//     //   flatrate: [
//     //     {
//     //       logo_path: "/eXxCDzaz4F7bkkgkZ8p6AbNQ8Dk.jpg",
//     //       provider_id: 1750,
//     //       provider_name: "TOD",
//     //       display_priority: 28,
//     //     },
//     //   ],
//     // },
//     // IS: {
//     //   link: "https://www.themoviedb.org/movie/438631-dune/watch?locale=IS",
//     //   buy: [
//     //     {
//     //       logo_path: "/tbEdFQDwx5LEVr8WpSeXQSIirVq.jpg",
//     //       provider_id: 3,
//     //       provider_name: "Google Play Movies",
//     //       display_priority: 4,
//     //     },
//     //   ],
//     //   rent: [
//     //     {
//     //       logo_path: "/tbEdFQDwx5LEVr8WpSeXQSIirVq.jpg",
//     //       provider_id: 3,
//     //       provider_name: "Google Play Movies",
//     //       display_priority: 4,
//     //     },
//     //   ],
//     // },
//     videos: {
//       results: [
//         {
//           iso_639_1: "en",
//           iso_3166_1: "US",
//           name: "Adapting 'Dune' for the Big Screen | Academy x FilmAid: Visiting Artists Series",
//           key: "Shs7UMYQzVM",
//           site: "YouTube",
//           size: 1080,
//           type: "Featurette",
//           official: true,
//           published_at: "2022-09-06T15:00:11.000Z",
//           id: "63d11f34cb71b800d439ab78",
//         },
//         {
//           iso_639_1: "en",
//           iso_3166_1: "US",
//           name: "Otherworldly Wears",
//           key: "86WVlFR8dLc",
//           site: "YouTube",
//           size: 1080,
//           type: "Behind the Scenes",
//           official: true,
//           published_at: "2022-06-24T14:59:46.000Z",
//           id: "62b6aafb73520500614f871d",
//         },
//         {
//           iso_639_1: "en",
//           iso_3166_1: "US",
//           name: "'Dune' Wins Best Production Design | 94th Oscars",
//           key: "EBnF9XEjnxw",
//           site: "YouTube",
//           size: 1080,
//           type: "Featurette",
//           official: true,
//           published_at: "2022-05-01T17:00:11.000Z",
//           id: "63d12374cb71b8007c1b1e9a",
//         },
//         {
//           iso_639_1: "en",
//           iso_3166_1: "US",
//           name: "'Dune' Wins Best Film Editing | 94th Oscars",
//           key: "WPvmh4Cw54A",
//           site: "YouTube",
//           size: 1080,
//           type: "Featurette",
//           official: true,
//           published_at: "2022-04-30T20:00:05.000Z",
//           id: "63d124b1a410c8125be63cf2",
//         },
//         {
//           iso_639_1: "en",
//           iso_3166_1: "US",
//           name: "Hans Zimmer Wins Best Original Score for 'Dune'  | 94th Oscars",
//           key: "12Ur2THtOPM",
//           site: "YouTube",
//           size: 1080,
//           type: "Featurette",
//           official: true,
//           published_at: "2022-04-30T17:00:01.000Z",
//           id: "63d1238066ae4d007bf61bcb",
//         },
//         {
//           iso_639_1: "en",
//           iso_3166_1: "US",
//           name: "'Dune' Wins Best Visual Effects | 94th Oscars",
//           key: "NU39cERScn4",
//           site: "YouTube",
//           size: 1080,
//           type: "Featurette",
//           official: true,
//           published_at: "2022-04-27T17:00:12.000Z",
//           id: "63d123a39f51af00dc257847",
//         },
//         {
//           iso_639_1: "en",
//           iso_3166_1: "US",
//           name: "'Dune' Wins Best Cinematography | 94th Oscars",
//           key: "b1b4Wbhv0E0",
//           site: "YouTube",
//           size: 1080,
//           type: "Featurette",
//           official: true,
//           published_at: "2022-04-26T20:00:15.000Z",
//           id: "63d123c29f51af008645b177",
//         },
//         {
//           iso_639_1: "en",
//           iso_3166_1: "US",
//           name: "'Dune' Wins Best Sound | 94th Oscars",
//           key: "XPOn2hIrvzI",
//           site: "YouTube",
//           size: 1080,
//           type: "Featurette",
//           official: true,
//           published_at: "2022-04-26T17:00:14.000Z",
//           id: "63d123aacb71b80081020756",
//         },
//         {
//           iso_639_1: "en",
//           iso_3166_1: "US",
//           name: "Paul Atreides Tries To Outrun The Sandworm",
//           key: "7jB5gCD5kjU",
//           site: "YouTube",
//           size: 1080,
//           type: "Clip",
//           official: true,
//           published_at: "2022-03-28T21:00:32.000Z",
//           id: "62454c76458199005c3cef42",
//         },
//         {
//           iso_639_1: "en",
//           iso_3166_1: "US",
//           name: "Paul Tries to Protect Lady Jessica",
//           key: "s-TublCeuSE",
//           site: "YouTube",
//           size: 1080,
//           type: "Clip",
//           official: true,
//           published_at: "2022-03-27T20:00:42.000Z",
//           id: "62454aab6dc50700931c337e",
//         },
//         {
//           iso_639_1: "en",
//           iso_3166_1: "US",
//           name: "No Choice",
//           key: "KwsCbdhO2SU",
//           site: "YouTube",
//           size: 1080,
//           type: "Clip",
//           official: true,
//           published_at: "2022-03-25T16:59:55.000Z",
//           id: "62454bbdf263ba005c25e852",
//         },
//         {
//           iso_639_1: "en",
//           iso_3166_1: "US",
//           name: "The Emperor Has Spoken",
//           key: "1_TuEO6Mttw",
//           site: "YouTube",
//           size: 1080,
//           type: "Clip",
//           official: true,
//           published_at: "2022-03-24T14:59:50.000Z",
//           id: "62455329c740d90089f547c1",
//         },
//         {
//           iso_639_1: "en",
//           iso_3166_1: "US",
//           name: "Zendaya’s Dune Scenes Compilation",
//           key: "p2U7OvRUNv4",
//           site: "YouTube",
//           size: 1080,
//           type: "Clip",
//           official: true,
//           published_at: "2022-03-22T18:00:51.000Z",
//           id: "62454b826dc507005de78e9f",
//         },
//         {
//           iso_639_1: "en",
//           iso_3166_1: "US",
//           name: "Dune ASMR with Sharon Duncan-Brewster",
//           key: "2u4tR8se-40",
//           site: "YouTube",
//           size: 1080,
//           type: "Featurette",
//           official: true,
//           published_at: "2022-03-10T03:00:48.000Z",
//           id: "62cb4039d05a03005cbaaa05",
//         },
//         {
//           iso_639_1: "en",
//           iso_3166_1: "US",
//           name: "Designing the Sandworm",
//           key: "suf4D0f1NuE",
//           site: "YouTube",
//           size: 1080,
//           type: "Behind the Scenes",
//           official: true,
//           published_at: "2022-02-12T18:45:24.000Z",
//           id: "63af97487ef3811f60862102",
//         },
//         {
//           iso_639_1: "en",
//           iso_3166_1: "US",
//           name: "Spice",
//           key: "26bgYpJOqcw",
//           site: "YouTube",
//           size: 1080,
//           type: "Clip",
//           official: true,
//           published_at: "2022-01-18T19:00:00.000Z",
//           id: "623b629a58361b005ee7d5f3",
//         },
//         {
//           iso_639_1: "en",
//           iso_3166_1: "US",
//           name: "BFI Q&A - Denis Villeneuve on Dune",
//           key: "AID-fCCESww",
//           site: "YouTube",
//           size: 1080,
//           type: "Featurette",
//           official: true,
//           published_at: "2022-01-17T14:59:25.000Z",
//           id: "6328454cd7a70a0081ce81bf",
//         },
//         {
//           iso_639_1: "en",
//           iso_3166_1: "US",
//           name: "Silence",
//           key: "l9fvEDpub8M",
//           site: "YouTube",
//           size: 1080,
//           type: "Clip",
//           official: true,
//           published_at: "2022-01-11T19:00:27.000Z",
//           id: "623b62766bdec3005b45f87c",
//         },
//         {
//           iso_639_1: "en",
//           iso_3166_1: "US",
//           name: "The Training Room",
//           key: "AvqgxCw75JA",
//           site: "YouTube",
//           size: 1080,
//           type: "Behind the Scenes",
//           official: true,
//           published_at: "2021-12-26T19:00:03.000Z",
//           id: "623b62475541fa00494cc674",
//         },
//         {
//           iso_639_1: "en",
//           iso_3166_1: "US",
//           name: "The Royal Houses",
//           key: "wkDiyC82boU",
//           site: "YouTube",
//           size: 1080,
//           type: "Behind the Scenes",
//           official: true,
//           published_at: "2021-12-10T18:00:30.000Z",
//           id: "623b62b1d1a89300885b85d3",
//         },
//         {
//           iso_639_1: "en",
//           iso_3166_1: "US",
//           name: "Full Movie Preview",
//           key: "3pzNn31ukI4",
//           site: "YouTube",
//           size: 1080,
//           type: "Clip",
//           official: true,
//           published_at: "2021-12-06T21:41:23.000Z",
//           id: "63af96c61d1bf4008adf06ef",
//         },
//         {
//           iso_639_1: "en",
//           iso_3166_1: "US",
//           name: "Inside Dune: Working with the Cast",
//           key: "u8QjWsiACTE",
//           site: "YouTube",
//           size: 2160,
//           type: "Behind the Scenes",
//           official: false,
//           published_at: "2021-11-29T16:00:22.000Z",
//           id: "622d7e8665c26c00204c60d5",
//         },
//         {
//           iso_639_1: "en",
//           iso_3166_1: "US",
//           name: "Sharon Duncan-Brewster Plays You vs. Your Character",
//           key: "xEvs38heDXY",
//           site: "YouTube",
//           size: 1080,
//           type: "Featurette",
//           official: true,
//           published_at: "2021-11-06T16:00:23.000Z",
//           id: "629c2f59992fe6006681e1e3",
//         },
//         {
//           iso_639_1: "en",
//           iso_3166_1: "US",
//           name: "Inside Dune: Working with one of my idols",
//           key: "hD_FiUOOkko",
//           site: "YouTube",
//           size: 2160,
//           type: "Behind the Scenes",
//           official: false,
//           published_at: "2021-10-08T18:22:21.000Z",
//           id: "622d7f89b04605007a7a9a89",
//         },
//         {
//           iso_639_1: "en",
//           iso_3166_1: "US",
//           name: "Final Trailer",
//           key: "w0HgHet0sxg",
//           site: "YouTube",
//           size: 1080,
//           type: "Trailer",
//           official: true,
//           published_at: "2021-10-07T16:00:27.000Z",
//           id: "615f6a958e2ba600434e8c0b",
//         },
//         {
//           iso_639_1: "en",
//           iso_3166_1: "US",
//           name: "Dune Awaits: Becoming Duncan Idaho",
//           key: "A8y30Uyqc1E",
//           site: "YouTube",
//           size: 2160,
//           type: "Behind the Scenes",
//           official: false,
//           published_at: "2021-09-21T15:00:04.000Z",
//           id: "622d8b6fe04aca00459c7836",
//         },
//         {
//           iso_639_1: "en",
//           iso_3166_1: "US",
//           name: "Desert Visions Featurette",
//           key: "aSHs224Dge0",
//           site: "YouTube",
//           size: 1080,
//           type: "Featurette",
//           official: true,
//           published_at: "2021-09-13T22:24:05.000Z",
//           id: "6141974dfd7aa400294685ba",
//         },
//         {
//           iso_639_1: "en",
//           iso_3166_1: "US",
//           name: "Official Main Trailer",
//           key: "8g18jFHCLXk",
//           site: "YouTube",
//           size: 1080,
//           type: "Trailer",
//           official: true,
//           published_at: "2021-07-22T13:00:04.000Z",
//           id: "60f96f11f1759c004667ff5c",
//         },
//         {
//           iso_639_1: "en",
//           iso_3166_1: "US",
//           name: "Official Trailer",
//           key: "n9xhJrPXop4",
//           site: "YouTube",
//           size: 1080,
//           type: "Trailer",
//           official: true,
//           published_at: "2020-09-09T16:18:02.000Z",
//           id: "5f59011dbefb090036571115",
//         },
//         {
//           iso_639_1: "en",
//           iso_3166_1: "US",
//           name: "Official Trailer",
//           key: "n9xhJrPXop4",
//           site: "YouTuber",
//           size: 1080,
//           type: "Trailer",
//           official: true,
//           published_at: "2020-09-09T16:18:02.000Z",
//           id: "5f59011dbefb090036571115",
//         },
//       ],
//     },
//   };

//   // const similarMovies = [
//   //   {
//   //     adult: false,
//   //     backdrop_path: "/yij0LEulEH41FkEVdM4HNx5huec.jpg",
//   //     id: 688177,
//   //     title: "A-Symmetry",
//   //     original_language: "en",
//   //     original_title: "A-Symmetry",
//   //     overview:
//   //       "An obsessive serial killer's world turns awry when a victim's tormented husband lands on his doorstep.",
//   //     poster_path: "/9iaCwIkAMY62S3zUFA79i3A8FFj.jpg",
//   //     media_type: "movie",
//   //     genre_ids: [27],
//   //     popularity: 0.662,
//   //     release_date: "2019-01-23",
//   //     video: false,
//   //     vote_average: 6,
//   //     vote_count: 2,
//   //   },
//   //   {
//   //     adult: false,
//   //     backdrop_path: "/r2GAjd4rNOHJh6i6Y0FntmYuPQW.jpg",
//   //     id: 370172,
//   //     title: "No Time to Die",
//   //     original_language: "en",
//   //     original_title: "No Time to Die",
//   //     overview:
//   //       "Bond has left active service and is enjoying a tranquil life in Jamaica. His peace is short-lived when his old friend Felix Leiter from the CIA turns up asking for help. The mission to rescue a kidnapped scientist turns out to be far more treacherous than expected, leading Bond onto the trail of a mysterious villain armed with dangerous new technology.",
//   //     poster_path: "/iUgygt3fscRoKWCV1d0C7FbM9TP.jpg",
//   //     media_type: "movie",
//   //     genre_ids: [12, 28, 53],
//   //     popularity: 76.55,
//   //     release_date: "2021-09-29",
//   //     video: false,
//   //     vote_average: 7.429,
//   //     vote_count: 5012,
//   //   },
//   //   {
//   //     adult: false,
//   //     backdrop_path: "/zxWAv1A34kdYslBi4ekMDtgIGUt.jpg",
//   //     id: 566525,
//   //     title: "Shang-Chi and the Legend of the Ten Rings",
//   //     original_language: "en",
//   //     original_title: "Shang-Chi and the Legend of the Ten Rings",
//   //     overview:
//   //       "Shang-Chi must confront the past he thought he left behind when he is drawn into the web of the mysterious Ten Rings organization.",
//   //     poster_path: "/1BIoJGKbXjdFDAqUEiA2VHqkK1Z.jpg",
//   //     media_type: "movie",
//   //     genre_ids: [28, 12, 14],
//   //     popularity: 120.338,
//   //     release_date: "2021-09-01",
//   //     video: false,
//   //     vote_average: 7.636,
//   //     vote_count: 7734,
//   //   },
//   //   {
//   //     adult: false,
//   //     backdrop_path: "/kk2ryDOg8WRKmNIgYU1c5LeeeJK.jpg",
//   //     id: 1032819,
//   //     title: "Edelweiss",
//   //     original_language: "en",
//   //     original_title: "Edelweiss",
//   //     overview:
//   //       "A nurse struggles with her emotions when she saves the life of a valuable WW2 hostage, only to see him taken away for an inevitably brutal interrogation.",
//   //     poster_path: "/zhShDRbXuTakFsnIt7g0I1LAbMR.jpg",
//   //     media_type: "movie",
//   //     genre_ids: [10752, 18],
//   //     popularity: 0.6,
//   //     release_date: "2017-07-01",
//   //     video: false,
//   //     vote_average: 10,
//   //     vote_count: 1,
//   //   },
//   //   {
//   //     adult: false,
//   //     backdrop_path: "/7py8kUCYaOdFn1TfVS87BDBySOz.jpg",
//   //     id: 550988,
//   //     title: "Free Guy",
//   //     original_language: "en",
//   //     original_title: "Free Guy",
//   //     overview:
//   //       "A bank teller called Guy realizes he is a background character in an open world video game called Free City that will soon go offline.",
//   //     poster_path: "/xmbU4JTUm8rsdtn7Y3Fcm30GpeT.jpg",
//   //     media_type: "movie",
//   //     genre_ids: [35, 12, 878],
//   //     popularity: 100.608,
//   //     release_date: "2021-08-13",
//   //     video: false,
//   //     vote_average: 7.597,
//   //     vote_count: 6859,
//   //   },
//   //   {
//   //     adult: false,
//   //     backdrop_path: "/c6H7Z4u73ir3cIoCteuhJh7UCAR.jpg",
//   //     id: 524434,
//   //     title: "Eternals",
//   //     original_language: "en",
//   //     original_title: "Eternals",
//   //     overview:
//   //       "The Eternals are a team of ancient aliens who have been living on Earth in secret for thousands of years. When an unexpected tragedy forces them out of the shadows, they are forced to reunite against mankind’s most ancient enemy, the Deviants.",
//   //     poster_path: "/lFByFSLV5WDJEv3KabbdAF959F2.jpg",
//   //     media_type: "movie",
//   //     genre_ids: [878, 28, 12],
//   //     popularity: 112.562,
//   //     release_date: "2021-11-03",
//   //     video: false,
//   //     vote_average: 7,
//   //     vote_count: 6844,
//   //   },
//   //   {
//   //     adult: false,
//   //     backdrop_path: "/2GAR59nyPRF5Uie9qJnB5FeSHmT.jpg",
//   //     id: 571679,
//   //     title: "Now United: Dreams Come True",
//   //     original_language: "en",
//   //     original_title: "Now United: Dreams Come True",
//   //     overview:
//   //       "See how the group came to be and what it took for each member to be selected into the final group of Now United.",
//   //     poster_path: "/hINGeQe5psODwFzkHIOg0HqmYZa.jpg",
//   //     media_type: "movie",
//   //     genre_ids: [10402, 99],
//   //     popularity: 1.4,
//   //     release_date: "2018-12-29",
//   //     video: false,
//   //     vote_average: 9.6,
//   //     vote_count: 7,
//   //   },
//   //   {
//   //     adult: false,
//   //     backdrop_path: "/vIgyYkXkg6NC2whRbYjBD7eb3Er.jpg",
//   //     id: 580489,
//   //     title: "Venom: Let There Be Carnage",
//   //     original_language: "en",
//   //     original_title: "Venom: Let There Be Carnage",
//   //     overview:
//   //       "After finding a host body in investigative reporter Eddie Brock, the alien symbiote must face a new enemy, Carnage, the alter ego of serial killer Cletus Kasady.",
//   //     poster_path: "/rjkmN1dniUHVYAtwuV3Tji7FsDO.jpg",
//   //     media_type: "movie",
//   //     genre_ids: [878, 28, 12],
//   //     popularity: 145.272,
//   //     release_date: "2021-09-30",
//   //     video: false,
//   //     vote_average: 6.9,
//   //     vote_count: 8502,
//   //   },
//   //   {
//   //     adult: false,
//   //     backdrop_path: "/w4mdpbqx0NqsgNKZ170U0QDcyl3.jpg",
//   //     id: 646380,
//   //     title: "Don't Look Up",
//   //     original_language: "en",
//   //     original_title: "Don't Look Up",
//   //     overview:
//   //       "Two American astronomers attempt to warn humankind about an approaching comet that will wipe out life on planet Earth.",
//   //     poster_path: "/th4E1yqsE8DGpAseLiUrI60Hf8V.jpg",
//   //     media_type: "movie",
//   //     genre_ids: [35, 878],
//   //     popularity: 48.477,
//   //     release_date: "2021-12-07",
//   //     video: false,
//   //     vote_average: 7.17,
//   //     vote_count: 6581,
//   //   },
//   //   {
//   //     adult: false,
//   //     backdrop_path: "/dK12GIdhGP6NPGFssK2Fh265jyr.jpg",
//   //     id: 512195,
//   //     title: "Red Notice",
//   //     original_language: "en",
//   //     original_title: "Red Notice",
//   //     overview:
//   //       "An Interpol-issued Red Notice is a global alert to hunt and capture the world's most wanted. But when a daring heist brings together the FBI's top profiler and two rival criminals, there's no telling what will happen.",
//   //     poster_path: "/lAXONuqg41NwUMuzMiFvicDET9Y.jpg",
//   //     media_type: "movie",
//   //     genre_ids: [28, 35, 80, 53],
//   //     popularity: 83.24,
//   //     release_date: "2021-11-04",
//   //     video: false,
//   //     vote_average: 6.795,
//   //     vote_count: 4629,
//   //   },
//   //   {
//   //     adult: false,
//   //     backdrop_path: "/Uc0DR3s7SiT1v3hDSnaPsYOSIQ.jpg",
//   //     id: 864507,
//   //     title: "Love, Love, Love: A Musical",
//   //     original_language: "en",
//   //     original_title: "Love, Love, Love: A Musical",
//   //     overview:
//   //       "The musical, performed by the members as themselves, forming three main couples, is about love. Which is treated to the rhythm of songs where the members dance and sing representing what they feel in each specific moment.",
//   //     poster_path: "/bpUFnzgi2u3Go2ZkEzOgKL85CZW.jpg",
//   //     media_type: "movie",
//   //     genre_ids: [10402, 35, 10749],
//   //     popularity: 1.055,
//   //     release_date: "2021-08-28",
//   //     video: true,
//   //     vote_average: 10,
//   //     vote_count: 6,
//   //   },
//   //   {
//   //     adult: false,
//   //     backdrop_path: "/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg",
//   //     id: 414906,
//   //     title: "The Batman",
//   //     original_language: "en",
//   //     original_title: "The Batman",
//   //     overview:
//   //       "In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.",
//   //     poster_path: "/74xTEgt7R36Fpooo50r9T25onhq.jpg",
//   //     media_type: "movie",
//   //     genre_ids: [80, 9648, 53],
//   //     popularity: 246.64,
//   //     release_date: "2022-03-02",
//   //     video: false,
//   //     vote_average: 7.706,
//   //     vote_count: 7468,
//   //   },
//   //   {
//   //     adult: false,
//   //     backdrop_path: "/jlGmlFOcfo8n5tURmhC7YVd4Iyy.jpg",
//   //     id: 436969,
//   //     title: "The Suicide Squad",
//   //     original_language: "en",
//   //     original_title: "The Suicide Squad",
//   //     overview:
//   //       "Supervillains Harley Quinn, Bloodsport, Peacemaker and a collection of nutty cons at Belle Reve prison join the super-secret, super-shady Task Force X as they are dropped off at the remote, enemy-infused island of Corto Maltese.",
//   //     poster_path: "/kb4s0ML0iVZlG6wAKbbs9NAm6X.jpg",
//   //     media_type: "movie",
//   //     genre_ids: [28, 35, 12],
//   //     popularity: 130.485,
//   //     release_date: "2021-07-28",
//   //     video: false,
//   //     vote_average: 7.599,
//   //     vote_count: 7007,
//   //   },
//   //   {
//   //     adult: false,
//   //     backdrop_path: "/4LrL40XecjGLRpX5I2gzMTUt04l.jpg",
//   //     id: 617653,
//   //     title: "The Last Duel",
//   //     original_language: "en",
//   //     original_title: "The Last Duel",
//   //     overview:
//   //       "King Charles VI declares that Knight Jean de Carrouges settle his dispute with his squire, Jacques Le Gris, by challenging him to a duel.",
//   //     poster_path: "/zjrJE0fpzPvX8saJXj8VNfcjBoU.jpg",
//   //     media_type: "movie",
//   //     genre_ids: [28, 18, 36],
//   //     popularity: 44.496,
//   //     release_date: "2021-10-13",
//   //     video: false,
//   //     vote_average: 7.495,
//   //     vote_count: 2655,
//   //   },
//   //   {
//   //     adult: false,
//   //     backdrop_path: "/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg",
//   //     id: 634649,
//   //     title: "Spider-Man: No Way Home",
//   //     original_language: "en",
//   //     original_title: "Spider-Man: No Way Home",
//   //     overview:
//   //       "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.",
//   //     poster_path: "/uJYYizSuA9Y3DCs0qS4qWvHfZg4.jpg",
//   //     media_type: "movie",
//   //     genre_ids: [28, 12, 878],
//   //     popularity: 334.837,
//   //     release_date: "2021-12-15",
//   //     video: false,
//   //     vote_average: 8.017,
//   //     vote_count: 16702,
//   //   },
//   //   {
//   //     adult: false,
//   //     backdrop_path: "/keIxh0wPr2Ymj0Btjh4gW7JJ89e.jpg",
//   //     id: 497698,
//   //     title: "Black Widow",
//   //     original_language: "en",
//   //     original_title: "Black Widow",
//   //     overview:
//   //       "Natasha Romanoff, also known as Black Widow, confronts the darker parts of her ledger when a dangerous conspiracy with ties to her past arises. Pursued by a force that will stop at nothing to bring her down, Natasha must deal with her history as a spy and the broken relationships left in her wake long before she became an Avenger.",
//   //     poster_path: "/kwB7d51AIcyzPOBOHLCEZJkmPhQ.jpg",
//   //     media_type: "movie",
//   //     genre_ids: [28, 12, 878],
//   //     popularity: 97.103,
//   //     release_date: "2021-07-07",
//   //     video: false,
//   //     vote_average: 7.365,
//   //     vote_count: 8640,
//   //   },
//   //   {
//   //     adult: false,
//   //     backdrop_path: "/eNI7PtK6DEYgZmHWP9gQNuff8pv.jpg",
//   //     id: 624860,
//   //     title: "The Matrix Resurrections",
//   //     original_language: "en",
//   //     original_title: "The Matrix Resurrections",
//   //     overview:
//   //       "Plagued by strange memories, Neo's life takes an unexpected turn when he finds himself back inside the Matrix.",
//   //     poster_path: "/8c4a8kE7PizaGQQnditMmI1xbRp.jpg",
//   //     media_type: "movie",
//   //     genre_ids: [878, 28, 12],
//   //     popularity: 102.03,
//   //     release_date: "2021-12-16",
//   //     video: false,
//   //     vote_average: 6.5,
//   //     vote_count: 4537,
//   //   },
//   //   {
//   //     adult: false,
//   //     backdrop_path: "/4XKqxgjRJs3YtH5j1Eli5y6gtno.jpg",
//   //     id: 542178,
//   //     title: "The French Dispatch",
//   //     original_language: "en",
//   //     original_title: "The French Dispatch",
//   //     overview:
//   //       "The staff of an American magazine based in France puts out its last issue, with stories featuring an artist sentenced to life imprisonment, student riots, and a kidnapping resolved by a chef.",
//   //     poster_path: "/pMTMSKBEe5sMg1ZxWCy9YWLuyln.jpg",
//   //     media_type: "movie",
//   //     genre_ids: [35, 18, 10749],
//   //     popularity: 21.798,
//   //     release_date: "2021-10-21",
//   //     video: false,
//   //     vote_average: 7.159,
//   //     vote_count: 1922,
//   //   },
//   //   {
//   //     adult: false,
//   //     backdrop_path: "/oE6bhqqVFyIECtBzqIuvh6JdaB5.jpg",
//   //     id: 522402,
//   //     title: "Finch",
//   //     original_language: "en",
//   //     original_title: "Finch",
//   //     overview:
//   //       "On a post-apocalyptic Earth, a robot, built to protect the life of his dying creator's beloved dog, learns about life, love, friendship, and what it means to be human.",
//   //     poster_path: "/jKuDyqx7jrjiR9cDzB5pxzhJAdv.jpg",
//   //     media_type: "movie",
//   //     genre_ids: [878, 18, 12],
//   //     popularity: 66.964,
//   //     release_date: "2021-11-04",
//   //     video: false,
//   //     vote_average: 7.992,
//   //     vote_count: 2792,
//   //   },
//   //   {
//   //     adult: false,
//   //     backdrop_path: "/fuuZFPc8x6gQ8mLGoBp9vrmcQMT.jpg",
//   //     id: 610253,
//   //     title: "Halloween Kills",
//   //     original_language: "en",
//   //     original_title: "Halloween Kills",
//   //     overview:
//   //       "The nightmare isn't over as unstoppable killer Michael Myers escapes from Laurie Strode's trap to continue his ritual bloodbath. Injured and taken to the hospital, Laurie fights through the pain as she inspires residents of Haddonfield, to rise up against Myers. Taking matters into their own hands, the Strode women and other survivors form a vigilante mob to hunt down Michael and end his reign of terror once and for all.",
//   //     poster_path: "/ir9eyz1mtgsohjvo7UYtqUfFuES.jpg",
//   //     media_type: "movie",
//   //     genre_ids: [27, 53],
//   //     popularity: 45.373,
//   //     release_date: "2021-10-14",
//   //     video: false,
//   //     vote_average: 6.564,
//   //     vote_count: 2187,
//   //   },
//   //   {
//   //     adult: false,
//   //     backdrop_path: "/jeVGtMVqjDp5Vsn2pmmAOWcERzA.jpg",
//   //     id: 693751,
//   //     title: "Double Cross",
//   //     original_language: "en",
//   //     original_title: "Double Cross",
//   //     overview:
//   //       "Cocky young con-artists, Jenn and George have been making all the right moves, breaking the law, and having fun doing it. But one night after making suspiciously light work of a heavy score, they find themselves crossing the line into dangerous territory... in more ways than one... DOUBLE CROSS is a five minute crime caper about two con artists who bite off more than they can chew.",
//   //     poster_path: "/p7MBPaupqnxVKAeBa82mBKRiAHD.jpg",
//   //     media_type: "movie",
//   //     genre_ids: [80, 53],
//   //     popularity: 0.6,
//   //     release_date: "2015-12-12",
//   //     video: false,
//   //     vote_average: 8,
//   //     vote_count: 2,
//   //   },
//   // ];
//   // const [userLocaction, setUserLocaction] = useState();
//   // useEffect(() => {
//   //   fetch("https://ipapi.co/json/")
//   //     .then((res) => res.json())
//   //     .then((data) => {
//   //       console.log(data.country_code);
//   //       setUserLocaction(data.country_code);
//   //     });
//   // }, []);

//   // const providers = Details[userLocaction].flatrate;
//   // console.log(providers);

//   // const director = Details.crew.find((director) => director.job === "Director");
//   // console.log(director);

//   // const composer = Details.crew.find(
//   //   (composer) => composer.job === "Original Music Composer"
//   // );
//   // console.log(composer);

//   // const dop = Details.crew.find((dop) => dop.job === "Director of Photography");
//   // console.log(dop);

//   //Filtering for Youtube Videos Only
//   // const [videos, setVideos] = useState({});
//   // if (currentBackdrop && currentBackdrop.videos && currentBackdrop.videos.results && currentBackdrop.videos.results[].key) {
//   //   setVideos(
//   //     currentBackdrop.videos.results.filter((i) => i.site === "YouTube")
//   //   );
//   //   console.log(
//   //     currentBackdrop.videos.results.filter((i) => i.site === "YouTube").length
//   //   );
//   // } else {setVideos({})};
//   // console.log(Details.videos.results.length);

 
//   //currentBackdrop.videos.results.filter((i) => i.site === "YouTube")
//   return (
//     <div>
//       {/* <h1>No Page</h1> */}
//       {/* <ImgCard
//         image={Details.image}
//         title={Details.title}
//         year={Details.year}
//         overview={Details.overview}
//       /> */}

//       <div className="movieMiddleDetailContainer">
//         <div className="leftMiddleContainer">
//           <h1 className="sectionHeading">CREW</h1>
//           <div className="crewContainer">
//             <Link
//               to={`https://www.themoviedb.org/person/${
//                 movieCastCrew && movieCastCrew.crew
//                   ? movieCastCrew.crew.find(
//                       (director) => director.job === "Director"
//                     ).id
//                   : ""
//               }`}
//               target="_blank"
//             >
//               <div className="directorContainer">
//                 <img
//                   src={`https://image.tmdb.org/t/p/original${
//                     movieCastCrew && movieCastCrew.crew
//                       ? movieCastCrew.crew.find(
//                           (director) => director.job === "Director"
//                         ).profile_path
//                       : ""
//                   }`}
//                   alt=""
//                   className="ccCardHolder"
//                 />
//                 <div className="ccName">
//                   {movieCastCrew && movieCastCrew.crew
//                     ? movieCastCrew.crew.find(
//                         (director) => director.job === "Director"
//                       ).name
//                     : ""}
//                 </div>
//                 <div className="ccTitle">
//                   {movieCastCrew && movieCastCrew.crew ? "Director" : ""}
//                 </div>
//               </div>
//             </Link>
//             <Link
//               to={`https://www.themoviedb.org/person/${
//                 movieCastCrew && movieCastCrew.crew
//                   ? movieCastCrew.crew.find(
//                       (composer) => composer.job === "Original Music Composer"
//                     ).id
//                   : ""
//               }`}
//               target="_blank"
//             >
//               <div className="composerContainer">
//                 <img
//                   className="ccCardHolder"
//                   src={`https://image.tmdb.org/t/p/original${
//                     movieCastCrew && movieCastCrew.crew
//                       ? movieCastCrew.crew.find(
//                           (composer) =>
//                             composer.job === "Original Music Composer"
//                         ).profile_path
//                       : ""
//                   }`}
//                   alt=""
//                 />
//                 <div className="ccName">
//                   {movieCastCrew && movieCastCrew.crew
//                     ? movieCastCrew.crew.find(
//                         (composer) => composer.job === "Original Music Composer"
//                       ).name
//                     : ""}
//                 </div>
//                 <div className="ccTitle">
//                   {movieCastCrew && movieCastCrew.crew ? "Composer" : ""}
//                 </div>
//               </div>
//             </Link>
//             <Link
//               to={`https://www.themoviedb.org/person/${
//                 movieCastCrew && movieCastCrew.crew
//                   ? movieCastCrew.crew.find(
//                       (dop) => dop.job === "Director of Photography"
//                     ).id
//                   : ""
//               }`}
//               target="_blank"
//             >
//               <div className="dopContainer">
//                 <img
//                   src={`https://image.tmdb.org/t/p/original${
//                     movieCastCrew && movieCastCrew.crew
//                       ? movieCastCrew.crew.find(
//                           (dop) => dop.job === "Director of Photography"
//                         ).profile_path
//                       : ""
//                   }`}
//                   alt=""
//                   className="ccCardHolder"
//                 />
//                 <div className="ccName">
//                   {movieCastCrew && movieCastCrew.crew
//                     ? movieCastCrew.crew.find(
//                         (dop) => dop.job === "Director of Photography"
//                       ).name
//                     : ""}
//                 </div>
//                 <div className="ccTitle">
//                   {movieCastCrew && movieCastCrew.crew ? "D.O.P" : ""}
//                 </div>
//               </div>
//             </Link>
//           </div>
//           <h1 className="sectionHeading">CAST</h1>
//           <div className="castContainer">
//             {movieCastCrew && movieCastCrew.cast
//               ? movieCastCrew.cast.slice(0, 3).map((cast) => (
//                   <>
//                     <Link
//                       to={`https://www.themoviedb.org/person/${
//                         cast ? cast.id : ""
//                       }`}
//                       target="_blank"
//                     >
//                       <div className="castInnerContainer">
//                         <img
//                           src={`https://image.tmdb.org/t/p/original${cast.profile_path}`}
//                           alt=""
//                           className="ccCardHolder"
//                         />
//                         <div className="ccName">{cast.name}</div>
//                         <div className="ccTitle">{cast.character}</div>
//                       </div>
//                     </Link>
//                   </>
//                 ))
//               : ""}
//           </div>
//           <div className="streamingVideoContainer">
//             <div>
//               <h1 className="sectionHeading">STREAMING</h1>

//               <div className="streamingContainer">
//                 <Link
//                   style={{ textDecoration: "none" }}
//                   to={
//                     streaming && streaming.IN && streaming.IN.link
//                       ? streaming.IN.link
//                       : ""
//                   }
//                   target="_blank"
//                 >
//                   <div className="streamingHeader">Where To Watch</div>
//                   {streaming &&
//                   streaming.IN &&
//                   streaming.IN.flatrate &&
//                   userLocaction ? (
//                     streaming.IN.flatrate.slice(0, 3).map((streaming) => (
//                       <div>
//                         <div className="streamingContent">
//                           <img
//                             className="streamingLogo"
//                             src={`https://www.themoviedb.org/t/p/original${streaming.logo_path}`}
//                             alt=""
//                           />
//                           <div className="streamingName">
//                             {streaming.provider_name}
//                           </div>
//                         </div>
//                         <div className="streamingSplitter" />
//                       </div>
//                     ))
//                   ) : (
//                     <>
//                       <div className="streamingContent">
//                         <div className="streamingNoName">
//                           Not available to stream.
//                         </div>
//                       </div>
//                     </>
//                   )}
//                   <div className="streamingFooter">Data Powered by TMDB</div>
//                 </Link>
//               </div>
//             </div>
//             <div>
//               {currentBackdrop ? (
//                 <>
//                   <h1 className="sectionHeading">TRAILERS & MORE...</h1>
//                   {currentBackdrop &&
//                   currentBackdrop.videos.results.filter(
//                     (i) => i.site === "YouTube"
//                   ).length > 2 ? (
//                     <div>
//                       <div className="embed-responsive embed-responsive-16by9 w-75 m-4">
//                         <iframe
//                           title="myFrame"
//                           className="embed-responsive-item"
//                           src={`https://www.youtube.com/embed/${
//                             currentBackdrop.videos.results.filter(
//                               (i) => i.site === "YouTube"
//                             )
//                               ? currentBackdrop.videos.results.filter(
//                                   (i) => i.site === "YouTube"
//                                 )[
//                                   Math.floor(
//                                     Math.random() *
//                                       currentBackdrop.videos.results.filter(
//                                         (i) => i.site === "YouTube"
//                                       ).length
//                                   )
//                                 ].key
//                               : ""
//                           }`}
//                         ></iframe>
//                       </div>
//                       <div className="embed-responsive embed-responsive-16by9 w-75 m-4">
//                         <iframe
//                           title="myFrame"
//                           className="embed-responsive-item"
//                           src={`https://www.youtube.com/embed/${
//                             currentBackdrop.videos.results.filter(
//                               (i) => i.site === "YouTube"
//                             )
//                               ? currentBackdrop.videos.results.filter(
//                                   (i) => i.site === "YouTube"
//                                 )[
//                                   Math.floor(
//                                     Math.random() *
//                                       currentBackdrop.videos.results.filter(
//                                         (i) => i.site === "YouTube"
//                                       ).length
//                                   )
//                                 ].key
//                               : ""
//                           }`}
//                         ></iframe>
//                       </div>
//                     </div>
//                   ) : (
//                     //console.log("4")
//                     <div className="embed-responsive embed-responsive-16by9 ml-4 mt-4">
//                       <iframe
//                         title="myFrame"
//                         className="embed-responsive-item"
//                         src={`https://www.youtube.com/embed/${
//                           currentBackdrop.videos.results.filter(
//                             (i) => i.site === "YouTube"
//                           )
//                             ? currentBackdrop.videos.results.filter(
//                                 (i) => i.site === "YouTube"
//                               )[
//                                 Math.floor(
//                                   Math.random() *
//                                     currentBackdrop.videos.results.filter(
//                                       (i) => i.site === "YouTube"
//                                     ).length
//                                 )
//                               ].key
//                             : ""
//                         }`}
//                       ></iframe>
//                     </div>
//                   )}
//                 </>
//               ) : (
//                 ""
//               )}
//               {/* {Details && Details.videos ? Details.videos.results[Math.floor(
//                           Math.random() *
//                             Details.videos.results.length
//                         )] : ''} */}
//             </div>
//           </div>
//           <h1 className="sectionHeading">THEMES</h1>
//           <div className="themesContainer">
//             {moviethemes && moviethemes.keywords
//               ? moviethemes.keywords.map(
//                   (theme, index) =>
//                     index < 20 && (
//                       <div className="genreContainer">
//                         <div className="genre" id={theme.id}>
//                           {theme.name}
//                         </div>
//                       </div>
//                     )
//                 )
//               : ""}
//           </div>
//         </div>
//         <div className="rightMiddleContainer"></div>
//       </div>
//       <div className="movieBottomDetailContainer">
//         <h1 className="sectionHeading">SIMILAR FILMS</h1>

//         <div className="d-flex justify-content-around flex-wrap">
//           {similarMovies
//             ? similarMovies.map(
//                 (movie, index) =>
//                   index < 20 && (
//                     <>
//                       <div>
//                         <Link to={`/movie/${movie.id}`}>
//                           <ImgCard
//                             key={movie.id}
//                             image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
//                             title={movie.title}
//                             year={movie.release_date}
//                             overview={movie.overview}
//                           />
//                         </Link>
//                       </div>
//                     </>
//                   )
//               )
//             : ""}
//         </div>
//       </div>
//     </div>
//   );
<>
ss
</>
 };

export default NoPage;
