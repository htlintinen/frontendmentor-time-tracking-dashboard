const xmlhttp = new XMLHttpRequest();
let data;
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        data = JSON.parse(this.responseText);
        setVisibleTimeframe('daily');
        data.forEach(act => {
            document.querySelector('.activity-container').appendChild(createActivity(act));
        });
    }
};
xmlhttp.open("GET", "data.json", true);
xmlhttp.send();

function createActivity(act) {
    let activity = document.createElement('div');
    // Add activity name as class written in lower case and spaces removed.
    activity.classList.add('activity', act.title.toLowerCase().replace(/\s/, ''));

    let activityData = document.createElement('div');
    activityData.classList.add('activity-data');

    let dataRow = document.createElement('div');
    dataRow.classList.add('data-row');

    let activityLabel = document.createElement('div');
    activityLabel.classList.add('activity-label');

    // Capitalize first letter of activity name
    let activitytext = document.createTextNode(`${act.title.charAt(0).toUpperCase()}${act.title.slice(1)}`);

    let activityIcon = document.createElement('img');
    activityIcon.setAttribute('src', './images/icon-ellipsis.svg');
    activityIcon.setAttribute('alt', `More actions for ${act.title.toLowerCase()}`);

    let dataRowDuration = document.createElement('div');
    dataRowDuration.classList.add('data-row','duration');

    let activityDuration = document.createElement('div');
    activityDuration.classList.add('activity-duration');
    let activityDurationText = document.createTextNode(formatTime(act.timeframes.daily.current));

    let activityPrevDuration = document.createElement('div');
    activityPrevDuration.classList.add('activity-prev-duration');
    let activityPrevDurationText = document.createTextNode(`Previous - ${formatTime(act.timeframes.daily.previous)}`);

    activityDuration.appendChild(activityDurationText);
    activityPrevDuration.appendChild(activityPrevDurationText);

    dataRowDuration.appendChild(activityDuration);
    dataRowDuration.appendChild(activityPrevDuration);
    
    activityLabel.appendChild(activitytext);
    
    dataRow.appendChild(activityLabel);
    dataRow.appendChild(activityIcon);

    activityData.appendChild(dataRow);
    activityData.appendChild(dataRowDuration);
    activity.appendChild(activityData);

    return activity;

}

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
        activity.querySelector('.activity-duration').innerHTML = formatTime(times.current);
        activity.querySelector('.activity-prev-duration').innerHTML = 
            `Previous - ${formatTime(times.previous)}`;
    });
};

function formatTime(time) {
    // Format time with hr or hrs (1hr, everything else e.g. 7hrs, 0hrs)
    return `${time}hr${(time !== 1 ? 's' : '')}`
}

