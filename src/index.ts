import './css/index.css';
import { View } from './index.d';
import PageMover from './ts/view/PageMover';

const pageMover: View = new PageMover();

pageMover.bindEvent();
