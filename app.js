const http = require("http");
const https = require("https");
const server = http.createServer( (req, res) => {
    var data = "";
  if (req.url == "/getTimeStories" && req.method == "GET") {
    https.get("https://time.com/", (response) => {
      response.on("data", (chunk) => {
        data += chunk;
      });
      response.on("end", function () {
      getData(data)
      });
    });
function getData(data){
    let arr=[]
    let temp= data.split("<div class=\"partial latest-stories\" data-module_name=\"Latest Stories\">")
    let temp2=temp[1].toString().split("</section>")
    let temp3=temp2[0].toString().split("<li class=\"latest-stories__item\">\n ")
    let tempHREF=temp3.toString().split(`<a href=`)
    let temp_cut_HREF=tempHREF.toString().split("/\">\n")
    let temp4=temp_cut_HREF.toString().split("<h3 class=\"latest-stories__item-headline\">")
   let final=temp4.toString().split("</h3>\n              </a>\n              <time class=\"latest-stories__item-timestamp\">\n")
    let final1=final.toString().split(" EDT\n </time>\n </li>\n,,\"/")
    let final2=final1.toString().split("\n <h2 class=\"latest-stories__heading\">Latest Stories</h2>\n <ul>\n , ,\"/")
    let final3=final2.toString().split(",,")
    let final4=final3.toString().split(",")
    for(let i=1;i<final4.length;i++){
        if(final4){
            if(final4[i][0]!=" "){
                    arr.push(final4[i])
            }
        }
    }
    let d=[]
    for(let j=0;j<12;j+=2){
        let a={}
            a["title"]=arr[j+1]
            a["link"]="https://time.com/"+arr[j]
        d.push(a)
    }
    console.log(arr)
   console.log(d)
    res.write(JSON.stringify(d));
    res.end();
}
  }
});

server.listen(5050, () => {
  console.log("connected " + 5050);
});
