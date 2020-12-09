import React, {Component} from 'react';
import './App.css';
import Food from './components/Food';
import Snake from './components/Snake';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snake: [{x:0, y:0}],
      food: [40,10],
      direction: 'down',
      prevDirection: '',
      play: true
    }
  }

  componentDidMount() {
    onkeydown = this.onKeyDown;
    setInterval(this.moveSnake, 100);
  }

  onKeyDown = (e) => {

    e = e || window.event;
    // setPrevDirection(direction);
    if(e.keyCode == '38') {
      this.setState({direction: 'up', prevDirection: this.state.direction});
    }
    else if(e.keyCode == '40') {
      this.setState({direction: 'down', prevDirection: this.state.direction});
    }
    else if(e.keyCode == '37') {
      this.setState({direction: 'left', prevDirection: this.state.direction});
    }
    else if(e.keyCode == '39') {
      this.setState({direction: 'right', prevDirection: this.state.direction});
    }
  }

  moveSnake = () => {
    // console.log('here');
    const { snake, direction, food, prevDirection } = this.state;
    let newSnake = snake;
    if(direction === 'up') {
      newSnake.unshift({x: snake[0].x, y: snake[0].y - 2});
    }
    else if(direction === 'down') {
      newSnake.unshift({x: snake[0].x, y: snake[0].y + 2});
    }
    else if(direction === 'left') {
      newSnake.unshift({x: snake[0].x - 2, y: snake[0].y});
    }
    else if(direction === 'right') {
      newSnake.unshift({x: snake[0].x + 2, y: snake[0].y});
    }
    newSnake.pop();

    if(newSnake[0].x === food[0] && newSnake[0].y === food[1]) {
      if(prevDirection === 'left' || prevDirection === 'right') {
        newSnake.push({x: newSnake[newSnake.length-1] + (prevDirection === 'left' ? -2 : 2), y: newSnake[newSnake.length-1].y});
      }
      else if(prevDirection === 'up' || prevDirection === 'down') {
        newSnake.push({x: newSnake[newSnake.length-1], y: newSnake[newSnake.length-1].y + (prevDirection === 'up' ? 2 : -2)});
      }
      this.randomFood();
    }

    this.setState({snake: newSnake});
    if(this.obstacleHit()) console.log('hit obstacle');
  }

  obstacleHit = () => {
    const { snake } = this.state;

    let x = snake[0].x;
    let y = snake[0].y;
    let board = document.getElementById('board');

    if(x < 0 || y < 0 || x > board.clientWidth || y > board.clientHeight || this.hitSelf()) return true;
    return false;
  }

  hitSelf = () => {
    const { snake } = this.state;

    let head = snake[0];
    return snake.slice(1).filter((e) => {return e.x === head.x && e.y === head.y}).length > 0;
  }

  randomFood = () => {
    let x = Math.floor(Math.random() * 50) * 2;
    let y = Math.floor(Math.random() * 50) * 2;

    this.setState({food: [x, y]});
  }

  render() {

    const { snake, food } = this.state;

    return (
      <div id='board'>
        <Snake snakePos={snake}/>
        <Food foodPos={food}/>
      </div>
    )
  }
}

export default App;
