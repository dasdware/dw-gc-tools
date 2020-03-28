import App from './App';
import {h, render} from 'preact';

const node = document.getElementById('app')
render(<App />, node!, node!.lastChild as Element)
