import { FishAPI } from "../fish-api";
import { inject } from 'aurelia-framework';

@inject(FishAPI)
export class Home {
  constructor(api) {
    this.api = api;
    this.regions = [];
  }

  created() {
    this.api.goFish('abrradiology').then(data => this.createRegionsArray(data));
  }

  createRegionsArray(rawData) {
    let temp_regions = {};

    rawData.forEach((element) => {
      const region = element.NOAAFisheriesRegion;

      // Create the key value pair if it doesn't exist
      if (!temp_regions[region]) {
        temp_regions[region] = { totalFat: 0, totalCal: 0, fatCount: 0, calCount: 0 };
      }

      // Gather relavent info
      const nextFat = parseFloat(element.FatTotal)
      const nextCal = parseFloat(element.Calories)

      // Update values (conditionally to avoid NaN for null values)
      if (nextFat) {
        temp_regions[region].totalFat += nextFat;
        temp_regions[region].fatCount += 1;
      }

      if (nextCal) {
        temp_regions[region].totalCal += nextCal
        temp_regions[region].calCount += 1
      }
    });

    // calculate averages and put it into an array
    for (const region in temp_regions) {
      const regionEntry = temp_regions[region];
      this.regions.push({
        name: region,
        avgFat: (regionEntry.totalFat / regionEntry.fatCount).toFixed(2),
        avgCal: (regionEntry.totalCal / regionEntry.calCount).toFixed(2)
      });
    };
  }

  getRegionRouteName(regionName) {
    console.log(regionName.replace(' ', '-').toLowerCase());
    return regionName.replace(' ', '-').toLowerCase();
  }
}
