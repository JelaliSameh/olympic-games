import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Country } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json'; // URL du fichier JSON
  private olympics$ = new BehaviorSubject<Country[] | null>(null); // Gestion des données

  constructor(private http: HttpClient) {}

  /**
   * Charge les données olympiques initiales
   */
  loadInitialData(): Observable<any> {
    return this.http.get<Country[]>(this.olympicUrl).pipe(
      tap((data) => {
        this.olympics$.next(data); // Met à jour le BehaviorSubject
        console.log('Données chargées avec succès:', data);
      }),
      catchError((error) => {
        console.error('Erreur lors du chargement des données:', error);
        throw error;
      })
    );
  }
  /**
   * Retourne les données olympiques en tant qu'Observable
   */
  getOlympics(): Observable<Country[] | null> {
    return this.olympics$.asObservable();
  }
  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.olympicUrl);
  }
  
  
}
