import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";

import { Contact } from "../../contacts/models/contact";
import { ContactService } from "../../services/contact.service";

@Component({
  selector: 'app-contact-insert',
  templateUrl: './contact-insert.component.html',
  styleUrls: ['./contact-insert.component.css']
})
export class ContactInsertComponent implements OnInit {
  public insertContactForm: FormGroup;
  public contact: Contact;
  public errors: any[] = [];

  constructor(
    private router: Router,
    private contactService: ContactService
  ) {
    this.contact = new Contact();
  }

  ngOnInit() {
    this.insertContactForm = new FormGroup({
      name: new FormControl('', { validators: [Validators.required] }),
      email: new FormControl('', { validators: [Validators.required, Validators.email] }),
      twitter: new FormControl('', {}),
      phone: new FormControl('', {})
    });
  }

  onInsert() {
    if (this.insertContactForm.dirty && this.insertContactForm.valid) {
      let contact = Object.assign({}, this.contact, this.insertContactForm.value);

      this.contactService.insert(contact)
        .subscribe(
          res => { this.onInsertComplete(res) }
        );
    }
  }

  onInsertComplete(res: any) {
    this.insertContactForm.reset();
    this.router.navigate(['/contacts']);
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
}
