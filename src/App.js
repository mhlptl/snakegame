import React, {Component} from 'react';
import './App.css';
import Food from './components/Food';
import Result from './components/Result';
import Snake from './components/Snake';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snake: [{x:0, y:0}],
      food: [40,10],
      direction: 'down',
      prevDirection: '',
      play: true,
      score: 0
    }
  }

  componentDidMount() {
    onkeydown = this.onKeyDown;
    this.timerId = setInterval(this.moveSnake, 100);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  onKeyDown = (e) => {

    e = e || window.event;

    if(e.keyCode === 38) {
      this.setState({direction: 'up', prevDirection: this.state.direction});
    }
    else if(e.keyCode === 40) {
      this.setState({direction: 'down', prevDirection: this.state.direction});
    }
    else if(e.keyCode === 37) {
      this.setState({direction: 'left', prevDirection: this.state.direction});
    }
    else if(e.keyCode === 39) {
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
      this.setState({score: this.state.score + 1});
      this.randomFood();
    }

    this.setState({snake: newSnake});
    if(this.obstacleHit()) {
      this.setState({play: false});
      clearInterval(this.timerId);
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

  render() {

    const { play, score } = this.state;

    return (
      <div className='container'>
        <div className='score-container'>
          <h1 id='score'>Score: {score * 10}</h1>
        </div>
        <div id='board'>
          {play ? this.game() : <Result result={'Sorry! Better luck next time!'} handleClick={() => this.tryAgain} />}
        </div>
      </div>
    )
  }
}

export default App;
