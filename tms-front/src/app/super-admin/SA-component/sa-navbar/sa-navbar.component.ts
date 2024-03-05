import { Component, OnInit } from '@angular/core';
import{ SaService } from '../../sa.service';
import { AuthService } from '../../../login/auth/auth.service';
import { Router,NavigationEnd  } from '@angular/router';



@Component({
  selector: 'app-sa-navbar',
  templateUrl: './sa-navbar.component.html',
  styleUrls: ['./sa-navbar.component.css']
})
export class SANavbarComponent implements OnInit { 
  currentPageName: string = '';
  isFullScreen = false;
  elem = document.documentElement;
  isFullscreen = false;
  constructor(public saService: SaService, public authService:  AuthService, private router: Router) 
  {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Extract the page name from the route URL
        this.currentPageName = this.getPageNameFromRoute(this.router.url);
      }
    });
  }

  currentTime: Date = new Date();

  ngOnInit(): void {
      // Update the time every second
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }
  private getPageNameFromRoute(url: string): string {
    // You can implement your logic here to extract the page name
    // For example, if your routes are structured like '/dashboard', '/products', etc.
    // You can split the URL and take the last segment as the page name
    const segments = url.split('/');
    return segments[segments.length - 1];
  }

  public toggleMenu() {
    this.saService.toggleMenu();
  }
  logout(){
    this.authService.logout();
  }
  home(){
    this.router.navigate(['/sa/home']);
  }
  users(){
    this.router.navigate(['/sa/users']);
  }
  devices(){
    this.router.navigate(['sa/devices']);
  }
  notifications(){
    this.router.navigate(['sa/companies']);
  }
  toggleFullScreen() {
    if (!this.isFullScreen) {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
        this.isFullScreen = true;
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        this.isFullScreen = false;
      }
    }
  }
}
