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

  # Make minecraft server port available on hosting machine
  config.vm.network :forwarded_port, host: 25565, guest: 25565

  config.vm.network 'private_network', ip: '192.168.50.2'
  config.vm.provision :shell, :path => 'bin/vagrant.sh'

end