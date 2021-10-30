const daily_btn = $(".daily");
const weekly_btn = $(".weekly");
const monthly_btn = $(".monthly");

var timeframes = [];
var dailyArr = [];
var weeklyArr = [];
var monthlyArr = [];
var currArr = [];
var prevArr = [];

async function getJSONData(value) {
  await fetch('./data.json')
    .then(res => res.json())
    .then(data => data.forEach(obj => timeframes.push(obj.timeframes)));
  timeframes.forEach(item => {
    dailyArr.push(item.daily);
    weeklyArr.push(item.weekly);
    monthlyArr.push(item.monthly);
  });
  assignTimeframe(value);
  timeframes = [];
  dailyArr = [];
  weeklyArr = [];
  monthlyArr = [];
};

let assignTimeframe = (value) => {
  let preValue;
  switch (value) {
    case 1:
      dailyArr.forEach(daily => currArr.push(daily.current));
      dailyArr.forEach(daily => prevArr.push(daily.previous));
      preValue = "Day";
      updateValues(currArr, prevArr, preValue);
      break;
    case 2:
      weeklyArr.forEach(weekly => currArr.push(weekly.current));
      weeklyArr.forEach(weekly => prevArr.push(weekly.previous));
      preValue = "Week";
      updateValues(currArr, prevArr, preValue);
      break;
    case 3:
      monthlyArr.forEach(monthly => currArr.push(monthly.current));
      monthlyArr.forEach(monthly => prevArr.push(monthly.previous));
      preValue = "Month";
      updateValues(currArr, prevArr, preValue);
      break;
    default:
      alert("Cannot assign timeframe");
  }
  currArr = [];
  prevArr = [];
};

let updateValues = (currArr, prevArr, preValue) => {
  let i = 1, j = 1;
  currArr.forEach(curr => $("#current_" + (i++) + "> span").text(curr));
  prevArr.forEach(prev => $("#previous_" + (j++) + "> span").text(preValue + " - " + prev));
};

let setResponse = (value) => {
  getJSONData(value);
  $(".link_" + value).addClass("active");
  $(".links > p:not(" + ".link_" + value + ")").removeClass("active");
};

daily_btn.click(() => setResponse(1));
weekly_btn.click(() => setResponse(2));
monthly_btn.click(() => setResponse(3));
