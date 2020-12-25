import React, {Component} from 'react';
import './App.css';
import Food from './components/Food';
import Result from './components/Result';
import Snake from './components/Snake';
import Start from './components/Start';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snake: [{x:0, y:0}],
      food: [40,10],
      direction: 'down',
      play: false,
      score: 0,
      start: true
    }
  }

  componentDidMount() {
    onkeydown = this.onKeyDown;
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  onKeyDown = (e) => {

    e = e || window.event;
    const { direction } = this.state;

    if(e.keyCode === 38 && direction !== 'down') {
      this.setState({direction: 'up'});
    }
    else if(e.keyCode === 40 && direction !== 'up') {
      this.setState({direction: 'down'});
    }
    else if(e.keyCode === 37 && direction !== 'right') {
      this.setState({direction: 'left'});
    }
    else if(e.keyCode === 39 && direction !== 'left') {
      this.setState({direction: 'right'});
    }
  }

  moveSnake = () => {
    const { snake, direction, food} = this.state;
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
      this.addToTail(newSnake, direction);
      this.setState({score: this.state.score + 1});
      this.randomFood();
    }

    this.setState({snake: newSnake});
    if(this.obstacleHit()) {
      this.setState({play: false});
      clearInterval(this.timerId);
    }
  }

  addToTail = (snake, direction) => {
    if(snake.length === 1) {
      if(direction === 'left' || direction === 'right') {
        snake.push({x: snake[snake.length-1].x + (direction === 'left' ? 2 : -2), y: snake[snake.length-1].y});
      }
      else {
        snake.push({x: snake[snake.length-1].x, y: snake[snake.length-1].y + (direction === 'down' ? -2 : 2)});
      }
    }
    else {
      if(snake[snake.length-1].x === snake[snake.length-2].x) {
        snake.push({x: snake[snake.length-1].x, y: snake[snake.length-1].y + (direction === 'down' ? -2 : 2)});
      }
      else if(snake[snake.length-1].y === snake[snake.length-2].y) {
        snake.push({x: snake[snake.length-1].x + (direction === 'left' ? 2 : -2), y: snake[snake.length-1].y});
      }
    }
  }

  obstacleHit = () => {
    const { snake } = this.state;

    let x = snake[0].x;
    let y = snake[0].y;

    if(x < 0 || y < 0 || x >= 100 || y >= 100 || this.hitSelf()) return true;
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

  game = () => {
    const { snake, food } = this.state;
    return (
      <React.Fragment>
          <Snake snakePos={snake}/>
          <Food foodPos={food}/>
      </React.Fragment>
    )
  }

  tryAgain = () => {
    this.setState({
      snake: [{x:0, y:0}],
      food: [40, 10],
      play: true,
      direction: 'down',
      score: 0
    });
    this.timerId = setInterval(this.moveSnake, 100);
  }

  handleClick = () => {
    this.setState({
      start: false,
      play: true
    });
    this.timerId = setInterval(this.moveSnake, 100);
  }

  render() {

    const { play, score, start } = this.state;

    return (
      <div className='container'>
        <div className='score-container'>
          <h1 id='score'>Score: {score * 10}</h1>
        </div>
        <div id='board'>
          {start ? <Start handleClick={() => this.handleClick}/> : play ? this.game() : <Result result={'Sorry! Better luck next time!'} handleClick={() => this.tryAgain} />}
        </div>
      </div>
    )
  }
}

export default App;
