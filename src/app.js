import { PLATFORM } from 'aurelia-framework';

export class App {
  configureRouter(config, router) {
    this.router = router;
    config.options.pushState = true;
    config.options.root = '/';
    config.title = 'ABR';
    config.titleSeparator = ' | ';
    config.map([
      { route: ['', 'home'], name: 'home', moduleId: PLATFORM.moduleName('./home/home'), title: 'Home', nav: true },
      { route: 'region/:region', name: 'region', moduleId: PLATFORM.moduleName('./region-details/region-details') }
    ]);
  }

  title = "ABR Fish'n"
}
