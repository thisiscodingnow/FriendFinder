// LOAD DATA
// These data sources hold arrays of information on friends-data.
// ===============================================================================
var friends = require("../data/friends");

// ROUTING
module.exports = function(app){
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)

app.get("/api/friends", function(req,res){
    res.json(friends)
});

app.post("/api/friends",function(req,res){

    // if (friends.length < 5) {
        // friends.push(req.body);
    //     res.json(true);
    //   }
// get the user input from survey form
    var possibleFriend= req.body;

    var scoreDifference=0;
    var scoreDifferenceLow=40;
    var scoreDifferenceLowIndex=0;
    

//=======================================================================================//
    for(i=0;i<possibleFriend.score;i++){
        // disregard the string and get the number 1, if score is strongly disagree
        if(possibleFriend.score[i]=="1 (Strongly Disagree"){
            possibleFriend.score[i]==1;
        }
        // disregard the string and get the number 5, if score is strongly Agree
        else if(possibleFriend.score[i]=="5 (Strongly Agree"){
            possibleFriend.score[i]==5;
        }
        // keep the corresponding score value for score 2,3,4,5 
        else{
            possibleFriend.score[i]== parseInt(possibleFriend.score[i]);
        }
    }
 //=======================================================================================//
   
        // compare the possibleFriend score with existing friends score on file.
        for(i=0;i<friends.length;i++){
            scoreDifference=0;//reset score difference when you start comparing to the next friend.
            for(j=0;j<friends[i].score.length;j++){
                //get absolute value of each score index difference 
                scoreDifference += Math.abs((friends[i].score[j]-possibleFriend.score[j]));
            }
            if(scoreDifference <= scoreDifferenceLow){// if score difference is lower than the predifined lowscore difference
             scoreDifferenceLow = scoreDifference;//replace scoredifference low with the new low score
             scoreDifferenceLowIndex=i;// get that lowest score index which is the friend match index.
  
            }
        }

        var bestMatch={};
        bestMatch = friends[scoreDifferenceLowIndex];
        res.json(bestMatch);
        friends.push(req.body)


});

// app.post("api/clear",function(req,res){
//     friends = friends[0];
//     res.json(friends)
// })

}
