<!DOCTYPE html>
<html>
<head>
    <script src='jwplayer/jwplayer.js'></script>
    <script>jwplayer.key='dWwDdbLI0ul1clbtlw+4/UHPxlYmLoE9Ii9QEw==';</script>
</head>
<body>
    <div id="mediaplayer"></div>

<?php $link= getlink("https://fpdl.vimeocdn.com/vimeo-prod-skyfire-std-us/01/1893/9/234465040/832735262.mp4?token=1506486792-0x87b1e5f5ada51f5263c096e6268d58a3cbf44610&title=Xem%20Phim%20Nhi%E1%BB%87t%20%C4%90%E1%BB%99%20T%C3%ACnh%20Y%C3%AAu%20T%E1%BA%ADp%201%20VIETSUB%20-%20Thuy%E1%BA%BFt%20Minh"); ?>
   <script>
    jwplayer("mediaplayer").play();
    
    jwplayer("mediaplayer").setup({
    autostart: false,
    preload: "auto",
    controls: true,
    primary: "html5",
    flashplayer: "jwplayer/jwplayer.flash.swf",
    skin: {"name": "tube", "url":"jwplayer/tube/tube.min.css"},
    stagevideo: false,
    stretching: "uniform",
    width: "800px",
    height: "500px",
    allowfullscreen: true,
    allowscriptaccess: "always",
    title: "Test",
    sources: [
    {
        "label": "360p",
        "type": "video/mp4",
        "file": "https://fpdl.vimeocdn.com/vimeo-prod-skyfire-std-us/01/1893/9/234465040/832735262.mp4?token=1506486792-0x87b1e5f5ada51f5263c096e6268d58a3cbf44610&title=Xem%20Phim%20Nhi%E1%BB%87t%20%C4%90%E1%BB%99%20T%C3%ACnh%20Y%C3%AAu%20T%E1%BA%ADp%201%20VIETSUB%20-%20Thuy%E1%BA%BFt%20Minh"
    }
    ],
   advertising: {
    client: 'googima',
    tag: 'https://www.adspeed.com/mp4/big_buck_bunny.mp4'
  }
    });
    
 
    jwplayer("mediaplayer").addButton( "jwplayer/downloads.png", "Download Video", function() { window.open(jwplayer("mediaplayer").getPlaylistItem()["file"], "_blank").blur(); }, "download" );
    </script>

    <script type="text/javascript">

var player = jwplayer('mediaplayer');
var theTimeout;
player.on('error', function() {
     theTimeout = setTimeout(function() {
    player.load();
    player.play();
  }, 2000);
});

player.on('play', function() {
  clearTimeout(theTimeout);

});
</script>

<?php
function getlink($url){
$headers = get_headers($url);

$link = str_replace('Location: ','',$headers[1]);
return $link;
}

?>
</body>
</html>