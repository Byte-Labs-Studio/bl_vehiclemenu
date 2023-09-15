import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { ProvidersModule } from 'src/providers/providers.module'
import { ImageholderComponent } from './imageholder/imageholder.component'

@NgModule({
    declarations: [AppComponent, ImageholderComponent],
    imports: [BrowserModule, ProvidersModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
