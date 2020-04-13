//------------------------------------------------------------------------------------------------get date and date/time
const request = require('request');
const cron = require('node-cron');
const detailsofHeaders = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer b55f0a04ae134281f185d86f0e2f5456baa43a6dfddb7edc3cbf30a5877c1985',
    'Cookie': '__cfduid=dcea941712d2e0d1fbac975de663b92ac1586247452'
}
let currDate = new Date()
let date = currDate.getDate();
let month = currDate.getMonth(); //Be careful! January is 0 not 1
let year = currDate.getFullYear();
let time = currDate.toLocaleTimeString('en-UK');
let newToday = date + "-" + (month + 1) + "-" + year + " " + time;
//----------------------------------------------------------------------------------------get snapshot id,age and delete
function getSnapshotAndDelete() {
    let options = {
        'method': 'GET',
        'url': 'https://api.digitalocean.com/v2/snapshots?page=1&per_page=20&resource_type=droplet',
        'headers': detailsofHeaders
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        let data = JSON.parse(response.body)
        //---------------------------------------if(days>1){delete snapshot(create function to delete snapshot of matching ID)}
        for (let i = 0; i < data.snapshots.length; i++) {
            let x = data.snapshots[i].created_at.slice(0, 10)
            let y = data.snapshots[i].id
            if (checkAge(x) > 0) {
                deleteSnapshot(y)
                console.log(`Snapshot ID ${y} created on ${x} and is ${checkAge(x)} is greater than 3 days old and should be deleted`)
            } else {
                console.log(`Snapshot ID ${y} created on ${x} and is ${checkAge(x)} is less than 3 days old and should be kept`)
            }
            //console.log(response.body);
        }
    });
}
//-------------------------------------------------------------------------------------------function to check age of snapshot
function checkAge(x) {
    const today = new Date()
    xD = new Date(x)
    return diffDate = Math.ceil((today - xD)) / (1000 * 60 * 60 * 24)
}
//---------------------------------------------------------------------------------------------function to delete old snapshot
function deleteSnapshot(y) {
    const apiURL = "https://api.digitalocean.com/v2/snapshots/"
    let apendedapiURL = apiURL.concat(y)
    let options = {
        'method': 'DELETE',
        'url': apendedapiURL,
        'headers': detailsofHeaders
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        //console.log(response.body);
    });
}
//-----------------------------------------------------------------------------------------------------------node createsnapshot
function createSnapshot(dropletName, optionsURL) {
    let snapShotname = dropletName.concat(newToday)
    let options = {
        'method': 'POST',
        'url': optionsURL,
        'headers': detailsofHeaders,
        body: JSON.stringify({
            "type": "snapshot",
            "name": snapShotname
        })
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        //console.log(response.body);
    });
}
//------------------------------------------------------------------------------------------------------------Get list of droplets
function getDropletlistSnapshot() {
    let options = {
        'method': 'GET',
        'url': 'https://api.digitalocean.com/v2/droplets?page=1&per_page=20',
        'headers': detailsofHeaders
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        let data = JSON.parse(response.body)
        for (let i = 0; i < data.droplets.length; i++) {
            let dropletName = `${data.droplets[i].name} `
            let dropletID = data.droplets[i].id
            let optionsURL = `https://api.digitalocean.com/v2/droplets/${dropletID}/actions`
            createSnapshot(dropletName, optionsURL) //creates snapshot passing in droplet name and API link
            console.log(dropletName, dropletID)
        }
    });
}
//----------------------------------------------------------------------------------------cron job to run functions every so often
// function dropletManagementCron(){
//     cron.schedule('04 23 * * *',getDropletlistSnapshot);
//     cron.schedule('30 23 * * *',getSnapshotAndDelete);
// }
//dropletManagementCron();
 getDropletlistSnapshot();
 getSnapshotAndDelete();