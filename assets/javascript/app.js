$(document).ready(function () {

   var config = {
    apiKey: "AIzaSyDt-bgkFDChiuljmuzUiwkqnx1QCI5fhug",
    authDomain: "train-scheduler-9a1a9.firebaseapp.com",
    databaseURL: "https://train-scheduler-9a1a9.firebaseio.com",
    projectId: "train-scheduler-9a1a9",
    storageBucket: "",
    messagingSenderId: "141427126632"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
      function newTrain() {
        var nameoftrain = $("#trainName").val().trim();
        var destination = $("#trainDestination").val().trim();
        var firstTrain = $("#FirstTrain").val().trim();
        var frequency = $("#trainFrequency").val().trim();

        database.ref("/trainData").push({
            TrainName: nameoftrain,
            TrainDestination: destination,
            InitalTrain: firstTrain,
            TrainFrequency: frequency
        });
      }

      database.ref("/trainData").on("child_added", function (data){
          var trainData = data.val();
          var train = $("<tr>");
          var name = $("<td>").text(trainData.TrainName);
          var destination2 = $("<td>").text(trainData.TrainDestination);
          var frequency2 = $("<td>").text(trainData.TrainFrequency);

          var First = moment(trainData.InitalTrain, "HH:mm").subtract(1, "years");
          var difference = moment().diff(moment(First), "minutes");
          var howLongtil = difference % trainData.TrainFrequency
          var timetil = trainData.TrainFrequency - howLongtil
          var next= moment().add(timetil, "minutes").format("HH:mm");
          var displayNext = $("<td>").text(next);
          var Nexttrain = $("<td>").text(timetil);
          
          train.append(name);
          train.append(destination2);
          train.append(frequency2);
          train.append(displayNext);
          train.append(Nexttrain);

          $("#trains").append(train)
        });
          $("#submit").click(newTrain);
    });
