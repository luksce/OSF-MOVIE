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
    public genres : string, 
    public overview : string, 
    public releasedate : string
  ){}
}
@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-50px)' }),
            stagger(
              '50ms',
              animate(
                '500ms ease-in',
                style({ opacity: 1, transform: 'translateY(0px)' }),
              ),
            ),
          ],
          { optional: true },
        ),
        query(
          ':leave',
          [animate('500ms', style({ opacity: 0, transform: 'rotate(90deg)' }))],
          {
            optional: true,
          },
        ),
      ]),
    ]),
  ],
})
export class MovieListComponent implements OnInit {
  movies$: Observable<Movie[]>;
  loadingMovies: Array<Number>;
  movies: Moviee[];

  constructor(
    private movieService: MovieService,
    private navbarService: NavbarService,
    private httpClient : HttpClient,
  ) { }

  ngOnInit() {
    this.loadingMovies = new Array(10).fill(0).map((n, index) => index);
    this.getMovies();
    this.movies$ = this.movieService.getMoviesFromHttp();
    this.navbarService.title.next('OSF | Movie');
  }

  getMovies(){
    this.httpClient.get<any>('https://api.themoviedb.org/3/movie/157336?api_key=c48fae56d71c9c8974d1dd5b95df7089')
    .subscribe(response => {
        console.log(response);
        this.movies = response;
    });
  }
}
