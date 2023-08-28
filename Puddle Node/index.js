const child_process = require('child_process');
const http = require('http');
const WebSocketServer = require('ws').Server;
const fs = require("fs");



const server = http.createServer();

const PORT =30002

const wss = new WebSocketServer({
  port:8080
});


wss.on('connection', (ws, req) => {
  console.log(req.url.substring(1),"reqq")
  const rtmpUrl =req.url.substring(1)

 
  
  // const rtmpUrl = decodeURIComponent(match[1]);
  // console.log('Target RTMP URL:', rtmpUrl);

  const ffmpeg = child_process.spawn('ffmpeg', [
   '-i', '-', '-v', 'error',
   '-vcodec', 'copy', '-acodec', 'aac', '-b:a', '327600',

  // `${rtmpUrl}`
  'http://localhost:8000/live/ii.flv'

   ])

   ffmpeg.on('close', (code, signal) => {
    console.log('FFmpeg child process closed, code ' + code + ', signal ' + signal);
    ws.terminate();
    });
  
  
  ffmpeg.stdin.on('error', (e) => {
    console.log('FFmpeg STDIN Error', e);
  });
  
  ffmpeg.stderr.on('error', (e) => {
    console.log('FFmpeg STDERR first:', e);
  });

  ffmpeg.stderr.on('data', (data) => {
    console.log('FFmpeg STDERR:', data.toString());
  });

 
  ws.on('message', (msg) => {
    console.log('DATA Transcoding', msg);
    ffmpeg.stdin.write(msg);
  });
  
  wss.on('close', (e) => {
    ffmpeg.kill('SIGINT');
  });

  ffmpeg.stdout.on('data', function(data) {
    console.log( data.toString(),"data out");
  
   
  });
  
});


server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



// const main=()=>{


 
  
//   console.log("start")
//   const ffmpeg = child_process.spawn('ffmpeg', [
//   //  '-i', '-', '-v', 'error',
//   '-i','AnimePahe_Shingeki_no_Kyojin_-_The_Final_Season_-_Kanketsu-hen_-_01_720p_NanDesuKa.mp4',
//   '-c:a', 'aac', '-b:a', '128k',
//   '-f', 'flv',

//   // `${rtmpUrl}`
//   // 'rtmp://localhost:1935/live/STREAM_NAME'
//   'http://localhost:8000/live/STREAM_NAME.flv'
  

//    ])

//    ffmpeg.on('close', (code, signal) => {
//     console.log('FFmpeg child process closed, code ' + code + ', signal ' + signal);
   
//     });
  
  
//   ffmpeg.stdin.on('error', (e) => {
//     console.log('FFmpeg STDIN Error', e);
//   });
  
//   ffmpeg.stderr.on('error', (e) => {
//     console.log('FFmpeg STDERR first:', e);
//   });

//   ffmpeg.stderr.on('data', (data) => {
//     console.log('FFmpeg STDERR:', data.toString());
//   });

 
//   // ws.on('message', (msg) => {
//   //   console.log('DATA Transcoding', msg);
//   //   ffmpeg.stdin.write(msg);
//   // });
  
//   // wss.on('close', (e) => {
//   //   ffmpeg.kill('SIGINT');
//   // });

//   ffmpeg.stdout.on('data', function(data) {
//     console.log( data.toString(),"data out");
  
   
//   });
  
// };

// main()


