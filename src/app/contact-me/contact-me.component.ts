import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-contact-me',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss']
})
export class ContactMeComponent implements OnInit {
  contactForm!: FormGroup;
  title = 'let\'s talk about every thing.';
  isLoading = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.maxLength(100)]],
      message: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  async onSubmit() {
    if (this.contactForm.valid && !this.isLoading) {
      this.isLoading = true;
      
      const templateParams = {
        name: this.contactForm.value.name,
        email: this.contactForm.value.email,
        subject: this.contactForm.value.subject,
        message: this.contactForm.value.message
      };

      try {
        await emailjs.send(
          'service_f3sylzf',     // e.g., 'service_abc123'
          'template_96g0q05',    // e.g., 'template_xyz456'
          templateParams,
          'iek7S5HQP3jhLd6jp'      // e.g., 'xFjk34Yz...'
        );
        
        alert('Message sent successfully!');
        this.contactForm.reset();
      } catch (error) {
        console.error('Email failed:', error);
        alert('Failed to send message. Please try again later.');
      } finally {
        this.isLoading = false;
      }
    }
  }
}
