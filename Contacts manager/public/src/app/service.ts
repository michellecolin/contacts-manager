/// <reference path="../../../typings/index.d.ts" />

module app.contact {

  export class AppService {
    contacts;
    methodsOptions;

    constructor() {
      this.contacts = [
        new Contact(1, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLyHTmJslVAT8rHW944V99fG7ivLdmPFGOOw6rKJ4HXiURG6i1', 'michelle', 'mih', [{type: {id: 2, name: "Whatsapp", icon: "fab fa-whatsapp"}, value: 0848498489}]),
        new Contact(2, 'https://img.huffingtonpost.com/asset/5c6ab0092500003502c88ce6.jpeg?cache=Idejm45rNe&ops=scalefit_630_noupscale', 'joana', 'jô', [{type: {id: 2, name: "Whatsapp", icon: "fab fa-whatsapp"}, value: 0848498489}]),
        new Contact(3, 'https://www.homemalpha.com.br/wp-content/uploads/2011/08/Homem-confiante.jpg', 'mateus', 'mat', [{type: {id: 2, name: "Whatsapp", icon: "fab fa-whatsapp"}, value: 0848498489}])
      ];

      this.methodsOptions = [
        {id: 1, name: 'Phone', icon: 'fas fa-phone'},
        {id: 2, name: 'Whatsapp', icon: 'fab fa-whatsapp'},
        {id: 3, name: 'Email', icon: 'fas fa-at'},
        {id: 4, name: 'Facebook', icon: 'fab fa-facebook-f'}
      ];

    }

    getContact(id) {
      return this.contacts.find(contact => {
        return contact.id == id;
      });
    }

    getContacts() {
      return this.contacts;
    }

    getMethodsOptions() {
      return this.methodsOptions;
    }

    saveContact(contact) {
      contact.id = 10;
      this.contacts.push(contact);

      console.log(this.contacts);
    }

    updateContact(contact) {
      this.contacts.find(ctc => {
        if (ctc.id === contact.id) {
          ctc = contact;
        }
      });
    }

    removeContact(id) {
      this.contacts.splice(id, 1);
    }
  }

  angular
    .module('contactsManagerApp')
    .service('AppService', AppService)
}