import { NgModule } from '@angular/core'
import { VisibilityComponent } from './visibility/visibility.component'
import { CommonModule } from '@angular/common'
import { DebugComponent } from './debug/debug.component'
import { FormsModule } from '@angular/forms'

@NgModule({
    declarations: [VisibilityComponent, DebugComponent],
    imports: [CommonModule, FormsModule],
    exports: [VisibilityComponent, DebugComponent],
})
export class ProvidersModule {}
