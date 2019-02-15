import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { Contact } from "../models/contact";
import { ContactService } from "../../services/contact.service";
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  displayedColumns = ['name', 'email', 'twitter', 'phone', 'detail'];
  dataSource = new MatTableDataSource();

  public contacts: Contact[];
  public errorMessage: string;

  constructor(
    private contactService: ContactService,
    private router: Router
  ) { }

  ngOnInit() {
    this.onListContacts();
  }

  onListContacts() {
    this.contactService.list()
      .subscribe(
        contacts => this.dataSource.data = contacts,
        error => this.errorMessage);
  }

  onUpdateContact(id){
    this.router.navigate(['contact-update/' + id]);
  }

}
