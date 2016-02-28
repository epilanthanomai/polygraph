Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/trusty64"

  config.vm.network "forwarded_port", guest: 3000, host: 3000

  config.vm.provision "shell", inline: <<-SHELL
    curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
    sudo apt-get update
    sudo apt-get install -y nodejs npm
  SHELL
end
