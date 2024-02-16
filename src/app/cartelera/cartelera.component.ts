import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-videoclub',
  templateUrl: './cartelera.component.html',
  styleUrls: ['./cartelera.component.scss']
})
export class CarteleraComponent implements OnInit {
  percentage: number = 0;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    const moviesContainer = this.elementRef.nativeElement.querySelector('.movies');
    const movies = this.elementRef.nativeElement.querySelectorAll('.movie');

    movies.forEach((movie: HTMLElement) => {
      movie.addEventListener('click', (event: Event) => {
        movies.forEach((m: HTMLElement) => {
          this.renderer.removeClass(m, 'selected');
        });
        const selectedMovie = (event.target as HTMLElement)?.closest('.movie');
        this.renderer.addClass(selectedMovie, 'selected');
      });
    });

    window.addEventListener('scroll', (event: WindowEventMap['scroll']) => {
      const scrollElement = document.scrollingElement || document.documentElement;
      const perc =
        (100 / (scrollElement.scrollHeight - window.innerHeight)) *
        scrollElement.scrollTop;

      this.renderer.setStyle(
        moviesContainer,
        'transform',
        `translateY(${-perc}%) translateZ(-312px) rotateY(18deg) rotateX(-12deg) rotateZ(-3deg)`
      );
    });

    const bg = this.elementRef.nativeElement.querySelector('.background');
    window.addEventListener('pointermove', (event) => {
      this.renderer.setStyle(
        bg,
        'backgroundPosition',
        `calc(50% + ${(window.innerWidth / 2) - event.clientX}px * -1) calc(50% + ${(window.innerHeight / 2) - event.clientY}px * -1)`
      );
    });
  }
}
