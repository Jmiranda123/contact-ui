import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Contact, ContactCreateDTO, ContactUpdateDTO } from '../model/contact.model';


export class ContactPagination {
  page: number;
  size: number;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactUrl: string;

  constructor(private http: HttpClient) {
    this.contactUrl = `${environment.apiUrl}`
  }

  findContact(contactId: number): Promise<Contact> {
    return this.http.get<Contact>(`${this.contactUrl}/${contactId}`).toPromise();
  }

  updateContact(contactId: number, dto: ContactUpdateDTO) {
    return this.http.put(`${this.contactUrl}/${contactId}`, dto).toPromise();
  }

  deleteContact(contactId: number) {
    return this.http.delete(`${this.contactUrl}/${contactId}`).toPromise();
  }

  pagedSearch(pagination: ContactPagination): Promise<Contact[]> {
    return this.http.get<Contact[]>(`${this.contactUrl}?size=${pagination.size}&page=${pagination.page}`).toPromise();
  }

  createContact(dto: ContactCreateDTO) {
    return this.http.post(`${this.contactUrl}`, dto).toPromise();
  }
}
