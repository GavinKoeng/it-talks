
#
# For wayland
#
rm -rf /tmp/temp_lossless.mov; clear; wf-recorder -a alsa_input.platform-snd-card_1.stereo-fallback -c qtrle -r 25 -f /tmp/temp_lossless.mov > /tmp/info.log 2>&1
rm -rf /tmp/out4.mp4; ffmpeg -y -i /tmp/temp_lossless.mov -c:v libx264 -preset veryfast -crf 26 -pix_fmt yuv420p -c:a aac -b:a 128k -af "volume=24dB" /tmp/out4.mp4
adb push /tmp/out4.mp4 /sdcard/Movies/
adb shell am broadcast -a android.intent.action.MEDIA_SCANNER_SCAN_FILE -d file:///sdcard/Movies/out4.mp4

#
# For x11
#

apt install -y ffmpeg oss-compat alsa-oss
apt install mencoder

# in gui user account:
#aoss ffmpeg -f oss -i /dev/dsp -f x11grab -s wxga -r 25 -i :0.0  /tmp/out5.mpg
#ffmpeg -f alsa -i plughw:1,0 -f x11grab -s wxga -r 25 -i :0.0  /tmp/out5.mpg
#clear; rm -rf /tmp/out5.mpg; ffmpeg -f alsa -i plughw:1,0 -f x11grab -s wxga -r 25 -i :0.0  /tmp/out5.mpg > /tmp/info.log 2>&1
clear; rm -rf /tmp/out5.mpg; ffmpeg -f alsa -i plughw:0,0 -f x11grab -s wxga -r 25 -i :0.0  /tmp/out5.mpg > /tmp/info.log 2>&1
mencoder  /tmp/out5.mpg -o /tmp/m001.mp4 -oac mp3lame -ovc x264 -of lavf -vf lavcdeint
adb shell am broadcast -a android.intent.action.MEDIA_SCANNER_SCAN_FILE -d file:///sdcard/Movies/python.mp4


gchen@clid12:~$ arecord -l
**** List of CAPTURE Hardware Devices ****
card 0: PCH [HDA Intel PCH], device 0: ALC256 Analog [ALC256 Analog]
  Subdevices: 1/1
  Subdevice #0: subdevice #0
card 1: Device [USB PnP Audio Device], device 0: USB Audio [USB Audio]
  Subdevices: 1/1
  Subdevice #0: subdevice #0
gchen@clid12:~$ 
