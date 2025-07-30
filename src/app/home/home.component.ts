import { Component, HostListener, Renderer2, ElementRef, AfterViewInit } from '@angular/core';
import { ContactMeComponent } from '../contact-me/contact-me.component';
import { CommonModule } from '@angular/common';
import { WorkExperienceComponent } from '../work-experience/work-experience.component';
import { EducationComponent } from '../education/education.component';
import { MyProjectComponent } from '../my-project/my-project.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ContactMeComponent, CommonModule, WorkExperienceComponent, EducationComponent, MyProjectComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  sectionIds = ['home', 'education', 'skills', 'projects', 'experience', 'contact'];
  isMobileMenuOpen = false;

  skills: Array<{ name: string; percent: number } > = [
    { name: 'Bootstrap', percent: 90 },
    { name: 'HTML CSS', percent: 95 },
    { name: 'JavaScript', percent: 92 },
    { name: 'TypeScript', percent: 90 },
    { name: 'Tailwind CSS', percent: 85 },
    { name: 'Angular Frontend', percent: 93 },
    { name: 'Node.js', percent: 88 },
    { name: 'Express.js', percent: 87 },
    { name: 'Mongo DB', percent: 85 },
    { name: 'Create PDF', percent: 80 },
    { name: 'Joi', percent: 75 },
    { name: 'ApexCharts', percent: 80 },
    { name: 'ngx-translate', percent: 85 },
    { name: 'gitLab', percent: 80 },
    { name: 'github', percent: 90 },
    { name: 'Storybook', percent: 70 },
    { name: 'Mapbox', percent: 75 },
    { name: 'Rxjs', percent: 85 },
    { name: 'DerivativeQuery', percent: 70 },
  ];

  get skillColumns(): Array<Array<{ name: string; percent: number }>> {
    const cols: Array<Array<{ name: string; percent: number }>> = [[], [], [], []];
    this.skills.forEach((skill, i) => {
      cols[i % 4].push(skill);
    });
    return cols;
  }

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit() {
    // Set Home as active by default
    this.setActiveLink('home');
    
    // Smooth scroll for anchor links
    const links = this.el.nativeElement.querySelectorAll('.navbar__links a, .mobile-menu__links a');
    links.forEach((link: HTMLAnchorElement) => {
      this.renderer.listen(link, 'click', (event: Event) => {
        event.preventDefault();
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          const target = this.el.nativeElement.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    // Prevent body scroll when menu is open
    if (this.isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    document.body.style.overflow = '';
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    // Close mobile menu on window resize if screen becomes larger
    if (window.innerWidth > 768 && this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  }

  setActiveLink(sectionId: string) {
    const links = this.el.nativeElement.querySelectorAll('.navbar__links a, .mobile-menu__links a');
    links.forEach((link: HTMLAnchorElement) => {
      const href = link.getAttribute('href');
      if (href && href.substring(1) === sectionId) {
        this.renderer.addClass(link, 'active');
      } else {
        this.renderer.removeClass(link, 'active');
      }
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    let currentSection = '';
    
    // If at the top of the page, set home as active
    if (window.scrollY < 100) {
      currentSection = 'home';
    } else {
      // Check other sections
      for (const id of this.sectionIds) {
        const section = document.getElementById(id);
        if (section) {
          const sectionTop = section.offsetTop - 80;
          if (window.scrollY >= sectionTop) {
            currentSection = id;
          }
        }
      }
    }
    
    const links = this.el.nativeElement.querySelectorAll('.navbar__links a, .mobile-menu__links a');
    links.forEach((link: HTMLAnchorElement) => {
      const href = link.getAttribute('href');
      if (href && href.substring(1) === currentSection) {
        this.renderer.addClass(link, 'active');
      } else {
        this.renderer.removeClass(link, 'active');
      }
    });
  }

  downloadCV(): void {
    const link = document.createElement('a');
    link.href = 'assets/Masood-Ahmad-CV.pdf'; // relative path to PDF
    link.download = 'Masood-Ahmad-CV.pdf';    // name of the file when downloaded
    link.click();
  }
}

