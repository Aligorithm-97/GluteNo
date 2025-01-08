import { Component } from "@angular/core";

@Component({
  selector: "app-logo-favicon",
  standalone: true,
  template: `
    <svg width="512" height="512" viewBox="0 0 512 512">
      <circle
        cx="256"
        cy="256"
        r="240"
        fill="#ffffff"
        stroke="#3f51b5"
        stroke-width="32"
      />
      <text
        x="50%"
        y="50%"
        text-anchor="middle"
        dy=".3em"
        style="
          font-size: 224px;
          font-weight: bold;
          font-family: 'Roboto', sans-serif;
          fill: #3f51b5;
        "
      >
        GN
      </text>
    </svg>
  `,
})
export class LogoFaviconComponent {}
