sudo apt update
#instalar git
sudo apt install git
sudo apt update
git clon https://github.com/Kelly901/SO1_VAC_DIC_2024_201900716_.git
cd SO1_VAC_DIC_2024_201900716_
sudo apt-get install ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
echo \ 
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
    $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
    sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli 
containerd.io docker-buildx-plugin
cd BaseDeDatos
sudo docker-compose up 
sudo systemctl status docker
docker-compose-plugin
docker version
docker compose version
 sudo docker compose up