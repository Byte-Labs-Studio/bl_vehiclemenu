import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { ProvidersModule } from 'src/providers/providers.module'
import { HexagonComponent } from './hexagon/hexagon.component';
import { MenuComponent } from './menu/menu.component'

@NgModule({
    declarations: [AppComponent, HexagonComponent, MenuComponent],
    imports: [BrowserModule, ProvidersModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
