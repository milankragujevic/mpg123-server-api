mpg123-server-api
========================

### A REST API to shuffle music via mpg123

## Requirements
 - mpg123
 - alsa-utils  
 - nodejs + npm


### Important REST Endpoints:

Play music (shuffle):

	GET /play
    
Stop playing:

	GET /stop
    
Get current song info:

	GET /currentsong
    
Get the current volume level:

	GET /volume
    
Increase volume:

	GET /volume/up
    
Decrease volume:

	GET /volume/down
    

#### Works best on Raspberry Pi

### Acknowledgements

Based on [https://github.com/pwlin/mpg123-radio-server-api](pwlin/mpg123-radio-server-api), licensed under MIT. 