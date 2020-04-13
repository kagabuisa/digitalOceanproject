function checkAge(x) {
    const today = new Date()
    xD = new Date(x)
    console.log(xD+'----'+today)
   return diffDate1 = Math.floor((today - xD)) / (1000 * 60 * 60 * 24)
     
     diffDate2 = Math.floor((today - xD))/(1000*60*60*24)
    console.log(`${diffDate1} --- console.log  Now the difference is ${diffDate2} Days`)
}
checkAge('2020-04-12');
function getSnapshotAndDelete() {
    let request = require('request');
    let options = {
        'method': 'GET',
        'url': 'https://api.digitalocean.com/v2/snapshots?page=1&per_page=20&resource_type=droplet',
        'headers': {
            'Authorization': 'Bearer b55f0a04ae134281f185d86f0e2f5456baa43a6dfddb7edc3cbf30a5877c1985',
            'Cookie': '__cfduid=dcea941712d2e0d1fbac975de663b92ac1586247452'
        }
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        let data = JSON.parse(response.body)
        for (let i = 0; i < data.snapshots.length; i++) {
            const newLocal = `${data.snapshots[i].created_at.slice(0, 10)}`
            //if(days>1){delete snapshot(create function to delete snapshot of matching ID)}
            let x = newLocal
            let y = data.snapshots[i].id
            if (checkAge(x) >= 1) {
                console.log(x+' in if')
                console.log(`Snapshot ID ${y} created on ${x} is ${checkAge(x)} days old and should not be deleted`)
            } else {
                console.log(x+' in else')
                console.log(`Snapshot ID ${y} created on ${x} is ${checkAge(x)} days old and should be kept`)
            }
           // console.log(response.body);
        }
    });
}
getSnapshotAndDelete()