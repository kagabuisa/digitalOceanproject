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

    fetch("https://api.digitalocean.com/v2/snapshots?page=1&per_page=100&resource_type=droplet", requestOptions)
        .then(response => {
            return response.json()
        })
        .then(medina => {
            console.log(medina)
            let xny = []
            for (let i = 0; i < medina.snapshots.length; i++) {
                //if(days>1){delete snapshot(create function to delete snapshot of matching ID)}
                //https://www.codecademy.com/forum_questions/50c207bd55df51ff27004775 (create object from loop)
                let x = medina.snapshots[i].created_at.slice(0, 10)
                let y = medina.snapshots[i].id
                if (checkAge(x) > 2) {
                    console.log(`Snapshot ID ${y} created on ${x} is ${checkAge(x)} days old and should be deleted`)
                } else {
                    console.log(`Snapshot ID ${y} created on ${x} is ${checkAge(x)} days old and should be kept`)
                }
                //  xny[i]={x:medina.snapshots[i].created_at.slice(0, 10),y:medina.snapshots[i].id};
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
//function to get list of snapshot
getSnapshotList();