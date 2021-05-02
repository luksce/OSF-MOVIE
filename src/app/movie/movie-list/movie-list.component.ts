import { HttpClient } from '@angular/common/http';
import { movies } from './../models/movie.model';
import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model';
import { MovieService } from './../services/movie.service';
import { NavbarService } from './../../navbar/services/navbar.service';

export class Moviee {
  constructor(
    public id : number,
    public title : string, 
    public release_date : string,
    public poster_path : string,
  ){}
}
@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  animations: [],
})
export class MovieListComponent implements OnInit {
  //USAR COM O DBJSON
  movies$: Observable<Movie[]>;  
  loadingMovies: Array<Number>;
  //--------
  movies: Moviee[];
  apiURL = 'https://api.themoviedb.org/3/movie/popular?api_key=c48fae56d71c9c8974d1dd5b95df7089&language=en-US&page=1';

  constructor(
    private movieService: MovieService,
    private navbarService: NavbarService,
    private httpClient : HttpClient,
  ) { }

  ngOnInit() {
    this.getMovies();
    this.loadingMovies = new Array(10).fill(0).map((n, index) => index);
    this.movies$ = this.movieService.getMoviesFromHttp();
    this.navbarService.title.next('OSF | Movie');
  }

  getMovies(){
    this.httpClient.get<any>(this.apiURL)
    .subscribe(response => {
        console.log(response);
        this.movies = response.results;
        this.movies.map(movie => {
          movie.poster_path = `https://image.tmdb.org/t/p/w200/${movie.poster_path}`;
        });
    });
  }
}
