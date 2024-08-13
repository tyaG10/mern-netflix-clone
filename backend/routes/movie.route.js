import express from "express";
import { getTrendingMovies, getMovieTrailers, getMovieDetails, getMovieSimilar,getMovieByCategory } from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/trending", getTrendingMovies);
router.get("/:id/trailers", getMovieTrailers);
router.get("/:id/details", getMovieDetails);
router.get("/:id/similars", getMovieSimilar);
router.get("/:category", getMovieByCategory);


export default router;