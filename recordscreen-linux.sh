
apt install -y ffmpeg oss-compat alsa-oss
apt install mencoder

# in gui user account:
aoss ffmpeg -f oss -i /dev/dsp -f x11grab -s wxga -r 25 -i :0.0  /tmp/out5.mpg
mencoder  /tmp/out5.mpg -o /tmp/m001.mp4 -oac mp3lame -ovc x264 -of lavf -vf lavcdeint
adb shell am broadcast -a android.intent.action.MEDIA_SCANNER_SCAN_FILE -d file:///sdcard/Movies/python.mp4
