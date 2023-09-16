import { Component, OnInit } from '@angular/core';
import { Receive, Send } from '@enums/events';
import { NuiService } from '@services/nui.service';
import { Option } from '@typings/options';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

    options: Option[] = [];

    constructor(private readonly nui: NuiService) {}

    optionClick(index: number) {
        const option = this.options[index];
        NuiService.SendEvent<Option, boolean>(Send.click, option).then((value: boolean) => {
            this.options[index].active = value;            
        });
    }
    
    ngOnInit(): void {
        this.nui.ReceiveEvent(Receive.update, (options: Option[]) => {
            this.options = options;
            
        })
    }
}
