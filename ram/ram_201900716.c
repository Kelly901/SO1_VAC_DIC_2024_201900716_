
#include <linux/module.h>
// kerne_info
#include <linux/kernel.h>
//header par los macros inicializacion
#include <linux/init.h>
//funciones procfs
#include <linux/proc_fs.h>
//copia de datos entre espacio de user y espacio kernel
#include <asm/uaccess.h>
//para seq_file
#include <linux/seq_file.h>
#include <linux/mm.h>
//para estructura sysinfo
#include <linux/sysinfo.h>

MODULE_LICENSE("GPL");
MODULE_DESCRIPTION("Modulo de RAM");
MODULE_AUTHOR("Kelly Herrera");
MODULE_VERSION("1.0");

static int write_archivo(struct seq_file*  file, void *v){
    struct sysinfo info;

    long ram_total, ram_libre, used_ram, porcentaje_usado;
    
    si_meminfo(&info);

    ram_total= (info.totalram * info.mem_unit)/2024;

    ram_libre=(info.freeram * info.mem_unit)/1024;

    used_ram=ram_total - ram_libre;
    porcentaje_usado=(used_ram *100)/ ram_total;

    seq_printf(file, "{\n");
    seq_printf(file, "\"ram_total\": %ld,\n", ram_total);
    seq_printf(file, "\"ram_libre\": %ld,\n", ram_libre);
    seq_printf(file, "\"used_ram\": %ld,\n", used_ram);
    seq_printf(file, "\"porcentaje_usado\": %ld\n", porcentaje_usado);
    seq_printf(file, "}\n");
    return 0;

}	

static int open(struct inode *inode, struct file *file) {
    return single_open(file, write_archivo, NULL);
}

//KERNEL arriba de 6
static struct proc_ops operaciones = {
    .proc_open = open,
    .proc_read = seq_read
};

static int _insert(void) {
    proc_create("ram", 0, NULL, &operaciones);
    printk(KERN_INFO "Creado el archivo /proc/ram\n \n");
    return 0;
}

static void _delete(void) {
    remove_proc_entry("ram", NULL);
    printk(KERN_INFO "Eliminado el archivo /proc/ram\n \n");
}


module_init(_insert);
module_exit(_delete);