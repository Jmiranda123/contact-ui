export class Contact {
  id: number;
  name: string;
  channel: string;
  value: string;
  obs: string;
}

export class ContactCreateDTO {
  name: string;
  channel: string;
  value: string;
  obs: string;
}

export class ContactUpdateDTO {
  name: string;
  channel: string;
  value: string;
  obs: string;
}
