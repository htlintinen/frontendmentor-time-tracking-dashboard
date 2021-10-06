const xmlhttp = new XMLHttpRequest();
let data;
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        data = JSON.parse(this.responseText);
    }
};
xmlhttp.open("GET", "data.json", true);
xmlhttp.send();

function setVisibleTimeframe(timeframe) {
    let times = document.querySelectorAll('.time');
    times.forEach(t => t.classList.remove('time-active'));
    document.getElementById(timeframe).classList.add('time-active');
}

function getTimes(activity, timeframe) {
    return data.find(elem => elem.title.toLowerCase() === activity.toLowerCase()).timeframes[timeframe.toLowerCase()];
};

function setTimes(timeframe) {
    currentTimeFrame = timeframe;
    setVisibleTimeframe(timeframe);
    let activities = document.querySelectorAll('.activity');
    activities.forEach(activity => {
        let actLabel = activity.querySelector('.activity-label').innerHTML;
        let times = getTimes(actLabel, timeframe);
        activity.querySelector('.activity-duration').innerHTML = `${times.current}hr${(parseInt(times.current) !== 1 ? 's' : '')}`;
        activity.querySelector('.activity-prev-duration').innerHTML = 
            `Previous - ${times.previous}hr${(parseInt(times.previous) !== 1 ? 's' : '')}`;
    });
};

