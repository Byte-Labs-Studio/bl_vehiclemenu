import { Component } from '@angular/core'
import { NuiService } from '@services/nui.service'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    browserMode: boolean = NuiService.isBrowserMode
}
