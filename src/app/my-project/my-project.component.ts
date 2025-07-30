import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-project.component.html',
  styleUrls: ['./my-project.component.scss']
})
export class MyProjectComponent {
  projects = [
    {
      id: 1,
      title: 'Strada World – Transportation Management SaaS.',
      company: 'OneClout',
      period: 'Sep 2023 - Present',
      tools: ['Angular', 'Nx', 'ng-query', 'Jest', 'ApexCharts', 'Highcharts', 'Storybook', 'Module Federation', 'i18n'],
      description: [
        'Resolving issues to ensure system reliability and performance',
        'Implementing a responsive user interface',
        'Adding support for language translation across the application.'
      ],
      images: [
        'assets/strada1.png',
        'assets/strada2.png',
        'assets/strada3.png',
        'assets/strada4.png',
        'assets/strada5.png',
      ],
      projectLink: 'https://premium.pocswc.dev.stradatms.net/time/dashboard'
    },
    {
      id: 2,
      title: 'Soffra',
      company: 'CodeBatch',
      period: 'Apr 2022 - Oct 2023',
      tools: ['Angular', 'Google map API', 'Node.js', 'Express.js', 'MongoDb'],
      description: [
        'Participated in 90%+ of the project, managed and developed all tasks related to data binding, API creation, data calculation, social login, routing, and managed components and modules.',
        'Project tracks athletic activities like running and cycling.',
        'Worked on both backend and frontend.'
      ],
      images: [
        'assets/sofra1.png',
        'assets/sofra2.png',
        'assets/sofra3.png',
        'assets/sofra4.png',
        'assets/sofra5.png'
      ],
      projectLink: 'https://sandbox.soffra.io'
    },
    {
      id: 3,
      title: 'figFront',
      company: 'CodeBatch',
      period: 'feb 2022 - Aug 2023',
      tools: ['HTML', 'CSS', 'Bootstrap', 'Angular', 'Node.js', 'Express.js', 'MongoDb'],
      description: [
        'Managed the complete web app from start to end, including UI/UX, module and component creation, RESTful API, and data binding.'
      ],
      images: [
        'assets/figfront1.png',
        'assets/figfront2.png'
      ],
      projectLink: 'https://personalfig.com/'
    }
  ];

  activeIndex = 0;
  activeImageIndex = 0;

  nextProject() {
    if (this.activeIndex < this.projects.length - 1) {
      this.activeIndex++;
      this.activeImageIndex = 0;
    }
  }

  prevProject() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
      this.activeImageIndex = 0;
    }
  }

  nextImage() {
    if (this.activeImageIndex < this.activeProject.images.length - 1) {
      this.activeImageIndex++;
    }
  }

  prevImage() {
    if (this.activeImageIndex > 0) {
      this.activeImageIndex--;
    }
  }

  get activeProject() {
    return this.projects[this.activeIndex];
  }

  get activeImage() {
    return this.activeProject.images[this.activeImageIndex];
  }

  openProjectLink() {
    if (this.activeProject.projectLink) {
      window.open(this.activeProject.projectLink, '_blank');
    }
  }

} 