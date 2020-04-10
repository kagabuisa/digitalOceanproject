// var date1 = new Date("July 19, 2014");
// var date2 = new Date(doReport.action.started_at.slice(0,10));
// let diffDate= Math.floor((date-date2)/(1000*60*60*24))/365
// let today = Date.now()
// let newCurDate = Math.floor(date.date2()+10);

function getSnapshotList() {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer b55f0a04ae134281f185d86f0e2f5456baa43a6dfddb7edc3cbf30a5877c1985");
    myHeaders.append("Cookie", "__cfduid=dcea941712d2e0d1fbac975de663b92ac1586247452");
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    const httpReqlink = "https://api.digitalocean.com/v2/snapshots?page=1&per_page=100&resource_type=droplet"
    const dataFetch = fetch(httpReqlink, requestOptions)
        .then(response => {
            return response.json()
        })

    dataFetch.then(data => {
            for (let i = 0; i < data.snapshots.length; i++) {
                //if(days>1){delete snapshot(create function to delete snapshot of matching ID)}
                let x = data.snapshots[i].created_at.slice(0, 10)
                let y = data.snapshots[i].id
                if (checkAge(x) < 3) {
                   
                    console.log(`Snapshot ID ${y} created on ${x} is ${checkAge(x)} days old and should not be deleted`)
                } else {
                   deleteSnapshot(y)
                    console.log(`Snapshot ID ${y} created on ${x} is ${checkAge(x)} days old and should be kept`)
                }

            }
        })
        .catch(error => console.log('error', error));
}

//function to check age of snapshot
function checkAge(x) {
    const today = new Date("2020-04-10")
    xD = new Date(x)
    return diffDate = Math.floor((today - xD) / (1000 * 60 * 60 * 24))
}

//function to delete old snapshot
function deleteSnapshot(y){
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer b55f0a04ae134281f185d86f0e2f5456baa43a6dfddb7edc3cbf30a5877c1985");
myHeaders.append("Cookie", "__cfduid=dcea941712d2e0d1fbac975de663b92ac1586247452");

var requestOptions = {
  method: 'DELETE',
  headers: myHeaders,
  redirect: 'follow'
};

const apiURL = "https://api.digitalocean.com/v2/snapshots/"
let apendedapiURL = apiURL.concat(y)
console.log(apendedapiURL)
fetch(apendedapiURL, requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}
//-------------------------------------------------------------------------------------------------------------------
//function to get list of snapshot
getSnapshotList();