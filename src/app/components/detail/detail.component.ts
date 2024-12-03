import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartData, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Country } from 'src/app/core/models/Olympic';

@Component({
    selector: 'app-detail',
    imports: [NgChartsModule, CommonModule],
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {
  loading = true;
  error = false;
  country = '';
  countryData: Country | undefined;
  chartType: ChartType = 'line';
  lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Nombre de médailles',
        fill: true,
      },
    ],
  };
  public chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
  };
  private subscription: Subscription = new Subscription();
  participation: any;
countries: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private olympicService: OlympicService
  ) {}

  ngOnInit(): void {
    this.country = this.route.snapshot.paramMap.get('country')!;
    this.subscription.add(
      this.olympicService.getOlympics().subscribe(
        (data) => {
          if (data) {
            // Rechercher les données du pays correspondant
            this.countryData = data.find((c) => c.country === this.country);
            if (this.countryData) {
              this.prepareLineChartData(); // Prépare les données du graphique
            } else {
              console.error('Country not found:', this.country);
              this.error = true;
            }
          } else {
            this.error = true;
          }
        },
        (error) => {
          console.error('Erreur de récupération des données:', error);
          this.error = true;
        },
        () => {
          this.loading = false; // Arrête le chargement
        }
      )
    );
  }
  

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // Désinscription propre
  }

  /**
   * Prépare les données pour le graphique
   */
  prepareLineChartData() {
    if (this.countryData) {
      this.lineChartData.labels = this.countryData.participations.map((p) => p.year.toString());
      this.lineChartData.datasets[0].data = this.countryData.participations.map((p) => p.medalsCount);
    }
  }

 
    // Calcule le total des médailles
    getTotalMedals(participations: any[]): number {
      return participations.reduce((sum, p) => sum + p.medalsCount, 0);
    }
  
    // Calcule le total des athlètes
    getTotalAthletes(participations: any[]): number {
      return participations.reduce((sum, p) => sum + p.athleteCount, 0);
    }


  /**
   * Retour à la page précédente
   */
  goBack() {
    this.router.navigate(['/dashboard']);
  }

}
