Vagrant.configure('2') do |config|

  config.vm.box = 'scriptcraft-server'
  config.vm.box_url = 'http://files.vagrantup.com/precise64.box'

  # Use 1G memory also server complained on default settings
  config.vm.provider 'virtualbox' do |v|
    v.customize [
                    'modifyvm', :id,
                    '--memory', '1024',
                ]

  end

  # Make minecraft server port available on hosting machine, as localhost
  config.vm.network :forwarded_port, host: 25565, guest: 25565
  # Make minecraft server port available on remote machines, through real ip address
  config.vm.network 'public_network'
  config.vm.provision :shell, :path => 'bin/vagrant.sh'

end