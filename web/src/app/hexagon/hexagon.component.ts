import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hexagon',
  template: `
    <svg
    [style.fill]="fill"
    [attr.height]="height"
    [attr.width]="width"
    [style.scale]="scale"
    [style.filter]="filter"
	version="1.1"
    class=" transition-colors duration-100 ease-in-out"
	xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink"
	viewBox="0 0 184.751 184.751"
	xml:space="preserve"
	transform="rotate(90)"
	><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
		id="SVGRepo_tracerCarrier"
		stroke-linecap="round"
		stroke-linejoin="round"
	/><g id="SVGRepo_iconCarrier">
		<path
        stroke="var(--accent)"
        [attr.stroke-width]="stroke"
			d="M0,92.375l46.188-80h92.378l46.185,80l-46.185,80H46.188L0,92.375z"
		/>
	</g></svg>
  
  `,
})
export class HexagonComponent {
    fill: string = 'var(--accent)';
    stroke: string = '0';
    filter: string = "";

    @Input() public width: number | string = '100%';
    @Input() public height: number | string = '100%';

    @Input() set active(active: boolean) {
        this.fill = active ? 'var(--accent)' : 'var(--secondary)';
        this.stroke = active ? '0' : '0.5vw';
        this.filter = active ? 'drop-shadow(0 0 0.5vw var(--accent))' : 'drop-shadow(0 0 0.1vw var(--accent))';
    }

    @Input() public scale: number = 1;
}
