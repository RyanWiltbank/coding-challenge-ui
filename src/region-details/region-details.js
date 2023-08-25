import { inject } from 'aurelia-framework';
import { FishAPI } from '../fish-api';

@inject(FishAPI)
export class RegionDetail {
  constructor(api) {
    this.api = api;
    this.regionInfo = {};
    this.fishInfo = [];
  }

  activate(params, routeConfig) {
    this.routeConfig = routeConfig;
    let testPhrase = new RegExp(params.region.replace('-', ' '), 'i');

    this.api.goFish('abrradiology').then(data => {
      let rawData = data.filter((info) => testPhrase.test(info.NOAAFisheriesRegion));
      this.aggregateData(rawData);
      this.routeConfig.navModel.setTitle(this.regionInfo.name);
    });
  }

  aggregateData(rawData) {
    this.regionInfo.name = rawData[0].NOAAFisheriesRegion;
    this.regionInfo = {
      name: rawData[0].NOAAFisheriesRegion,
      avgCal: this.getAverage(rawData, 'Calories'),
      avgFat: this.getAverage(rawData, 'FatTotal')
    }
    this.fishInfo = this.getFishInfo(rawData);
    console.log(this.fishInfo);
  }

  getAverage(data, key) {
    let total = 0;
    let count = 0;

    data.forEach(entry => {
      let nextValue = parseFloat(entry[key]);
      if (nextValue) {
        total += nextValue;
        count++;
      }
    })

    return (total / count).toFixed(2);
  }

  getFishInfo(data) {
    return data.map((entry) => {
      return {
        name: entry.SpeciesName,
        images: entry.ImageGallery,
        calories: entry.Calories,
        fat: entry.FatTotal,
        description: this.removeHTMLTags(entry.PhysicalDescription)
      }
    });
  }

  removeHTMLTags(description) {
    return description.replace(/<[^>]*>/g, "")
  }
}
