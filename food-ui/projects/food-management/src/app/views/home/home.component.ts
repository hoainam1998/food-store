import { Component,  viewChild, ViewContainerRef, AfterViewInit } from '@angular/core';
import { HeaderComponent } from '@components/header/header.component';
import { FooterComponent } from '@components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from '@components/menu/menu.component';
import { ToastService } from 'app/services/toast/toast.service';

@Component({
  selector: 'fm-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, MenuComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
  toastDocker = viewChild('toastDocker', { read: ViewContainerRef });

  ngAfterViewInit() {
    ToastService.ToastDocker = this.toastDocker()!;
  }
}
