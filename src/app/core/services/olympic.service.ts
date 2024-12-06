import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Country } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json'; // URL du fichier JSON
  private olympics$ = new BehaviorSubject<Country[] | null>(null); // Subject pour stocker les données

  constructor(private http: HttpClient) {}

  /**
   * Charge les données olympiques initiales et les met en cache
   */
  loadInitialData(): Observable<Country[]> {
    return this.http.get<Country[]>(this.olympicUrl).pipe(
      tap((data) => {
        this.olympics$.next(data); // Met à jour les données dans BehaviorSubject
        console.log('Données chargées avec succès:', data);
      }),
      catchError((error) => {
        console.error('Erreur lors du chargement des données:', error);
        return throwError(() => new Error('Erreur de chargement des données'));
      })
    );
  }

  /**
   * Retourne les données olympiques mises en cache
   */
  getOlympics(): Observable<Country[] | null> {
    return this.olympics$.asObservable();
  }

  /**
   * Récupère directement les données depuis l'URL (si besoin)
   */
  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.olympicUrl).pipe(
      catchError((error) => {
        console.error('Erreur lors de la récupération des pays:', error);
        return throwError(() => new Error('Erreur de récupération des pays'));
      })
    );
  }
}
