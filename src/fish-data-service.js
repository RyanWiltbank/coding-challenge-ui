// data-service.js
import { inject } from 'aurelia-framework';

@inject()
export class DataService {
  data = [];

  updateData(newData) {
    this.data = newData;
  }

  getData() {
    return this.data;
  }
}
