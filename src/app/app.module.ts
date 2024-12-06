
import { NgModule } from '@angular/core';

import { OlympicService } from './core/services/olympic.service';
import { provideHttpClient } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [ ],
  providers: [OlympicService, provideHttpClient()],
  bootstrap: [],
})
export class AppModule {}