import { mount as todoMount } from 'todo/TodoIndex';
import { mount as cricketMount } from 'cricket/CricketIndex';

console.log('Container!');

todoMount(document.querySelector('#root-todo'));
cricketMount(document.querySelector('#root-cricket'));
