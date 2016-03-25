import React, {Component} from 'react';

require.context('!!raw-loader!./images');

const images = require.context('./images');

function Attribution({info}) {
  const {title, author, link, license} = info;
  return (<div className="attribution">
    <a href={link}>{title}</a>
    <span> </span>
    <span>by {author}</span>
    <span> </span>
    <a href={license}>license</a>
  </div>);
}

function Slide({name, active}) {
  return (<div
    className={'image ' + (active ? 'active' : '')}>
    <img src={images('./' + name + '.jpg')} />
    <Attribution info={images('./' + name + '.jpg.json')} />
  </div>);
}

function Nav() {
  return (<nav className="nav">
    <a href="index.html">baked</a>
    <span> </span>
    <a href="unbaked.html">unbaked</a>
    <span> </span>
    <a href="https://github.com/mzgoddard/child-compiler-loader-list-webpack-plugin-example">github</a>
  </nav>);
}

export default class Main extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      active: '1',
      images: ['1', '2'],
    };

    this.step = this.step.bind(this);
  }

  step() {
    setTimeout(this.step, 10000);
    const index = this.state.images.indexOf(this.state.active);
    let nextIndex = index + 1;
    if (nextIndex >= this.state.images.length) {
      nextIndex = 0;
    }
    this.setState({
      active: this.state.images[nextIndex],
      images: this.state.images,
    });
  }

  componentWillMount() {
    if (typeof window !== 'undefined') {
      setTimeout(
        this.step,
        (typeof BAKED === 'undefined' || !BAKED) ? 3000 : 0
      );
    }
  }

  render() {
    const {active, images} = this.state;
    return (<div>
      {images.map(name => <Slide
        key={name}
        name={name}
        active={name === active} />
      )}
      <Nav />
    </div>);
  }
}
