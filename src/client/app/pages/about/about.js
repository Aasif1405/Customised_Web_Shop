import tmplAbout from './about.ejs';

export default async (route) => {
    console.log(route);

    const strAbout = tmplAbout();

    document.getElementById('app').innerHTML= strAbout;

}