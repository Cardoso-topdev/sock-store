import ReactGA from 'react-ga';

export default function initGoogleAnalitycs(route) {
  ReactGA.initialize('UA-154995819-1');
  ReactGA.pageview(route);
}
