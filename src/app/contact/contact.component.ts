import { Component, OnInit } from '@angular/core';
import { ContactService, ContactPagination } from './contact.service';
import { Contact, ContactUpdateDTO, ContactCreateDTO } from '../model/contact.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactId: number;
  findedContact = new Contact();
  editing = false;
  oldContact: Contact;
  contacts: Contact[] = [];
  cols: any[];
  pagination = new ContactPagination();
  contactCreateDto = new ContactCreateDTO();
  disabledNextBtn = false;

  constructor(private contactService: ContactService) {
    this.pagination.page = 0;
    this.pagination.size = 5;
  }

  ngOnInit(): void {
    this.cols = [
      {field: "id", header: "Id"},
      {field: "name", header: "Nome"},
      {field: "channel", header: "Canal"},
      {field: "value", header: "Valor"},
      {field: "obs", header: "Observação"},
    ];
    this.pagedSearch();
  }

  pagedSearch() {
    this.contactService.pagedSearch(this.pagination).then(res => {
      if (res.length > 0) {
        this.contacts = res;
        this.disabledNextBtn = false;
      } else {
        this.pagination.page = this.pagination.page - 1;
        this.disabledNextBtn = true;
      }
    });
  }

  findContact() {
    this.contactService.findContact(this.contactId).then(res => {
      this.findedContact = res;
    });
  }

  initEdit() {
    this.oldContact = this.findedContact;
    this.editing = true;
  }

  cancelEdit() {
    this.findedContact = this.oldContact;
    this.editing = false;
  }

  updateContact() {
    const updateDto = this.contactToContactUpdateDTO();

    this.contactService.updateContact(this.findedContact.id, updateDto).then(() => {
      alert("Atualizado com sucesso!");
      this.pagedSearch();
      this.editing = false;
    })
  }

  contactToContactUpdateDTO() {
    let dto = new ContactUpdateDTO;

    dto.name = this.findedContact.name;
    dto.channel = this.findedContact.channel;
    dto.value = this.findedContact.value;
    dto.obs = this.findedContact.obs;

    return dto;
  }

  deleteContact() {
    const deletion = confirm("Deseja prosseguir?");
    if (deletion) {
      this.contactService.deleteContact(this.findedContact.id).then(() => {
        this.contactId = null;
        this.findedContact = new Contact;
        alert("Deletado com sucesso!");
        this.pagination.page = 0;
        this.pagedSearch();
      })
    }
  }

  disableNextBtn() {
    if (this.contacts.length < this.pagination.size) {
      return true;
    } else {
      return false;
    }
  }

  previousPage() {
    this.pagination.page = this.pagination.page - 1;
    this.pagedSearch();
  }

  nextPage() {
    this.pagination.page = this.pagination.page + 1;
    this.pagedSearch();
  }

  createContact() {
    this.contactService.createContact(this.contactCreateDto).then(() => {
      alert("Salvo com sucesso!");
      this.pagedSearch();
      this.contactCreateDto = new ContactCreateDTO();
    });
  }

}
