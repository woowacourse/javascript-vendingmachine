import './css/index';
import startApp from './ts/app';
import { on } from './ts/dom/domHelper';

on(window, 'DOMContentLoaded', startApp);
