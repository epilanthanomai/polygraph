Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/trusty64"

  config.vm.provider "virtualbox" do |v|
    v.memory = 1024
  end

  config.vm.network "forwarded_port", guest: 3000, host: 3000

  config.vm.provision "shell", path: "provision/install-os-packages.sh"
  config.vm.provision "shell", path: "provision/config-postgres.sh"
  config.vm.provision "shell", path: "provision/install-node-packages.sh", privileged: false
  config.vm.provision "shell", path: "provision/config-database.sh", privileged: false
end
