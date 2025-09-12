#!/bin/python3
import sys
import threading
from ctypes import *

threading.current_thread()

CPNIC_CB = CFUNCTYPE(c_int, c_char_p)

def myFuncC(strparam):
	try:
		print("callback string: %s" % strparam.decode("utf-8"))
		return 0
	except Exception as e:
		print(f"Error in callback: {e}")
		return -1

try:
	mylibc = cdll.LoadLibrary("./libpnic.so")
except OSError as e:
	print(f"Failed to load library: {e}")
	sys.exit(1)

ret = mylibc.pnic_reflect(CPNIC_CB(myFuncC), b"hello world")
sys.exit(ret)
