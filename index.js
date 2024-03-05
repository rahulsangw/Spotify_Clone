console.log("Welcome to spotify");

let songIndex=0;

let masterPlay = document.querySelector("#masterPlay");

let myProgressBar = document.getElementById("myProgressBar");
//Array of objects 
let songs =[

    {songName: "Tere Pyar Mein", filePath: "./resources/songs/Tere Pyar Mein.mp3", coverPath: "./covers/beach.jpg"},
    {songName: "Akhiyan Gulab", filePath: "./resources/songs/Akhiyan Gulab.mp3", coverPath: "./covers/coding.jpg"},
    {songName: "Attention", filePath: "./resources/songs/Attention.mp3", coverPath: "covers/1.jpg"},
    {songName: "Chaleya", filePath: "./resources/songs/Chaleya.mp3", coverPath: "covers/1.jpg"},
    {songName: "Ke-Ghungroo-Toot-Gaye", filePath: "./resources/songs/Ke-Ghungroo-Toot-Gaye.mp3", coverPath: "covers/1.jpg"},
    {songName: "Sher Khul Gaye", filePath: "./resources/songs/Sher Khul Gaye.mp3", coverPath: "covers/1.jpg"}

];

//audioElement.play();
let audioElement = new Audio('./resources/songs/'+songs[0].songName +'.mp3');
let masterSongName= songs[0].songName;

//Listen to Events
audioElement.addEventListener('timeupdate',()=>{
    
    //Update SeekBar


    //Calculating the playing completion in percentage
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    //console.log(progress);

    //first we set the initial value of progress bar to 0 (in html file) then as we get 
    //the calculated values the progress bar automatic changes as we update it below..
    myProgressBar.value = progress;
    
})

myProgressBar.addEventListener("change",()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

//Displaying Names of Songs
songs.forEach((val,i)=>{
    document.querySelectorAll(".songItem .songName")[i].innerText=val.songName;
})







//Controlling the list of song buttons
playButtons = document.querySelectorAll(".songItemPlay");

let i=1;
let current_id=0;
let current_song_id=0;
let ctr=0;


for(let i=0;i<playButtons.length;i++){

    ctr=1;
    playButtons[i].addEventListener("click",(e)=>{
        
        if(audioElement.paused || audioElement.currentTime<=0){

            audioElement.src= "./resources/songs/"+ songs[i].songName +".mp3";
            audioElement.currentTime=0;
            current_id=e.target.getAttribute("id");
            // console.log("inside if");
           current_song_id=parseInt(current_id);
            console.log(current_song_id);
           
            for(let j=0;j<songs.length;j++){

                if(j!=e.target.getAttribute("id"))//Adding playing button
                {
                    playButtons[j].classList.remove("fa-pause-circle");
                    playButtons[j].classList.add("fa-play-circle");
                }else//adding pause button
                {
                    playButtons[j].classList.add("fa-pause-circle");
                    playButtons[j].classList.remove("fa-play-circle");
                }
            }
        //    playButtons[i].classList.remove("fa-play-circle");
        //    playButtons[i].classList.add("fa-pause-circle");


            //here we are changing in the global audioElement hence we can now play songs individually
            document.querySelector("#masterSongName").innerText=songs[i].songName;
            audioElement.play();
           
            masterPlay.classList.remove("fa-play-circle");
            masterPlay.classList.add("fa-pause-circle");
            //handling the gif
            document.querySelector(".songInfo img").style.opacity=1;

        }else if ((audioElement.played || audioElement.currentTime>0) && (parseInt(e.target.getAttribute("id"))==current_song_id)){

            console.log("inside else if");
            console.log(parseInt(e.target.getAttribute("id")));
            
            console.log(current_id);
            audioElement.pause();
            playButtons[i].classList.add("fa-play-circle");
            playButtons[i].classList.remove("fa-pause-circle");
            masterPlay.classList.add("fa-play-circle");
            masterPlay.classList.remove("fa-pause-circle");
            //handling the gif
            document.querySelector(".songInfo img").style.opacity=0;

        }
        else{
            audioElement.src= "./resources/songs/"+ songs[e.target.getAttribute("id")].songName +".mp3";
            audioElement.currentTime=0;
            console.log("else ");
            current_id = e.target.getAttribute("id");
            current_song_id=parseInt(current_id);
            console.log(current_song_id);
            
            for(let j=0;j<songs.length;j++){

                if(j!=e.target.getAttribute("id")){
                    playButtons[j].classList.remove("fa-pause-circle");
                    playButtons[j].classList.add("fa-play-circle");
                }else{
                    playButtons[j].classList.add("fa-pause-circle");
                    playButtons[j].classList.remove("fa-play-circle");
                }
            }
            audioElement.play();  
        }
       
    })
}//end of for

//-------------------------------------------------------------------------------Controlling Previous Button----------------------------------------------------------
document.getElementById("previous").addEventListener('click',()=>{
    
   if(ctr==1){

        if(current_song_id>0){
            document.querySelectorAll(".songItemPlay")[current_song_id].classList.remove("fa-pause-circle");
            document.querySelectorAll(".songItemPlay")[current_song_id].classList.add("fa-play-circle");
            current_song_id-=1;
        }else{
            document.querySelectorAll(".songItemPlay")[current_song_id].classList.remove("fa-pause-circle");
            document.querySelectorAll(".songItemPlay")[current_song_id].classList.add("fa-play-circle");
            current_song_id=0;
        }
        //here we are changing in the global audioElement hence we can now play songs individually
        audioElement.src= "./resources/songs/"+songs[current_song_id].songName+".mp3";
        audioElement.currentTime=0;
        document.querySelector("#masterSongName").innerText=songs[current_song_id].songName;
        audioElement.play();
        document.querySelectorAll(".songItemPlay")[current_song_id].classList.add("fa-pause-circle");
        document.querySelectorAll(".songItemPlay")[current_song_id].classList.remove("fa-play-circle");
   }
   else{

        if(i>0){
            document.querySelectorAll(".songItemPlay")[i].classList.remove("fa-pause-circle");
            document.querySelectorAll(".songItemPlay")[i].classList.add("fa-play-circle");
            i-=1;
        }else{
            document.querySelectorAll(".songItemPlay")[i].classList.remove("fa-pause-circle");
            document.querySelectorAll(".songItemPlay")[i].classList.add("fa-play-circle");
            i=0;
        }
        //here we are changing in the global audioElement hence we can now play songs individually
        audioElement.src= "./resources/songs/"+songs[i].songName+".mp3";
        audioElement.currentTime=0;
        document.querySelector("#masterSongName").innerText=songs[i].songName;
        audioElement.play();
        document.querySelectorAll(".songItemPlay")[i].classList.add("fa-pause-circle");
        document.querySelectorAll(".songItemPlay")[i].classList.remove("fa-play-circle");

   }//end of outer else
    
     masterPlay.classList.remove("fa-play-circle");
     masterPlay.classList.add("fa-pause-circle");
     //handling the gif
     document.querySelector(".songInfo img").style.opacity=1;
})

//-------------------------------------------------------------------------------------------------Controlling Next Button----------------------------------------------
document.getElementById("next").addEventListener('click',()=>{
    
   
    current_song_id;
    if(ctr==1){

        if(current_song_id<songs.length-1){
            document.querySelectorAll(".songItemPlay")[current_song_id].classList.remove("fa-pause-circle");
            document.querySelectorAll(".songItemPlay")[current_song_id].classList.add("fa-play-circle");
            current_song_id+=1;
        }else{
            document.querySelectorAll(".songItemPlay")[current_song_id].classList.remove("fa-pause-circle");
            document.querySelectorAll(".songItemPlay")[current_song_id].classList.add("fa-play-circle");
            current_song_id=0;
        }
         //here we are changing in the global audioElement hence we can now play songs individually
         audioElement.src= "./resources/songs/"+songs[current_song_id].songName+".mp3";
         audioElement.currentTime=0;
        //  console.log(i);
        document.querySelector("#masterSongName").innerText=songs[current_song_id].songName;
        audioElement.play();
    
         document.querySelectorAll(".songItemPlay")[current_song_id].classList.add("fa-pause-circle");
         document.querySelectorAll(".songItemPlay")[current_song_id].classList.remove("fa-play-circle");


    }//end of outer if
    else{

        if(i<songs.length-1){
            document.querySelectorAll(".songItemPlay")[i].classList.remove("fa-pause-circle");
            document.querySelectorAll(".songItemPlay")[i].classList.add("fa-play-circle");
            i=i+1;
        }else{
            document.querySelectorAll(".songItemPlay")[i].classList.remove("fa-pause-circle");
            document.querySelectorAll(".songItemPlay")[i].classList.add("fa-play-circle");
            i=0;
        }
         //here we are changing in the global audioElement hence we can now play songs individually
         audioElement.src= "./resources/songs/"+songs[i].songName+".mp3";
         audioElement.currentTime=0;
        //  console.log(i);
        document.querySelector("#masterSongName").innerText=songs[i].songName;
         audioElement.play();
    
         document.querySelectorAll(".songItemPlay")[i].classList.add("fa-pause-circle");
         document.querySelectorAll(".songItemPlay")[i].classList.remove("fa-play-circle");

    }//end of outer else
    
     masterPlay.classList.remove("fa-play-circle");
     masterPlay.classList.add("fa-pause-circle");
     //handling the gif
     document.querySelector(".songInfo img").style.opacity=1;
})



//Handle Master Pause/Play Event
masterPlay.addEventListener('click',function(){

    document.querySelector("#masterSongName").innerText=songs[i].songName;

    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        
        playButtons[current_song_id].classList.remove("fa-play-circle");
        playButtons[current_song_id].classList.add("fa-pause-circle");
        //handling the gif
        document.querySelector(".songInfo img").style.opacity=1;

    }else if(audioElement.played || audioElement.currentTime>0){
        audioElement.pause();
        masterPlay.classList.add("fa-play-circle");
        masterPlay.classList.remove("fa-pause-circle");
        playButtons[current_song_id].classList.add("fa-play-circle");
        playButtons[current_song_id].classList.remove("fa-pause-circle");
        
         //handling the gif
        document.querySelector(".songInfo img").style.opacity=0;
        
    }   
});



