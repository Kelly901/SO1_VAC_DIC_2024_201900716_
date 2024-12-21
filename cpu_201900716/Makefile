obj-m += cpu_201900716.o

all:
	make -C /lib/modules/$(shell uname -r)/build M=$(shell pwed) modules

clean:
	make -C /lib/modules/$(shell uname -r)/build M=$(shell pwd) clean