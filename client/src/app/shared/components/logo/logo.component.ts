import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-logo",
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="logo" routerLink="/">
      <span class="glute">Glute</span>
      <span class="not">Not</span>
    </div>
  `,
  styles: [
    `
      .logo {
        font-size: 32px;
        font-weight: bold;
        letter-spacing: -1px;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        padding: 8px;
        user-select: none;
        white-space: nowrap;
      }

      .logo:hover {
        opacity: 0.9;
        transform: scale(1.02);
      }

      .glute {
        color: var(--primary-color);
      }

      .not {
        color: var(--warn-color);
        position: relative;
        margin-left: 2px;
      }

      .not::before {
        content: "";
        position: absolute;
        left: -2px;
        right: -2px;
        top: 50%;
        height: 3px;
        background-color: var(--warn-color);
        transform: rotate(-8deg);
        transition: all 0.3s ease;
      }

      .logo:hover .not::before {
        transform: rotate(-12deg) scaleX(1.1);
      }

      @media (max-width: 768px) {
        .logo {
          font-size: 28px;
        }
      }

      @media (max-width: 480px) {
        .logo {
          font-size: 24px;
        }
      }
    `,
  ],
})
export class LogoComponent {}
