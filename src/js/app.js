import 'sanitize.css/sanitize.css';
import '../css/app.pcss';

class App {
  constructor() {
    console.log('hello, tokusetsu-template');
  }
}

document.addEventListerner('DOMContentLoaded', () => {
  window.app = new App();
});
