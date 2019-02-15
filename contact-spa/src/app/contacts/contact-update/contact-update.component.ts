import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";

import { Subscription } from "rxjs/Subscription";

import { Contact } from "../../contacts/models/contact";
import { ContactService } from "../../services/contact.service";
import { DialogService } from '../../shared/dialog.service';

@Component({
  selector: 'app-contact-update',
  templateUrl: './contact-update.component.html',
  styleUrls: ['./contact-update.component.css']
})
export class ContactUpdateComponent implements OnInit {
  public updateContactForm: FormGroup;
  public contactId: string;
  public contact: Contact;
  public subscription: Subscription;
  public errors: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contactService: ContactService,
    private dialogService: DialogService
  ) {
    this.contact = new Contact();
  }

  ngOnInit() {
    this.updateContactForm = new FormGroup({
      id: new FormControl('', {}),
      name: new FormControl('', { validators: [Validators.required] }),
      email: new FormControl('', { validators: [Validators.required, Validators.email] }),
      twitter: new FormControl('', {}),
      phone: new FormControl('', {})
    });

    this.subscription = this.route.params.subscribe(
      params => {
        this.contactId = params['id'];
        this.getContact(this.contactId);
      }
    )
  }

  getContact(id: string) {
    this.contactService.get(id)
      .subscribe(
        contact => this.fillContact(contact)
      );
  }

  fillContact(contact: Contact) {
    this.contact = contact;

    this.updateContactForm.patchValue({
      name: this.contact.name,
      email: this.contact.email,
      twitter: this.contact.twitter,
      phone: this.contact.phone
    });
  }

  onUpdate() {
    if (this.updateContactForm.dirty && this.updateContactForm.valid) {
      let contact = Object.assign({}, this.contact, this.updateContactForm.value);
      contact.id = this.contactId;

      this.contactService.update(contact)
        .subscribe(
          res => { this.onUpdateComplete(res) }
        );
    }
  }

  onUpdateComplete(res: any) {
    this.updateContactForm.reset();
    this.router.navigate(['/contacts']);
  }

  onDelete() {
    this.dialogService
      .openConfirmDialog('Você tem certeza que deseja excluir esse contato ?')
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.contactService.delete(this.contactId)
            .subscribe(
              res => { this.onDeleteComplete(res) }
            );
        }
      });
  }

  // onDelete() {

  //   console.log(this.contactId);

  //   if (confirm("Você tem certeza que deseja excluir esse contato?")) {
  //     this.contactService.delete(this.contactId)
  //       .subscribe(
  //         res => { this.onDeleteComplete(res) }
  //       );
  //   }
  // }

  onDeleteComplete(res: any) {
    this.updateContactForm.reset();
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
