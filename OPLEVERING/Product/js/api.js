addLoadEvent(function(){
  getNews();
});

function getImages() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.responseText);
      startImageDisplay(convertImages(response));
    }
  }
  xhttp.open("GET", "https://pixabay.com/api/?key=7430628-bbda6cc1d76ec28dc0998c789&q=train&orientation=horizontal&safesearch=true", true);
  xhttp.send();
}

function convertImages(responseImages) {
  var imageList = [];
  for (let i = 0; i < responseImages.hits.length; i++) {
    imageList.push(responseImages.hits[i].webformatURL);
  }
  return imageList
}

function getNews() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(this.responseText)
      convertNews(response);
    }
  }
  xhttp.open("GET", "https://newsapi.org/v2/top-headlines?sources=rtl-nieuws&apiKey=3241cc607d464f6f96de80645dd2ed4e", true);
  xhttp.send();
}

function convertNews(response) {
  var headlines_list = [];
  var article_list = [];
  var time_list = []
  for (let i = 0; i < response.articles.length; i++) {
    headlines_list.push(response.articles[i].title);
    article_list.push(response.articles[i].description);
    time_list.push(response.articles[i].publishedAt);
  }
  news_data = [time_list, headlines_list, article_list];
  setPanels(news_data);
}

function setPanels(news_data) {
  startNewsDisplay(news_data);
  startTimeDisplay();
  getImages();
}

function startNewsDisplay(news_data) {
  var headline_box = document.getElementById('headline_box');
  var article_box = document.getElementById('article_box');
  var news_count = 0;
  setInterval(function () {
    // datum + tijd + titel
    // artikel
    let headline_string = convertTime(news_data[0][news_count]) + " - " + news_data[1][news_count];
    let article_string = news_data[2][news_count]
    headline_box.setAttribute("text", "value", headline_string);
    article_box.setAttribute("text", "value", article_string);
    news_count++;
    if (news_count >= 10) {
      news_count = 0
    }
  }, 10000);
}

function startImageDisplay(image_list) {
  var display = document.getElementById('reclame_scherm');
  var current_display = 0;
  setInterval(function () {
    if (current_display > 19) {
      current_display = 0
    }
    display.setAttribute("material", "src", image_list[current_display]);
    current_display++
  }, 10000);
}

function startTimeDisplay() {
  var time_box = document.getElementById('time_box');
  // setInterval(function () {
    var now = new Date();
    now = now.toLocaleDateString() + "\n \n" + now.toLocaleTimeString()
    time_box.setAttribute("text", "value", now);
  // }, 1000);
}

function convertTime(json_time) {
  let date = new Date(json_time);
  let current_time = date.getHours() + ":" + date.getMinutes();
  let human_time = convertDay(date) + date.getDate() + convertMonth(date) + " " + current_time;
  return human_time;
}

function convertMonth(date) {
  let month_string = "";
  month_integer = date.getMonth();
  switch (month_integer) {
    case 0:
      month_string = "jan";
      break;
    case 1:
      month_string = "feb";
      break;
    case 2:
      month_string = "maa";
      break;
    case 3:
      month_string = "apr";
      break;
    case 4:
      month_string = "mei";
      break;
    case 5:
      month_string = "jun";
      break;
    case 6:
      month_string = "jul";
      break;
    case 7:
      month_string = "aug";
      break;
    case 8:
      month_string = "sep";
      break;
    case 9:
      month_string = "okt";
      break;
    case 10:
      month_string = "nov";
      break;
    case 11:
      month_string = "dec";
      break;
    default:
      month_string = "NDF";
  }
  return " " + month_string;
}

function convertDay(date) {
  let day_string = "";
  day_string = date.getDay();
  switch (day_string) {
    case 0:
      day_string = "Maa";
      break;
    case 1:
      day_string = "Din";
      break;
    case 2:
      day_string = "Woe";
      break;
    case 3:
      day_string = "Don";
      break;
    case 4:
      day_string = "Vri";
      break;
    case 5:
      day_string = "Zat";
      break;
    case 6:
      day_string = "Zon";
      break;
    default:
      day_string = "NDF";
  }
  return day_string + " ";
}
