import Navigo from 'navigo';
import 'bootstrap';
import '@fortawesome/fontawesome-free';
import './scss/styles.scss';

import HeaderComponent from './app/components/header/header.js';
import FooterComponent from './app/components/footer/footer.js';
import HomeComponent from './app/pages/home/home.js';
import AboutComponent from './app/pages/about/about.js';

import './img/Image.jpg';


console.log("Hello World!");

export const router = new Navigo('/');

window.addEventListener('load', () => {
    HeaderComponent();
    FooterComponent();


    router
    .on('/', HomeComponent)
    .on('/about', AboutComponent)
    .on('/contact', ContactComponent)
    .on('./add', AddComponent)
    .resolve();

    // listen to all clicks
    document.addEventListener('click', event =>{
        // if there's a route attribute, do some internal routing
        if (event.target.attributes['route']){
            event.preventDefault();
            router.navigate(event.target.attributes['routes'].value);
        }
    });

});
