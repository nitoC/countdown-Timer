var tiMin = "00";
var tiSec = "00";
var brMin;
var brSec = 60;
var cont;
var nn = new Audio("https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3");
var verify = false;

const Sength = props => {
  return (
    React.createElement("div", { id: "display" },
    React.createElement("h1", { id: "timer_label" }, props.label),
    React.createElement("h1", { style: { "color": "red", "fontFamily": "Digital ,'Odibee Sans', cursive", "textAlign": "center" } },
    React.createElement("span", { id: "dMin", style: { "color": "red", "fontFamily": "Digital", "textAlign": "center" }, onClick: props.count }, props.show.min), ":",
    React.createElement("span", { id: "dSec", style: { "color": "red", "fontFamily": "Digital", "textAlign": "center" } }, props.show.sec)),



    React.createElement("span", null, React.createElement("p", { id: "start_stop", onClick: props.count }, "pl/ps"), React.createElement("p", { id: "reset", onClick: props.refresh }, "refsh"))));


};

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: {
        min: "00",
        sec: "00" },

      break: {
        min: "00",
        sec: "00" },

      label: "session" };


    this.displayMin = this.displayMin.bind(this);
    this.displaySec = this.displaySec.bind(this);
    this.displayBreakMin = this.displayBreakMin.bind(this);
    this.displayBreakSec = this.displayBreakSec.bind(this);
    this.countDown = this.countDown.bind(this);
    this.refresh = this.refresh.bind(this);
    this.secCount = this.secCount.bind(this);
    this.getSec = this.getSec.bind(this);
    this.getMin = this.getMin.bind(this);
    this.getBrSec = this.getBrSec.bind(this);
    this.getBrMin = this.getBrMin.bind(this);
  }
  getMin() {
    if (this.state.timer.sec === "00") {
      return this.state.timer.min - 1;
    }
    return this.state.timer.min;

  }
  getSec() {
    if (this.state.timer.sec === "00") {
      return 59;
    }
    return this.state.timer.sec - 1;

  }
  getBrMin() {
    if (this.state.break.sec === "00") {
      return this.state.break.min - 1;
    }
    return this.state.break.min;

  }
  getBrSec() {
    if (this.state.break.sec === "00") {
      return 59;
    }
    return this.state.break.sec - 1;

  }
  //show minutes in Dom
  displayMin(event) {
    tiMin = event.target.value;
    if (event.target.value < 1 || event.target.value > 60) {
      return this.setState(
      {
        timer: {
          min: "00",
          sec: this.state.timer.sec },

        break: {
          min: this.state.break.min,
          sec: this.state.break.sec } });



    } else {
      return this.setState({
        timer: {
          min: event.target.value,
          sec: this.state.timer.sec },

        break: {
          min: this.state.break.min,
          sec: this.state.break.min } });


    }
  }
  //show seconds in dom
  displaySec(event) {
    tiSec = event.target.value;
    if (event.target.value < 1) {
      return this.setState(
      {
        timer: {
          min: this.state.timer.min,
          sec: "00" },

        break: {
          min: this.state.break.min,
          sec: this.state.break.sec } });



    } else
    if (event.target.value > 59 || this.state.timer.sec > 59) {
      return this.setState(
      {
        timer: {
          min: this.state.timer.min,
          sec: "00" },

        break: {
          min: this.state.break.min,
          sec: this.state.break.sec } });



    }
    return this.setState({
      timer: {
        min: this.state.timer.min,
        sec: event.target.value },

      break: {
        min: this.state.break.min,
        sec: this.state.break.sec } });



  } /******
    handler for onchange of break length
    *********/
  displayBreakMin(event) {
    brMin = event.target.value;
    if (event.target.value < 1 || event.target.value > 500000) {
      return this.setState(
      {
        timer: {
          min: this.state.timer.min,
          sec: this.state.timer.sec },

        break: {
          min: "00",
          sec: this.state.break.sec } });



    } else {
      return this.setState({
        timer: {
          min: this.state.timer.min,
          sec: this.state.timer.sec },

        break: {
          min: event.target.value,
          sec: this.state.break.sec } });


    }
  }
  //show seconds in dom
  displayBreakSec(event) {

    brSec = event.target.value;
    if (event.target.value < 1) {
      return this.setState(
      {
        timer: {
          min: this.state.timer.min,
          sec: this.state.timer.sec },

        break: {
          min: this.state.break.min,
          sec: "00" } });



    } else
    if (event.target.value > 59 || this.state.timer.sec > 59) {
      return this.setState(
      {
        timer: {
          min: this.state.timer.min,
          sec: this.state.timer.sec },

        break: {
          min: this.state.break.min,
          sec: "00" } });



    }
    return this.setState({
      timer: {
        min: this.state.timer.min,
        sec: this.state.timer.sec },

      break: {
        min: this.state.break.min,
        sec: event.target.value } });



  }
  //seonds countdown
  secCount() {
    if (this.state.timer.min <= 0 && this.state.timer.sec <= 0) {
      if (this.state.break.min <= 0 && this.state.break.sec <= 0 || this.state.break.min <= "00" && this.state.timer.sec <= "00") {
        clearInterval(cont);
        nn.currentTime = 0;
        nn.load();
        nn.play();

        return this.setState({
          timer: {
            min: "00",
            sec: "00" },

          break: {
            min: "00",
            sec: "00" } });


      }
      this.setState({
        timer: {
          min: this.state.break.min,
          sec: this.state.break.sec },

        break: {
          min: this.state.break.min,
          sec: this.state.break.sec },

        label: "break" });

    }
    if (this.state.timer.sec <= 0) {
      this.setState({
        timer: {
          min: this.state.timer.min - 1,
          sec: 60 },

        break: {
          min: this.state.break.min - 1,
          sec: 60 } });


    }
    this.setState((state, props) => {
      return {
        timer: {
          min: state.timer.min,
          sec: state.timer.sec - 1 },

        break: {
          min: state.break.min,
          sec: state.break.sec - 1 } };


    });

  }
  //count down function 
  countDown() {
    if (this.state.timer.min == 0 && this.state.timer.sec == 0) {
      return;
    }
    if (verify === false) {
      verify = true;

      this.setState({
        timer: {
          min: this.getMin(),
          sec: this.getSec() },

        break: {
          min: this.getBrMin(),
          sec: this.getBrSec() } });


      if (this.state.timer.min > -1 && this.state.timer.sec > 0 || this.state.timer.min > 0) {
        cont = setInterval(this.secCount, 1000);
      }
    } else
    {
      verify = false;
      clearInterval(cont);
    }

  }
  refresh() {

    nn.currentTime = 0;
    nn.pause();
    this.setState({
      timer: {
        min: tiMin,
        sec: tiSec },

      break: {
        min: brMin,
        sec: brSec },

      label: "session" });

  }


  render() {
    return (
      React.createElement("div", null,
      React.createElement("div", { id: "session-label" },
      React.createElement("h2", { style: { "color": "red" } }, "Sesson length"),
      React.createElement("label", null, "MIn:",
      React.createElement("input", { id: "min", type: "number", onChange: this.displayMin }), React.createElement("button", null, React.createElement("i", { className: "fa fa-arrow-down fa-2x" })),

      React.createElement("button", null,
      React.createElement("i", { className: "fa fa-arrow-up fa-2x" }))),
      React.createElement("br", null),
      React.createElement("label", null, "Sec:",
      React.createElement("input", { id: "sec", type: "number", onChange: this.displaySec })), React.createElement("button", null, React.createElement("i", { className: "fa fa-arrow-down fa-2x" })),

      React.createElement("button", null,
      React.createElement("i", { className: "fa fa-arrow-up fa-2x" })),
      React.createElement("br", null)),


      React.createElement("div", { id: "break-label" },
      React.createElement("h2", { style: { "color": "red" } }, "Break length"),
      React.createElement("label", null, "MIn:",
      React.createElement("input", { id: "bmin", type: "number", onChange: this.displayBreakMin }),
      React.createElement("button", null,
      React.createElement("i", { className: "fa fa-arrow-down fa-2x" })),

      React.createElement("button", null,
      React.createElement("i", { className: "fa fa-arrow-up fa-2x" }))),
      React.createElement("br", null),
      React.createElement("label", null, "Sec:",
      React.createElement("input", { id: "bsec", type: "number", onChange: this.displayBreakSec }), React.createElement("button", null,
      React.createElement("i", { className: "fa fa-arrow-down fa-2x" })),

      React.createElement("button", null,
      React.createElement("i", { className: "fa fa-arrow-up fa-2x" }))),
      React.createElement("br", null)),


      React.createElement(Sength, { show: this.state.timer, count: this.countDown, refresh: this.refresh, label: this.state.label })));


  }}


ReactDOM.render(React.createElement(Timer, null), document.getElementById('wrapper'));