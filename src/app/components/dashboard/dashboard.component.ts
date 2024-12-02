import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ChartData, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { Subscription} from 'rxjs';
import { Country } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [NgChartsModule, CommonModule],
  standalone: true,
})
export class DashboardComponent implements OnInit, OnDestroy {
  public chartType: ChartType = 'pie';
  public pieChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [
      {
        data: [], // Données des médailles
        backgroundColor: ['#C50C84', '#0FA6B9', '#F25299', '#D995E3', '#C37EC6'], // Couleurs des secteurs
      },
    ],
  };

  private subscription: Subscription = new Subscription();
  loading: boolean = true;
  error: boolean = false;
  jsonData: Country[] = [];
pieChartLabels: unknown[]|undefined;
country: any;
  participation: any;

  constructor(private router: Router, private olympicService: OlympicService) {}
  countries: Country[] = [];
  totalCountries: number = 0;
  ngOnInit(): void {
    this.subscription.add(
      this.olympicService.getOlympics().subscribe({
        next: (data) => {
          if (data) {
            this.jsonData = data; // Charger les données
            this.prepareChartData(); // Préparer les données pour le graphique
          } else {
            this.error = true;
          }
        },
        error: (err) => {
          console.error('Erreur lors du chargement des données', err);
          this.error = true;
        },
        complete: () => {
          this.loading = false;
        },
      })
    );
    this.olympicService.getCountries().subscribe((data: Country[]) => {
      this.countries = data;
    });
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // Nettoyage des abonnements
  }

  /**
   * Préparer les données pour le graphique
   */
  prepareChartData(): void {
    const labels: string[] = [];
    const data: number[] = [];

    this.jsonData.forEach((country) => {
      const totalMedals = country.participations.reduce(
        (sum: any, participation: { medalsCount: any; }) => sum + participation.medalsCount,
        0
      );
      labels.push(country.country);
      data.push(totalMedals);
    });

    this.pieChartData.labels = labels;
    this.pieChartData.datasets[0].data = data;
  }

  /**
   * Gérer le clic sur un segment du graphique
   */
  onChartClick(event: any): void {
    if (event.active && event.active.length > 0) {
      const index = event.active[0].index; // Récupération de l'index du segment
      const country = this.pieChartData.labels?.[index] as string; // Identification du pays
      this.router.navigate(['/detail', country]); // Navigation vers la page détail
    }
  }
  getTotalAthletesForAllCountries(): number {
    return this.countries.reduce(
      (total, country) =>
        total +
        country.participations.reduce(
          (sum, participation) => sum + participation.athleteCount,
          0
        ),
      0
    );
  }
  

  getTotalAthletes(participations: any[]): number {
    return participations.reduce((total, p) => total + p.athleteCount, 0);
  }
  getTotalCountries(countries: Country[]): number {
    return countries.length;
  }

}
